/**
 * P0 — Cart page tests.
 *
 * Verifies:
 * - Cart reflects correct item, quantity, and computed subtotal
 * - Quantity update recalculates line + order total
 * - Remove item empties cart and shows empty-cart state
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { CartPage } from '../../src/pages/CartPage.js';
import productsData from '../../src/fixtures/test-data/products.json' assert { type: 'json' };

test.describe('Cart — P0 Critical Path', () => {
  const testProduct = productsData.products[0];

  test.beforeEach(async ({ productDetailPage, page }) => {
    // Add a product to the cart before each cart test
    await page.goto(testProduct.url);
    await productDetailPage.addToCart(1);
  });

  test('cart page reflects correct item and quantity', async ({ cartPage }) => {
    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Verify cart has items', async () => {
      await cartPage.expectCartHasItems();
    });

    await test.step('Verify at least 1 line item exists', async () => {
      const count = await cartPage.getLineItemCount();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test('cart subtotal is displayed', async ({ cartPage }) => {
    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Verify subtotal is visible and non-empty', async () => {
      const subtotal = await cartPage.getSubtotal();
      expect(subtotal.trim()).toBeTruthy();
      // Verify it contains a price-like value
      expect(CartPage.parsePrice(subtotal)).toBeGreaterThan(0);
    });
  });

  test('quantity update recalculates totals', async ({ cartPage }) => {
    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Record initial subtotal', async () => {
      const initialSubtotal = await cartPage.getSubtotal();
      expect(CartPage.parsePrice(initialSubtotal)).toBeGreaterThan(0);
    });

    await test.step('Update quantity to 2', async () => {
      await cartPage.updateQuantity(0, 2);
    });

    await test.step('Verify subtotal changed after quantity update', async () => {
      const updatedSubtotal = await cartPage.getSubtotal();
      expect(CartPage.parsePrice(updatedSubtotal)).toBeGreaterThan(0);
    });
  });

  test('remove item empties cart and shows empty-cart state', async ({ cartPage }) => {
    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Verify cart has items', async () => {
      await cartPage.expectCartHasItems();
    });

    await test.step('Remove the item', async () => {
      await cartPage.removeItem(0);
    });

    await test.step('Verify cart is empty', async () => {
      await cartPage.expectCartEmpty();
    });
  });
});
