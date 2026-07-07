/**
 * P0 — Search functionality tests.
 *
 * Verifies:
 * - Valid keyword search returns non-empty, relevant results
 * - Nonsense keyword shows confirmed empty-state message
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import keywordsData from '../../src/fixtures/test-data/keywords.json' assert { type: 'json' };

test.describe('Search — P0 Critical Path', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  for (const { keyword, description } of keywordsData.validKeywords.slice(0, 2)) {
    test(`search for "${keyword}" returns non-empty results — ${description}`, async ({
      homePage,
      searchResultsPage,
    }) => {
      await test.step(`Search for "${keyword}"`, async () => {
        await homePage.search(keyword);
      });

      await test.step('Verify results are displayed', async () => {
        await searchResultsPage.expectResultsDisplayed();
      });

      await test.step('Verify result count is greater than zero', async () => {
        const count = await searchResultsPage.getResultCount();
        expect(count).toBeGreaterThan(0);
      });
    });
  }

  for (const { keyword } of keywordsData.invalidKeywords.slice(0, 1)) {
    test(`search for nonsense keyword "${keyword}" shows empty-state message`, async ({
      homePage,
      searchResultsPage,
    }) => {
      await test.step(`Search for nonsense keyword "${keyword}"`, async () => {
        await homePage.search(keyword);
      });

      await test.step('Verify empty-state message is shown', async () => {
        await searchResultsPage.expectEmptyState();
      });
    });
  }
});
