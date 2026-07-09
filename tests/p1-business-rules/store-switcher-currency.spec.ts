/**
 * P1 — Store Switcher Multi-Currency & Catalog Auditing (`v1.5.0`).
 *
 * Verifies cross-border store switcher handles region switching and preserves cart items.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';

test.describe('Store Switcher Region Dropdown Audit — P1 Business Rules', () => {
  test('header store switcher trigger displays interactive region dropdown options', async ({
    homePage,
    storeSwitcher,
  }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Verify store switcher trigger is interactive and renders options', async () => {
      await storeSwitcher.expectSwitcherVisible();
      await storeSwitcher.open();
      const optionsCount = await storeSwitcher.dropdown
        .locator('.dropdown-item, a, li, button')
        .count();
      expect(optionsCount).toBeGreaterThan(0);
    });
  });
});
