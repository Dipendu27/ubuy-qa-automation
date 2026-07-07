/**
 * SearchResultsPage Page Object — models search results after a query.
 *
 * Key elements: result grid, empty-state message, filters/facets, sort, pagination.
 */

import { Page, Locator, expect } from '@playwright/test';
import { searchLocators } from '../locators/search.locators.js';
import { throttle } from '../utils/throttle.js';

export class SearchResultsPage {
  readonly page: Page;
  readonly resultsContainer: Locator;
  readonly resultItems: Locator;
  readonly emptyStateMessage: Locator;
  readonly filterSidebar: Locator;
  readonly sortDropdown: Locator;
  readonly pagination: Locator;
  readonly nextPage: Locator;
  readonly resultCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsContainer = page.locator(searchLocators.resultsContainer).first();
    this.resultItems = page.locator(searchLocators.resultItem);
    this.emptyStateMessage = page.locator(searchLocators.emptyStateMessage).first();
    this.filterSidebar = page.locator(searchLocators.filterSidebar).first();
    this.sortDropdown = page.locator(searchLocators.sortDropdown).first();
    this.pagination = page.locator(searchLocators.pagination).first();
    this.nextPage = page.locator(searchLocators.nextPage).first();
    this.resultCount = page.locator(searchLocators.resultCount).first();
  }

  /** Assert that search results are displayed (non-empty) */
  async expectResultsDisplayed(): Promise<void> {
    await expect(this.resultsContainer).toBeVisible();
    const count = await this.resultItems.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Assert the confirmed empty-state message is shown */
  async expectEmptyState(): Promise<void> {
    await expect(this.emptyStateMessage).toBeVisible();
    if (searchLocators.emptyStateText) {
      await expect(this.emptyStateMessage).toContainText(searchLocators.emptyStateText);
    }
  }

  /** Get the number of results displayed on the current page */
  async getResultCount(): Promise<number> {
    return await this.resultItems.count();
  }

  /** Click the first product in results to navigate to its PDP */
  async clickFirstResult(): Promise<void> {
    await this.clickResultByIndex(0);
  }

  /** Click a specific result by index (0-based) */
  async clickResultByIndex(index: number): Promise<void> {
    const link = this.page.locator(searchLocators.resultItemTitle).nth(index);
    const href = await link.getAttribute('href');
    if (href) {
      await this.page.goto(href);
    } else {
      await link.click();
    }
    await throttle();
  }

  /** Sort results by selecting a sort option */
  async sortBy(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
    await throttle();
  }

  /** Navigate to the next page of results */
  async goToNextPage(): Promise<void> {
    // eslint-disable-next-line playwright/prefer-locator
    await this.nextPage.click();
    await throttle();
  }

  /** Apply a filter by name */
  async applyFilter(filterName: string): Promise<void> {
    const filter = this.page.locator(searchLocators.filterOption(filterName)).first();
    await filter.click();
    await throttle();
  }
}
