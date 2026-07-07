/**
 * PaymentStep Page Object — models checkout payment method selection & order review.
 *
 * ⚠️ CRITICAL: Tests MUST STOP HERE — never click "Place Order" (§5.2).
 * This page object intentionally does NOT expose a placeOrder() method.
 *
 * Key elements: payment method list, order summary/review.
 */

import { Page, Locator, expect } from '@playwright/test';
import { checkoutLocators } from '../../locators/checkout.locators.js';
import { throttle } from '../../utils/throttle.js';

export class PaymentStep {
  readonly page: Page;
  readonly stepContainer: Locator;
  readonly paymentMethodList: Locator;
  readonly orderSummaryItems: Locator;
  readonly orderSummarySubtotal: Locator;
  readonly orderSummaryShipping: Locator;
  readonly orderSummaryDuty: Locator;
  readonly orderSummaryTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    const loc = checkoutLocators.payment;
    this.stepContainer = page.locator(loc.stepContainer).first();
    this.paymentMethodList = page.locator(loc.paymentMethodList);
    this.orderSummaryItems = page.locator(loc.orderSummaryItems);
    this.orderSummarySubtotal = page.locator(loc.orderSummarySubtotal).first();
    this.orderSummaryShipping = page.locator(loc.orderSummaryShipping).first();
    this.orderSummaryDuty = page.locator(loc.orderSummaryDuty).first();
    this.orderSummaryTotal = page.locator(loc.orderSummaryTotal).first();
  }

  /** Assert the payment step is rendered */
  async expectStepRendered(): Promise<void> {
    await expect(this.stepContainer).toBeVisible();
  }

  /** Select a payment method by name */
  async selectPaymentMethod(methodName: string): Promise<void> {
    const method = this.page
      .locator(checkoutLocators.payment.paymentMethodOption(methodName))
      .first();
    await method.click();
    await throttle();
  }

  /** Assert payment methods are available */
  async expectPaymentMethodsVisible(): Promise<void> {
    const count = await this.paymentMethodList.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Assert order summary is visible and has items */
  async expectOrderSummaryVisible(): Promise<void> {
    const itemCount = await this.orderSummaryItems.count();
    expect(itemCount).toBeGreaterThan(0);
    await expect(this.orderSummaryTotal).toBeVisible();
  }

  /** Get the order summary total text */
  async getOrderTotal(): Promise<string> {
    return (await this.orderSummaryTotal.textContent()) ?? '';
  }

  /** Get the order summary subtotal text */
  async getSubtotal(): Promise<string> {
    return (await this.orderSummarySubtotal.textContent()) ?? '';
  }

  /** Get the order summary shipping text */
  async getShippingAmount(): Promise<string> {
    return (await this.orderSummaryShipping.textContent()) ?? '';
  }

  /** Get duty/customs amount if displayed */
  async getDutyAmount(): Promise<string | null> {
    const isVisible = await this.orderSummaryDuty.isVisible().catch(() => false);
    if (!isVisible) return null;
    return (await this.orderSummaryDuty.textContent()) ?? null;
  }

  /** Get the number of items in the order summary */
  async getOrderItemCount(): Promise<number> {
    return await this.orderSummaryItems.count();
  }

  /**
   * Verify order summary matches expected cart data.
   * This is the final assertion before we STOP — no payment submission.
   */
  async verifyOrderSummaryMatchesCart(expectedData: {
    itemCount: number;
    expectedTotalContains?: string;
  }): Promise<void> {
    const actualItemCount = await this.getOrderItemCount();
    expect(actualItemCount).toBe(expectedData.itemCount);

    if (expectedData.expectedTotalContains) {
      const total = await this.getOrderTotal();
      expect(total).toContain(expectedData.expectedTotalContains);
    }

    // ✅ STOP HERE — we have verified the payment step renders correctly.
    // No "Place Order" click. Ever. (§5.2)
  }
}
