/**
 * ShippingStep Page Object — models checkout shipping method selection.
 *
 * URL: unconfirmed — to be discovered in Phase 0.
 * Key elements: Standard vs Express selector, price recalculation.
 */

import { Page, Locator, expect } from '@playwright/test';
import { checkoutLocators } from '../../locators/checkout.locators.js';
import { throttle } from '../../utils/throttle.js';

export class ShippingStep {
  readonly page: Page;
  readonly stepContainer: Locator;
  readonly standardOption: Locator;
  readonly expressOption: Locator;
  readonly shippingPrice: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    const loc = checkoutLocators.shipping;
    this.stepContainer = page.locator(loc.stepContainer).first();
    this.standardOption = page.locator(loc.standardShippingOption).first();
    this.expressOption = page.locator(loc.expressShippingOption).first();
    this.shippingPrice = page.locator(loc.shippingMethodPrice);
    this.continueBtn = page.locator(loc.continueToPaymentBtn).first();
  }

  /** Select Standard shipping */
  async selectStandard(): Promise<void> {
    await this.standardOption.click();
    await throttle(2000, 3000); // Wait for price recalculation
  }

  /** Select Express shipping */
  async selectExpress(): Promise<void> {
    await this.expressOption.click();
    await throttle(2000, 3000); // Wait for price recalculation
  }

  /** Continue to the payment step */
  async continueToPayment(): Promise<void> {
    await this.continueBtn.click();
    await throttle(2000, 4000);
  }

  /** Assert the shipping step is rendered */
  async expectStepRendered(): Promise<void> {
    await expect(this.stepContainer).toBeVisible();
  }

  /** Assert both shipping options are visible */
  async expectShippingOptionsVisible(): Promise<void> {
    await expect(this.standardOption).toBeVisible();
    await expect(this.expressOption).toBeVisible();
  }

  /** Get shipping price text (for comparison between Standard/Express) */
  async getShippingPrices(): Promise<string[]> {
    const prices: string[] = [];
    const count = await this.shippingPrice.count();
    for (let i = 0; i < count; i++) {
      const text = (await this.shippingPrice.nth(i).textContent()) ?? '';
      prices.push(text.trim());
    }
    return prices;
  }

  /** Assert the selected shipping price changed after switching methods */
  async expectPriceChanged(previousPrice: string): Promise<void> {
    const currentPrices = await this.getShippingPrices();
    const selectedPrice = this.page.locator(checkoutLocators.shipping.selectedMethodPrice).first();
    const currentText = (await selectedPrice.textContent()) ?? '';
    expect(currentText.trim()).not.toEqual(previousPrice.trim());
  }
}
