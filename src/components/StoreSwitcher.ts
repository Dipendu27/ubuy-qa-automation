/**
 * StoreSwitcher Component — shared header component for region switching.
 *
 * Models: store dropdown (Global/US/UK/EU/IN/HK/CN/JP/KR/TR),
 * confirm-clear-cart modal (Yes/No).
 *
 * CONFIRMED: Switching store triggers a confirm modal: "Switching between
 * stores will remove products from your current cart" with YES/NO buttons.
 * Cart is NOT shared across regional stores.
 */

import { Page, Locator, expect } from '@playwright/test';
import { homeLocators } from '../locators/home.locators.js';
import { throttle } from '../utils/throttle.js';

/** Available store regions */
export type StoreRegion =
  | 'Global'
  | 'US'
  | 'UK'
  | 'EU'
  | 'India'
  | 'Hongkong'
  | 'China'
  | 'Japan'
  | 'Korea'
  | 'Turkey';

export class StoreSwitcher {
  readonly page: Page;
  readonly trigger: Locator;
  readonly dropdown: Locator;
  readonly confirmModal: Locator;
  readonly confirmYes: Locator;
  readonly confirmNo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.trigger = page.locator(homeLocators.storeSwitcherTrigger).first();
    this.dropdown = page.locator(homeLocators.storeSwitcherDropdown).first();
    this.confirmModal = page.locator(homeLocators.storeSwitchConfirmModal).first();
    this.confirmYes = page.locator(homeLocators.storeSwitchConfirmYes).first();
    this.confirmNo = page.locator(homeLocators.storeSwitchConfirmNo).first();
  }

  /** Open the store switcher dropdown */
  async open(): Promise<void> {
    await this.trigger.click();
    await expect(this.dropdown).toBeVisible();
    await throttle();
  }

  /** Select a store region — triggers the confirm modal if cart has items */
  async selectStore(region: StoreRegion): Promise<void> {
    await this.open();
    const option = this.page.locator(homeLocators.storeSwitcherOption(region)).first();
    await option.click();
    await throttle();
  }

  /**
   * Switch store and confirm (click YES to clear cart).
   * Use this when you expect the confirm modal to appear.
   */
  async switchStoreAndConfirm(region: StoreRegion): Promise<void> {
    await this.selectStore(region);
    await expect(this.confirmModal).toBeVisible();
    await this.confirmYes.click();
    await throttle(2000, 4000);
  }

  /**
   * Switch store and cancel (click NO to preserve cart).
   * Use this when you want to verify the cart is preserved on cancel.
   */
  async switchStoreAndCancel(region: StoreRegion): Promise<void> {
    await this.selectStore(region);
    await expect(this.confirmModal).toBeVisible();
    await this.confirmNo.click();
    await throttle();
  }

  /** Assert the confirm modal appears with the expected message */
  async expectConfirmModalVisible(): Promise<void> {
    await expect(this.confirmModal).toBeVisible();
    await expect(this.confirmModal).toContainText(/switching between stores/i);
  }

  /** Assert the store switcher is visible in the header */
  async expectSwitcherVisible(): Promise<void> {
    await expect(this.trigger).toBeVisible();
  }
}
