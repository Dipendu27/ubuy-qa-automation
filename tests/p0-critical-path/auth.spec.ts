/**
 * P0 — Authentication tests.
 *
 * Verifies:
 * - Login page renders with form elements
 * - Login with invalid credentials shows error / stays on login
 * - Registration form renders after clicking Sign Up tab
 * - Guest attempting checkout is gated to Login/Register
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { ensureAuthenticatedIdentityOrSkip } from '../../src/utils/identityProvisioning.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Authentication — P0 Critical Path', () => {
  test.describe('Login', () => {
    test('login page renders with all form elements', async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Verify form elements are visible', async () => {
        await loginPage.expectFormRendered();
      });
    });

    test('login with invalid credentials shows error', async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Attempt login with invalid credentials', async () => {
        await loginPage.login('invalid-email@nonexistent.test', 'WrongPassword123!');
      });

      await test.step('Verify error or still on login page', async () => {
        await loginPage.expectErrorMessage();
      });
    });

    test('login with valid credentials succeeds', async ({ loginPage, page }, testInfo) => {
      const creds = await ensureAuthenticatedIdentityOrSkip(page, testInfo);
      test.skip(!creds, 'Ephemeral test identity or real credentials required');
      if (!creds) return;

      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Login with valid credentials', async () => {
        await loginPage.login(creds.email, creds.password);
      });

      await test.step('Verify login succeeded — redirected away from login page', async () => {
        const url = page.url();
        expect(url).not.toContain('/customer/account/login');
      });
    });
  });

  test.describe('Registration', () => {
    test('registration form renders after clicking Sign Up tab', async ({ registerPage }) => {
      await test.step('Navigate to register page (Sign Up tab)', async () => {
        await registerPage.goto();
      });

      await test.step('Verify email input and submit button are visible', async () => {
        // Ubuy uses an OTP-first flow: email → OTP → password
        // Only email and submit are visible initially
        await registerPage.expectFormRendered();
      });
    });
  });

  test.describe('Checkout Auth Gate', () => {
    /**
     * v2.0.1: The previous pass condition accepted any URL containing
     * 'ubcheckout' — but the cart page itself lives at /ubcheckout/cart, so
     * the test passed even if the checkout button did nothing. Now the test
     * requires positive evidence of an auth gate: either a strict login/
     * register URL, or a visible login form (inline/modal gate). A no-op
     * click leaves neither and FAILS.
     */
    test('guest user is redirected to login when attempting checkout', async ({
      productDetailPage,
      cartPage,
      loginPage,
      page,
    }) => {
      const testProduct = productsData.products[0];

      await test.step('Add a product to cart as guest', async () => {
        await page.goto(testProduct.url);
        await productDetailPage.addToCart(1);
      });

      await test.step('Navigate to cart page', async () => {
        await cartPage.goto();
      });

      await test.step('Attempt to proceed to checkout', async () => {
        const checkoutBtnVisible = await cartPage.proceedToCheckoutBtn
          .isVisible()
          .catch(() => false);
        if (checkoutBtnVisible) {
          await cartPage.proceedToCheckout();
        } else {
          test.skip(true, 'Cart is empty — cannot test checkout auth gate without items');
        }
      });

      await test.step('Verify redirected to login or auth gate', async () => {
        // Strict auth-page URL patterns only — no bare 'login'/'ubcheckout'
        // substring matches (the cart itself is /ubcheckout/cart).
        const authUrlPattern = /\/customer\/account\/(login|create)|\/(signin|sign-in)(\/|\?|$)/;

        // Give a redirect-style gate time to land.
        const redirectedToAuthPage = await page
          .waitForURL(authUrlPattern, { timeout: 15_000 })
          .then(() => true)
          .catch(() => false);

        if (redirectedToAuthPage) {
          // Redirect gate: strict auth URL, and we must have LEFT the cart page.
          expect(page.url()).toMatch(authUrlPattern);
          expect(page.url()).not.toMatch(/\/ubcheckout\/cart/);
        } else {
          // Inline/modal gate: a login form must be visible on top of the page.
          // If the checkout click did nothing (no redirect, no form), this fails.
          await loginPage.expectFormRendered();
        }
      });
    });
  });
});
