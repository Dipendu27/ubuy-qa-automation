/**
 * MyAccountPage Page Object — models the customer account dashboard.
 *
 * Covers: account overview, order history, order detail, track order,
 * claim warranty action.
 *
 * PHASE 0 STATUS: Sub-routes under /customer/account/* are UNCONFIRMED.
 */

import { Page, Locator, expect } from '@playwright/test';
import { accountLocators } from '../locators/account.locators.js';
import { throttle } from '../utils/throttle.js';

export class MyAccountPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly accountNavigation: Locator;
  readonly orderHistoryTable: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator(accountLocators.myAccount.welcomeMessage).first();
    this.accountNavigation = page.locator(accountLocators.myAccount.accountNavigation).first();
    this.orderHistoryTable = page.locator(accountLocators.orders.orderHistoryTable).first();
    this.orderRows = page.locator(accountLocators.orders.orderRow);
  }

  /** Navigate to My Account dashboard */
  async goto(): Promise<void> {
    await this.page.goto('/customer/account/');
    await throttle();
  }

  /** Navigate to a specific account section via sidebar navigation */
  async navigateTo(sectionName: string): Promise<void> {
    const link = this.page.locator(accountLocators.myAccount.navLink(sectionName)).first();
    await link.click();
    await throttle();
  }

  /** Assert the account dashboard is rendered */
  async expectDashboardRendered(): Promise<void> {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.accountNavigation).toBeVisible();
  }

  /** Assert order history is displayed */
  async expectOrderHistoryVisible(): Promise<void> {
    await expect(this.orderHistoryTable).toBeVisible();
  }

  /** Get the number of orders listed */
  async getOrderCount(): Promise<number> {
    return await this.orderRows.count();
  }

  /** Click "View Order" on a specific order row (0-based index) */
  async viewOrderDetail(orderIndex: number = 0): Promise<void> {
    const row = this.orderRows.nth(orderIndex);
    const viewLink = row.locator(accountLocators.orders.orderDetailLink).first();
    await viewLink.click();
    await throttle();
  }

  /** Click "Track Order" on a specific order row */
  async trackOrder(orderIndex: number = 0): Promise<void> {
    const row = this.orderRows.nth(orderIndex);
    const trackLink = row.locator(accountLocators.orders.trackOrderLink).first();
    await trackLink.click();
    await throttle();
  }

  // --- Standalone Track Order ---

  /** Track an order by ID (from the Track Order page/form) */
  async trackOrderById(orderId: string): Promise<void> {
    const input = this.page.locator(accountLocators.trackOrder.orderIdInput).first();
    const trackBtn = this.page.locator(accountLocators.trackOrder.trackBtn).first();
    await input.fill(orderId);
    await trackBtn.click();
    await throttle();
  }

  /** Assert tracking result is displayed */
  async expectTrackingResultVisible(): Promise<void> {
    const result = this.page.locator(accountLocators.trackOrder.trackingResult).first();
    await expect(result).toBeVisible();
  }

  /** Assert tracking error is displayed (invalid order ID) */
  async expectTrackingError(): Promise<void> {
    const error = this.page.locator(accountLocators.trackOrder.trackingError).first();
    await expect(error).toBeVisible();
  }
}
