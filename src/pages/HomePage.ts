/**
 * HomePage Page Object — models the ubuy.co.in homepage (`/`).
 *
 * Key elements: header nav, store switcher, search bar, hero banners,
 * category mega-menu, trust badges, footer links.
 */

import { Page, Locator, expect } from '@playwright/test';
import { homeLocators } from '../locators/home.locators.js';
import { throttle } from '../utils/throttle.js';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly logo: Locator;
  readonly searchBar: Locator;
  readonly searchSubmitBtn: Locator;
  readonly cartIcon: Locator;
  readonly cartBadgeCount: Locator;
  readonly megaMenu: Locator;
  readonly heroBanner: Locator;
  readonly trustBadges: Locator;
  readonly footer: Locator;
  readonly footerLinks: Locator;
  readonly trackOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(homeLocators.header).first();
    this.logo = page.locator(homeLocators.logo).first();
    this.searchBar = page.locator(homeLocators.searchBar).first();
    this.searchSubmitBtn = page.locator(homeLocators.searchSubmitBtn).first();
    this.cartIcon = page.locator(homeLocators.cartIcon).first();
    this.cartBadgeCount = page.locator(homeLocators.cartBadgeCount).first();
    this.megaMenu = page.locator(homeLocators.megaMenu).first();
    this.heroBanner = page.locator(homeLocators.heroBanner).first();
    this.trustBadges = page.locator(homeLocators.trustBadges).first();
    this.footer = page.locator(homeLocators.footer).first();
    this.footerLinks = page.locator(homeLocators.footerLinks);
    this.trackOrderLink = page.locator(homeLocators.trackOrderLink).first();
  }

  /** Navigate to the homepage */
  async goto(): Promise<void> {
    await this.page.goto('/');
    await throttle();
  }

  /** Perform a search from the homepage search bar */
  async search(keyword: string): Promise<void> {
    await this.searchBar.fill(keyword);
    await this.searchSubmitBtn.click();
    await throttle();
  }

  /** Click a category in the mega-menu by name */
  async navigateToCategory(categoryName: string): Promise<void> {
    const categoryLink = this.page.locator(homeLocators.megaMenuCategory(categoryName)).first();
    await categoryLink.click();
    await throttle();
  }

  /** Assert the homepage core elements are visible */
  async expectCoreElementsVisible(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.searchBar).toBeVisible();
    await expect(this.logo).toBeVisible();
  }

  /** Assert the header renders with navigation */
  async expectHeaderRendered(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.searchBar).toBeVisible();
  }

  /** Assert the footer is visible */
  async expectFooterVisible(): Promise<void> {
    await expect(this.footer).toBeVisible();
  }

  /** Get the current cart badge count text */
  async getCartCount(): Promise<string> {
    return (await this.cartBadgeCount.textContent()) ?? '0';
  }
}
