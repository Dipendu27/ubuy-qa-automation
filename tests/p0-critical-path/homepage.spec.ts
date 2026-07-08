/**
 * P0 — Homepage smoke tests.
 *
 * Verifies: homepage loads, header/search bar/store switcher render correctly.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { checkA11y } from '../../src/utils/a11y.js';

test.describe('Homepage — P0 Critical Path', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('homepage loads successfully', async ({ page }) => {
    await test.step('Verify page title is present', async () => {
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    await test.step('Run automated accessibility scan (§4 Task 9)', async () => {
      await checkA11y(page, 'Homepage');
    });
  });

  test('header renders with core elements', async ({ homePage }) => {
    await test.step('Verify header is visible', async () => {
      await homePage.expectHeaderRendered();
    });

    await test.step('Verify logo is visible', async () => {
      await expect(homePage.logo).toBeVisible();
    });
  });

  test('search bar is visible and interactive', async ({ homePage }) => {
    await test.step('Verify search bar is visible', async () => {
      await expect(homePage.searchBar).toBeVisible();
    });

    await test.step('Verify search bar is enabled', async () => {
      await expect(homePage.searchBar).toBeEnabled();
    });
  });

  test('store switcher is visible', async ({ storeSwitcher }) => {
    await test.step('Verify store switcher trigger is visible', async () => {
      await storeSwitcher.expectSwitcherVisible();
    });
  });

  test('navigation mega-menu is present', async ({ homePage }) => {
    await test.step('Verify navigation menu exists', async () => {
      await expect(homePage.megaMenu).toBeVisible();
    });
  });

  test('footer renders with links', async ({ homePage }) => {
    await test.step('Verify footer is visible', async () => {
      await homePage.expectFooterVisible();
    });

    await test.step('Verify footer contains links', async () => {
      const linkCount = await homePage.footerLinks.count();
      expect(linkCount).toBeGreaterThan(0);
    });
  });

  test('cart icon is visible in header', async ({ homePage }) => {
    await test.step('Verify cart icon is visible', async () => {
      await expect(homePage.cartIcon).toBeVisible();
    });
  });
});
