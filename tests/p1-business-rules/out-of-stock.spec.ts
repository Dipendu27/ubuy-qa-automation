/**
 * P1 — Out-of-Stock product behavior tests.
 *
 * Verifies:
 * - Out-of-stock product shows disabled Add-to-Cart / OOS badge
 * - No false-success add for OOS products
 */

import { test } from '../../src/fixtures/base.fixture.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Out of Stock — P1 Business Rules', () => {
  // PHASE 0: Must find an actual OOS product during live discovery
  const oosProduct = productsData.products[2]; // "Out of Stock Product"

  test('out-of-stock product shows OOS badge', async ({ productDetailPage, page }) => {
    test.skip(
      !oosProduct.url || oosProduct.url.includes('sample'),
      'OOS product URL not yet discovered in Phase 0',
    );

    await test.step('Navigate to the OOS product page', async () => {
      await page.goto(oosProduct.url);
    });

    await test.step('Verify out-of-stock badge is visible', async () => {
      await productDetailPage.expectOutOfStock();
    });
  });

  test('out-of-stock product has disabled add-to-cart button', async ({
    productDetailPage,
    page,
  }) => {
    test.skip(
      !oosProduct.url || oosProduct.url.includes('sample'),
      'OOS product URL not yet discovered in Phase 0',
    );

    await test.step('Navigate to the OOS product page', async () => {
      await page.goto(oosProduct.url);
    });

    await test.step('Verify Add to Cart button is disabled', async () => {
      await productDetailPage.expectAddToCartDisabled();
    });
  });
});
