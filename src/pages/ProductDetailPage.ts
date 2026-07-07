/**
 * ProductDetailPage (PDP) Page Object — models product pages at /product/{sku}-{slug}.
 *
 * Key elements: gallery, title/price, variant selectors, quantity stepper,
 * add-to-cart, stock badge, delivery estimate, reviews/Q&A, related products.
 */

import { Page, Locator, expect } from '@playwright/test';
import { pdpLocators } from '../locators/pdp.locators.js';
import { throttle } from '../utils/throttle.js';

export class ProductDetailPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly originalPrice: Locator;
  readonly mainImage: Locator;
  readonly quantityInput: Locator;
  readonly addToCartBtn: Locator;
  readonly addToCartSuccess: Locator;
  readonly stockBadge: Locator;
  readonly outOfStockBadge: Locator;
  readonly deliveryEstimate: Locator;
  readonly reviewsSection: Locator;
  readonly relatedProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator(pdpLocators.productTitle).first();
    this.productPrice = page.locator(pdpLocators.productPrice).first();
    this.originalPrice = page.locator(pdpLocators.originalPrice).first();
    this.mainImage = page.locator(pdpLocators.mainImage).first();
    this.quantityInput = page.locator(pdpLocators.quantityInput).first();
    this.addToCartBtn = page.locator(pdpLocators.addToCartBtn).first();
    this.addToCartSuccess = page.locator(pdpLocators.addToCartSuccess).first();
    this.stockBadge = page.locator(pdpLocators.stockBadge).first();
    this.outOfStockBadge = page.locator(pdpLocators.outOfStockBadge).first();
    this.deliveryEstimate = page.locator(pdpLocators.deliveryEstimate).first();
    this.reviewsSection = page.locator(pdpLocators.reviewsSection).first();
    this.relatedProducts = page.locator(pdpLocators.relatedProducts).first();
  }

  /** Navigate directly to a product page */
  async goto(productUrl: string): Promise<void> {
    await this.page.goto(productUrl);
    await throttle();
  }

  /** Set the quantity in the quantity input */
  async setQuantity(quantity: number): Promise<void> {
    if (quantity === 1) return; // Default quantity is 1 on PDP
    // force: true needed due to mobile layout overlay/styling interception per discovery log
    // eslint-disable-next-line playwright/no-force-option
    await this.quantityInput.clear({ force: true });
    // eslint-disable-next-line playwright/no-force-option
    await this.quantityInput.fill(String(quantity), { force: true });
  }

  /** Add the product to cart with the specified quantity */
  async addToCart(quantity: number = 1): Promise<void> {
    await this.setQuantity(quantity);
    await this.addToCartBtn.click();
    await throttle(2000, 4000); // Longer wait for cart update AJAX
  }

  /** Select a variant option (size, color, etc.) by label */
  async selectVariant(optionLabel: string): Promise<void> {
    const option = this.page.locator(pdpLocators.variantOption(optionLabel)).first();
    await option.click();
    await throttle();
  }

  /** Assert the product is in stock */
  async expectInStock(): Promise<void> {
    await expect(this.stockBadge).toBeVisible();
    await expect(this.stockBadge).not.toHaveText(/out of stock/i);
  }

  /** Assert the product is out of stock */
  async expectOutOfStock(): Promise<void> {
    await expect(this.outOfStockBadge).toBeVisible();
  }

  /** Assert core PDP elements are visible */
  async expectPageRendered(): Promise<void> {
    await expect(this.productTitle).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.mainImage).toBeVisible();
  }

  /** Assert the add-to-cart button is disabled (e.g., out of stock) */
  async expectAddToCartDisabled(): Promise<void> {
    await expect(this.addToCartBtn).toBeDisabled();
  }

  /** Assert the add-to-cart success message appears */
  async expectAddToCartSuccessMessage(): Promise<void> {
    await expect(this.addToCartSuccess).toBeVisible({ timeout: 10_000 });
  }

  /** Get the product title text */
  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) ?? '';
  }

  /** Get the product price text */
  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }

  /** Check delivery to a specific PIN code */
  async checkDelivery(pinCode: string): Promise<void> {
    const pinInput = this.page.locator(pdpLocators.pinCodeInput).first();
    const checkBtn = this.page.locator(pdpLocators.checkDeliveryBtn).first();
    await pinInput.fill(pinCode);
    await checkBtn.click();
    await throttle();
  }
}
