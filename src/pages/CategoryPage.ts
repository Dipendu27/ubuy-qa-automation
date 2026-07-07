/**
 * CategoryPage Page Object — models category listing pages.
 * Handles both flat (/category/{slug}-{id}) and nested hierarchical URLs.
 *
 * Key elements: breadcrumb, filter sidebar, product grid, sort, pagination.
 */

import { Page, Locator, expect } from '@playwright/test';
import { categoryLocators } from '../locators/category.locators.js';
import { throttle } from '../utils/throttle.js';

export class CategoryPage {
  readonly page: Page;
  readonly breadcrumb: Locator;
  readonly breadcrumbItems: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly filterSidebar: Locator;
  readonly sortDropdown: Locator;
  readonly pagination: Locator;
  readonly categoryTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.breadcrumb = page.locator(categoryLocators.breadcrumb).first();
    this.breadcrumbItems = page.locator(categoryLocators.breadcrumbItem);
    this.productGrid = page.locator(categoryLocators.productGrid).first();
    this.productCards = page.locator(categoryLocators.productCard);
    this.filterSidebar = page.locator(categoryLocators.filterSidebar).first();
    this.sortDropdown = page.locator(categoryLocators.sortDropdown).first();
    this.pagination = page.locator(categoryLocators.pagination).first();
    this.categoryTitle = page.locator(categoryLocators.categoryTitle).first();
  }

  /** Navigate to a category by URL slug */
  async goto(categoryPath: string): Promise<void> {
    await this.page.goto(`/category/${categoryPath}`);
    await throttle();
  }

  /** Assert the category page renders with products */
  async expectPageRendered(): Promise<void> {
    await expect(this.categoryTitle).toBeVisible();
    await expect(this.productGrid).toBeVisible();
  }

  /** Assert products are listed */
  async expectProductsDisplayed(): Promise<void> {
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Get the number of product cards visible */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /** Click a product card by index (0-based) to navigate to its PDP */
  async clickProduct(index: number = 0): Promise<void> {
    const link = this.page.locator(categoryLocators.productCardLink).nth(index);
    const href = await link.getAttribute('href');
    if (href) {
      await this.page.goto(href);
    } else {
      await link.click();
    }
    await throttle();
  }

  /** Assert breadcrumb is displayed */
  async expectBreadcrumbVisible(): Promise<void> {
    await expect(this.breadcrumb).toBeVisible();
  }

  /** Sort products by selecting a sort option */
  async sortBy(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
    await throttle();
  }

  /** Navigate to next page */
  async goToNextPage(): Promise<void> {
    const nextBtn = this.page.locator(categoryLocators.nextPage).first();
    await nextBtn.click();
    await throttle();
  }
}
