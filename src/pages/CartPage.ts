/**
 * CartPage Page Object — models the cart at /ubcheckout/cart.
 *
 * Key elements: line items (qty edit, remove), price/shipping subtotal,
 * coupon/promo field, proceed-to-checkout CTA, empty-cart state.
 */

import { Page, Locator, expect } from '@playwright/test';
import { cartLocators } from '../locators/cart.locators.js';
import { throttle } from '../utils/throttle.js';

export class CartPage {
  readonly page: Page;
  readonly cartContainer: Locator;
  readonly emptyCartMessage: Locator;
  readonly lineItems: Locator;
  readonly subtotalAmount: Locator;
  readonly shippingAmount: Locator;
  readonly orderTotal: Locator;
  readonly couponInput: Locator;
  readonly applyCouponBtn: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartContainer = page.locator(cartLocators.cartContainer).first();
    this.emptyCartMessage = page.locator(cartLocators.emptyCartMessage).first();
    this.lineItems = page.locator(cartLocators.lineItem);
    this.subtotalAmount = page.locator(cartLocators.subtotalAmount).first();
    this.shippingAmount = page.locator(cartLocators.shippingAmount).first();
    this.orderTotal = page.locator(cartLocators.orderTotal).first();
    this.couponInput = page.locator(cartLocators.couponInput).first();
    this.applyCouponBtn = page.locator(cartLocators.applyCouponBtn).first();
    this.proceedToCheckoutBtn = page.locator(cartLocators.proceedToCheckoutBtn).first();
  }

  /** Navigate to the cart page */
  async goto(): Promise<void> {
    await this.page.goto('/ubcheckout/cart');
    await throttle();
  }

  /** Assert the cart has items */
  async expectCartHasItems(): Promise<void> {
    await expect(this.cartContainer).toBeVisible();
    const count = await this.lineItems.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Assert the cart is empty */
  async expectCartEmpty(): Promise<void> {
    await this.page.waitForTimeout(2000);
    const qtyCount = this.lineItems;
    await expect(qtyCount).toHaveCount(0);
  }

  /** Get the number of line items in the cart */
  async getLineItemCount(): Promise<number> {
    return await this.lineItems.count();
  }

  /** Update quantity for a specific line item (0-based index) */
  async updateQuantity(itemIndex: number, newQuantity: number): Promise<void> {
    const qtyInput = this.lineItems.nth(itemIndex);
    await qtyInput.clear();
    await qtyInput.fill(String(newQuantity));
    // Press Enter or Tab to trigger update
    await qtyInput.press('Tab');
    await throttle(2000, 4000); // Wait for price recalculation
  }

  /** Remove a line item by index (0-based) */
  async removeItem(itemIndex: number): Promise<void> {
    const removeBtn = this.page.locator(cartLocators.lineItemRemove).nth(itemIndex);
    await removeBtn.click();
    await this.page.waitForTimeout(2000);

    // Ubuy displays a custom DOM modal dialog asking for removal confirmation
    const confirmModalBtn = this.page
      .locator(
        '#ubuy-confirm-modal-btn1:visible, button.btn-primary:has-text("Remove"):visible, .modal button:has-text("Remove"):visible',
      )
      .first();
    if (await confirmModalBtn.isVisible()) {
      await confirmModalBtn.click();
    }

    // Wait for page to reload/update after removal
    await this.page.waitForTimeout(3000);
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await throttle(2000, 4000);
  }

  /** Get the subtotal amount text */
  async getSubtotal(): Promise<string> {
    return (await this.subtotalAmount.textContent()) ?? '';
  }

  /** Get the order total text */
  async getOrderTotal(): Promise<string> {
    return (await this.orderTotal.textContent()) ?? '';
  }

  /** Get line item name at index */
  async getLineItemName(itemIndex: number): Promise<string> {
    const name = this.page.locator(cartLocators.lineItemName).nth(itemIndex);
    return (await name.textContent()) ?? '';
  }

  /** Get line item subtotal at index */
  async getLineItemSubtotal(itemIndex: number): Promise<string> {
    const subtotal = this.page.locator(cartLocators.lineItemSubtotal).nth(itemIndex);
    return (await subtotal.textContent()) ?? '';
  }

  /** Apply a coupon/promo code */
  async applyCoupon(code: string): Promise<void> {
    await this.couponInput.fill(code);
    await this.applyCouponBtn.click();
    await throttle();
  }

  /** Proceed to checkout */
  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutBtn.click();
    await throttle();
  }

  /**
   * Parse a price string like "INR71,883.00" into a number.
   * Utility for assertions involving price comparisons.
   */
  static parsePrice(priceText: string): number {
    const cleaned = priceText.replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
  }
}
