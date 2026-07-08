/**
 * P1 — Out-of-Stock product behavior tests (`v1.6.0`).
 *
 * Verifies:
 * - Out-of-stock product shows disabled Add-to-Cart / OOS badge
 * - Dynamically discovers current OOS SKU instead of skip-gating on a dead placeholder
 */

import { test } from '../../src/fixtures/base.fixture.js';
import { findCurrentOosProduct } from '../../src/utils/productDiscovery.js';

test.describe('Out of Stock — P1 Business Rules', () => {
  test('out-of-stock product shows OOS badge', async ({ productDetailPage, page }) => {
    await test.step('Dynamically discover a live Out-of-Stock product', async () => {
      const oosProduct = await findCurrentOosProduct(page);
      test.skip(
        !oosProduct,
        'No currently out-of-stock product found during dynamic discovery run',
      );
      if (oosProduct) {
        await page.goto(oosProduct.url);
      }
    });

    await test.step('Verify out-of-stock badge is visible', async () => {
      await productDetailPage.expectOutOfStock();
    });
  });

  test('out-of-stock product has disabled add-to-cart button', async ({
    productDetailPage,
    page,
  }) => {
    await test.step('Dynamically discover a live Out-of-Stock product', async () => {
      const oosProduct = await findCurrentOosProduct(page);
      test.skip(
        !oosProduct,
        'No currently out-of-stock product found during dynamic discovery run',
      );
      if (oosProduct) {
        await page.goto(oosProduct.url);
      }
    });

    await test.step('Verify Add to Cart button is disabled', async () => {
      await productDetailPage.expectAddToCartDisabled();
    });
  });
});
