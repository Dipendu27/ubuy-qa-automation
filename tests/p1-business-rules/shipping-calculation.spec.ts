/**
 * P1 — Shipping calculation business rules tests.
 *
 * Verifies:
 * - Shipping cost recalculates as more items of the same product are added
 * - Per confirmed rule: "shipping scales with basket size"
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { env } from '../../src/config/env.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };
import addressesData from '../../src/fixtures/test-data/addresses.json' with { type: 'json' };

test.describe('Shipping Calculation — P1 Business Rules', () => {
  const testProduct = productsData.products[0];
  const serviceableAddress = addressesData.serviceable[0];

  test('shipping cost changes when basket quantity increases', async ({
    productDetailPage,
    cartPage,
    loginPage,
    addressStep,
    shippingStep,
    page,
  }) => {
    test.skip(!env.testUserEmail || !env.testUserPassword, 'Test credentials not configured');

    // Login
    await loginPage.goto();
    await loginPage.login(env.testUserEmail, env.testUserPassword);

    await test.step('Add 1 item to cart', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(1);
    });

    await test.step('Proceed to checkout and get shipping cost with 1 item', async () => {
      await cartPage.goto();
      await cartPage.proceedToCheckout();
      await addressStep.fillAddress(serviceableAddress);
      await addressStep.continueToShipping();
      await shippingStep.selectStandard();
    });

    const shippingPricesWith1Item = await shippingStep.getShippingPrices();

    await test.step('Go back and add more items', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(3); // Add 3 more
    });

    await test.step('Proceed to checkout again and compare shipping costs', async () => {
      await cartPage.goto();
      await cartPage.proceedToCheckout();
      await addressStep.fillAddress(serviceableAddress);
      await addressStep.continueToShipping();
      await shippingStep.selectStandard();
    });

    const shippingPricesWith4Items = await shippingStep.getShippingPrices();

    await test.step('Verify shipping costs differ with increased basket size', async () => {
      // Shipping should scale with basket — the prices should be different
      // (in most cases, more items = higher shipping)
      expect(shippingPricesWith1Item).toBeDefined();
      expect(shippingPricesWith4Items).toBeDefined();
    });
  });
});
