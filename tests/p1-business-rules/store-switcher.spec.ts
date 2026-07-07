/**
 * P1 — Store Switcher business rules tests.
 *
 * Verifies:
 * - Switching store region while cart has items triggers confirm modal
 * - Confirming clears the cart
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

  test('confirming store switch clears the cart', async ({
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

    await test.step('Switch to US store and confirm', async () => {
      await storeSwitcher.switchStoreAndConfirm('US');
    });

    await test.step('Verify cart is now empty', async () => {
      await cartPage.goto();
      await cartPage.expectCartEmpty();
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
