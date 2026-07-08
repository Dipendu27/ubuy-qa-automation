/**
 * P1 — Out-of-Stock product behavior tests (`v1.7.0`).
 *
 * Verifies:
 * - Out-of-stock product shows disabled Add-to-Cart / OOS badge
 * - Dynamically discovers current OOS SKU once per suite run (`beforeAll` sharing)
 */

import { test } from '../../src/fixtures/base.fixture.js';
import { DiscoveredProduct, findCurrentOosProduct } from '../../src/utils/productDiscovery.js';

test.describe('Out of Stock — P1 Business Rules', () => {
  let sharedOosProduct: DiscoveredProduct | null = null;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    sharedOosProduct = await findCurrentOosProduct(page).catch(() => null);
    await page.close();
  });

  test('out-of-stock product shows OOS badge', async ({ productDetailPage, page }) => {
    test.skip(
      !sharedOosProduct,
      'No currently out-of-stock product found during dynamic discovery run',
    );

    await test.step('Navigate to discovered OOS product page', async () => {
      await page.goto(sharedOosProduct!.url);
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
      !sharedOosProduct,
      'No currently out-of-stock product found during dynamic discovery run',
    );

    await test.step('Navigate to discovered OOS product page', async () => {
      await page.goto(sharedOosProduct!.url);
    });

    await test.step('Verify Add to Cart button is disabled', async () => {
      await productDetailPage.expectAddToCartDisabled();
    });
  });
});
