/**
 * P1 — Store Switcher business rules tests.
 *
 * Verifies:
 * - Switching store region while cart has items triggers confirm modal
 * - Confirming store switch preserves cart items across regional store catalogs (Ubuy production behavior)
 * - Cancelling preserves the cart
 */

import { test } from '../../src/fixtures/base.fixture.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Store Switcher — P1 Business Rules', () => {
  const testProduct = productsData.products[0];

  test('switching store with items in cart triggers confirm modal', async ({
    homePage,
    productDetailPage,
    storeSwitcher,
    page,
  }) => {
    await test.step('Add a product to the cart', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(1);
    });

    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Attempt to switch to US store', async () => {
      await storeSwitcher.selectStore('US');
    });

    await test.step('Verify confirm modal appears', async () => {
      await storeSwitcher.expectConfirmModalVisible();
    });
  });

  // ⚠️ UNVERIFIED — Cart preservation across region switches contradicts site warning copy ("Switching between stores will remove products from your current cart"), pending manual confirmation by Dipendu Mukherjee.
  test('store switch currently appears to preserve cart items (UNVERIFIED — pending manual confirmation, see discovery-log.md)', async ({
    homePage,
    productDetailPage,
    storeSwitcher,
    cartPage,
    page,
  }) => {
    test.info().annotations.push({
      type: 'unverified',
      description:
        'Cart preservation across region switches contradicts site warning copy; pending manual verification by Dipendu Mukherjee.',
    });

    await test.step('Add a product to the cart', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(1);
    });

    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Switch to US store and confirm', async () => {
      await storeSwitcher.switchStoreAndConfirm('US');
    });

    await test.step('Verify cart items are preserved across region switch', async () => {
      await cartPage.goto();
      await cartPage.expectCartHasItems();
    });
  });

  test('cancelling store switch preserves the cart', async ({
    homePage,
    productDetailPage,
    storeSwitcher,
    cartPage,
    page,
  }) => {
    await test.step('Add a product to the cart', async () => {
      await page.goto(testProduct.url);
      await productDetailPage.addToCart(1);
    });

    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Attempt to switch to UK store and cancel', async () => {
      await storeSwitcher.switchStoreAndCancel('UK');
    });

    await test.step('Verify cart still has items', async () => {
      await cartPage.goto();
      await cartPage.expectCartHasItems();
    });
  });
});
