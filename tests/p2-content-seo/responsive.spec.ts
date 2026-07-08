/**
 * P2 — Responsive smoke test pass.
 *
 * Verifies: homepage → PDP → cart on a mobile viewport.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Responsive Smoke Pass — P2 Content & SEO', () => {
  // Use mobile project or set viewport explicitly if running under desktop project
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 12/13/14 dimensions

  const testProduct = productsData.products[0];

  test('homepage renders correctly on mobile viewport', async ({ homePage }) => {
    await test.step('Navigate to homepage on mobile viewport', async () => {
      await homePage.goto();
    });

    await test.step('Verify header and search bar are visible', async () => {
      await expect(homePage.header).toBeVisible();
      await expect(homePage.searchBar).toBeVisible();
    });

    await test.step('Verify visual snapshot baseline of mobile header (§4 Task 8)', async () => {
      await expect(homePage.header).toHaveScreenshot('mobile-header-baseline.png', {
        maxDiffPixelRatio: 0.05,
      });
    });
  });

  test('PDP renders correctly and allows add-to-cart on mobile viewport', async ({
    productDetailPage,
    page,
  }) => {
    await test.step('Navigate to PDP on mobile viewport', async () => {
      await page.goto(testProduct.url);
    });

    await test.step('Verify PDP core elements render on mobile', async () => {
      await productDetailPage.expectPageRendered();
    });

    await test.step('Add product to cart from mobile view', async () => {
      await productDetailPage.addToCart(1);
      await productDetailPage.expectAddToCartSuccessMessage();
    });
  });

  test('cart page renders correctly on mobile viewport', async ({
    cartPage,
    productDetailPage,
    page,
  }) => {
    await test.step('Add product to cart first', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(1);
    });

    await test.step('Navigate to cart on mobile viewport', async () => {
      await cartPage.goto();
    });

    await test.step('Verify cart items and checkout button render on mobile', async () => {
      await cartPage.expectCartHasItems();
      await expect(cartPage.proceedToCheckoutBtn).toBeVisible();
    });
  });
});
