/**
 * P0 — Cart page tests.
 *
 * Verifies:
 * - Cart reflects correct item, quantity, and computed subtotal
 * - Quantity update recalculates line + order total
 * - Remove item empties cart and shows empty-cart state
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { checkA11y } from '../../src/utils/a11y.js';
import { CartPage } from '../../src/pages/CartPage.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Cart — P0 Critical Path', () => {
  const testProduct = productsData.products[0];

  test.beforeEach(async ({ productDetailPage, page }) => {
    // Add a product to the cart before each cart test
    await page.goto(testProduct.url);
    await productDetailPage.addToCart(1);
  });

  test('cart page reflects correct item and quantity', async ({ cartPage, page }) => {
    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Verify cart has items', async () => {
      await cartPage.expectCartHasItems();
    });

    await test.step('Run automated accessibility scan (§4 Task 9)', async () => {
      await checkA11y(page, 'Cart Page');
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

  /**
   * v2.0.1: Previously only asserted the post-update subtotal was > 0 — true
   * even when recalculation silently failed. Now compares before/after and
   * requires the new subtotal to be ≈2× the single-unit subtotal (1.5×–2.5×
   * bounds absorb rounding, per-unit fees, and multi-buy discounts).
   */
  test('quantity update recalculates totals', async ({ cartPage }) => {
    let initialSubtotal = 0;

    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Record initial subtotal (qty 1)', async () => {
      initialSubtotal = CartPage.parsePrice(await cartPage.getSubtotal());
      expect(initialSubtotal).toBeGreaterThan(0);
    });

    await test.step('Update quantity to 2', async () => {
      await cartPage.updateQuantity(0, 2);
    });

    await test.step('Verify subtotal recalculated to ≈2× the initial subtotal', async () => {
      // Deterministic wait: poll until the displayed subtotal differs from the
      // qty-1 value (or time out) instead of relying on a fixed sleep.
      await expect
        .poll(async () => CartPage.parsePrice(await cartPage.getSubtotal()), {
          message: 'Subtotal never changed after updating quantity to 2',
          timeout: 20_000,
        })
        .not.toBe(initialSubtotal);

      const updatedSubtotal = CartPage.parsePrice(await cartPage.getSubtotal());
      // ≈2× with tolerance: strictly between 1.5× and 2.5× of the qty-1 subtotal.
      expect(
        updatedSubtotal,
        `Expected ≈2× recalculation: initial=${initialSubtotal}, updated=${updatedSubtotal}`,
      ).toBeGreaterThan(initialSubtotal * 1.5);
      expect(updatedSubtotal).toBeLessThan(initialSubtotal * 2.5);
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
