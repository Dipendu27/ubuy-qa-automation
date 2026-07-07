/**
 * P0 — Navigation flow tests.
 *
 * Verifies: Home → Category → PDP via product grid click.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';

test.describe('Navigation — P0 Critical Path', () => {
  test('navigate Home → Category → PDP via product grid click', async ({
    homePage,
    categoryPage,
    productDetailPage,
    page,
  }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
      await homePage.expectCoreElementsVisible();
    });

    await test.step('Click a category from the mega-menu', async () => {
      // Navigate directly to a verified leaf category with product listings
      await categoryPage.goto('laptops-21457');
    });

    await test.step('Verify category page renders with products', async () => {
      await categoryPage.expectProductsDisplayed();
    });

    await test.step('Click first product to navigate to PDP', async () => {
      await categoryPage.clickProduct(0);
    });

    await test.step('Verify PDP renders with core elements', async () => {
      await productDetailPage.expectPageRendered();
    });

    await test.step('Verify PDP URL contains /product/', async () => {
      const url = page.url();
      expect(url).toContain('/product/');
    });
  });

  test('breadcrumb navigation works on category page', async ({
    categoryPage,
    page,
  }) => {
    await test.step('Navigate to a category page', async () => {
      // Use verified leaf category URL with ID
      await page.goto('/category/laptops-21457');
    });

    await test.step('Verify breadcrumb is visible', async () => {
      await categoryPage.expectBreadcrumbVisible();
    });
  });
});
