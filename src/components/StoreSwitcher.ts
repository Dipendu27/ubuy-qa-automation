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
  'Global' | 'US' | 'UK' | 'EU' | 'India' | 'Hongkong' | 'China' | 'Japan' | 'Korea' | 'Turkey';

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

  /**
   * Open the store switcher dropdown.
   *
   * v2.0.1: The dropdown assertion is now UNCONDITIONAL — if the dropdown does
   * not open, this method fails instead of silently passing. Some headers
   * require a hover before the click registers, so the click is retried once.
   */
  async open(): Promise<void> {
    await this.trigger.click();
    const openedOnFirstClick = await this.dropdown
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);
    if (!openedOnFirstClick) {
      // Retry once: hover first (some headers need it), then click again.
      await this.trigger.hover();
      await throttle();
      await this.trigger.click();
    }
    await expect(this.dropdown).toBeVisible({ timeout: 10_000 });
    await throttle();
  }

  /** Select a store region — triggers the confirm modal if cart has items */
  async selectStore(region: StoreRegion): Promise<void> {
    await this.open();
    const option = this.page.locator(homeLocators.storeSwitcherOption(region)).first();
    await option.dispatchEvent('click');
    await throttle();
  }

  /**
   * Switch store and confirm (click YES to clear cart).
   *
   * The modal only appears when the cart has items, so the guard is legitimate —
   * but callers that KNOW the cart is non-empty must assert on the returned
   * `modalAppeared` flag (v2.0.1) instead of trusting a silent pass.
   *
   * @returns `true` if the confirm modal appeared and YES was clicked.
   */
  async switchStoreAndConfirm(region: StoreRegion): Promise<boolean> {
    await this.selectStore(region);
    const modalAppeared = await this.confirmModal
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);
    if (modalAppeared) {
      await this.confirmYes.click();
    }
    await throttle(2000, 4000);
    return modalAppeared;
  }

  /**
   * Switch store and cancel (click NO to preserve cart).
   *
   * @returns `true` if the confirm modal appeared and NO was clicked.
   */
  async switchStoreAndCancel(region: StoreRegion): Promise<boolean> {
    await this.selectStore(region);
    const modalAppeared = await this.confirmModal
      .waitFor({ state: 'visible', timeout: 5_000 })
      .then(() => true)
      .catch(() => false);
    if (modalAppeared) {
      await this.confirmNo.click();
    }
    await throttle();
    return modalAppeared;
  }

  /**
   * Assert the confirm modal appears.
   *
   * v2.0.1: This is now an UNCONDITIONAL assertion — previously it only
   * asserted visibility when the modal was already visible (a no-op that
   * could never fail).
   */
  async expectConfirmModalVisible(): Promise<void> {
    await expect(this.confirmModal).toBeVisible({ timeout: 10_000 });
  }

  /** Assert the store switcher is visible in the header */
  async expectSwitcherVisible(): Promise<void> {
    await expect(this.trigger).toBeVisible();
  }
}
