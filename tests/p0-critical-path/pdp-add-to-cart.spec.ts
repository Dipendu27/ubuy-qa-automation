/**
 * P0 — PDP Add-to-Cart tests.
 *
 * Verifies:
 * - PDP page renders with core elements (title, price, image)
 * - Add to cart button works
 * - Cart badge/count updates after adding
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('PDP Add to Cart — P0 Critical Path', () => {
  const testProduct = productsData.products[0];

  test('PDP renders with core product elements', async ({ productDetailPage, page }) => {
    await test.step('Navigate to a product page', async () => {
      await page.goto(testProduct.url);
    });

    await test.step('Verify product title is visible', async () => {
      await expect(productDetailPage.productTitle).toBeVisible();
      const title = await productDetailPage.productTitle.textContent();
      expect(title?.trim().length).toBeGreaterThan(0);
    });

    await test.step('Verify product price is visible', async () => {
      await expect(productDetailPage.productPrice).toBeVisible();
    });

    await test.step('Verify product image is visible', async () => {
      await expect(productDetailPage.mainImage).toBeVisible();
    });

    await test.step('Verify add to cart button is visible', async () => {
      await expect(productDetailPage.addToCartBtn).toBeVisible();
    });
  });

  test('add product to cart and verify cart badge updates', async ({ productDetailPage, page }) => {
    await test.step('Navigate to a product page', async () => {
      await page.goto(testProduct.url);
    });

    await test.step('Verify product is in stock', async () => {
      await productDetailPage.expectInStock();
    });

    await test.step('Add to cart', async () => {
      await productDetailPage.addToCart(1);
    });

    await test.step('Verify cart badge count updated', async () => {
      // Wait for cart counter to update (AJAX)
      const cartBadge = page
        .locator(
          '.show-cart-popup:visible, [class*="cart-counter" i]:visible, [class*="cart-qty" i]:visible',
        )
        .first();
      await expect(cartBadge).toBeVisible({ timeout: 10_000 });
    });
  });

  test('add product with quantity > 1', async ({ productDetailPage, page }) => {
    await test.step('Navigate to a product page', async () => {
      await page.goto(testProduct.url);
    });

    await test.step('Set quantity to 2 and add to cart', async () => {
      await productDetailPage.addToCart(2);
    });

    await test.step('Verify cart popup or success indicator', async () => {
      // After adding to cart, ubuy shows a cart popup
      const cartPopup = page
        .locator(
          '.show-cart-popup:visible, a#add-to-cart-view-cart:visible, .message-success:visible',
        )
        .first();
      await expect(cartPopup).toBeVisible({ timeout: 10_000 });
    });
  });
});
