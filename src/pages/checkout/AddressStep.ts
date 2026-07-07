/**
 * AddressStep Page Object — models the checkout address/shipping-address step.
 *
 * URL: unconfirmed — to be discovered in Phase 0.
 * Key elements: address form, PIN/postal code validation, deliverability check.
 */

import { Page, Locator, expect } from '@playwright/test';
import { checkoutLocators } from '../../locators/checkout.locators.js';
import { throttle } from '../../utils/throttle.js';

export class AddressStep {
  readonly page: Page;
  readonly stepContainer: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetAddress1: Locator;
  readonly streetAddress2: Locator;
  readonly cityInput: Locator;
  readonly stateDropdown: Locator;
  readonly postalCodeInput: Locator;
  readonly countryDropdown: Locator;
  readonly phoneInput: Locator;
  readonly continueBtn: Locator;
  readonly deliverabilityError: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    const loc = checkoutLocators.address;
    this.stepContainer = page.locator(loc.stepContainer).first();
    this.firstNameInput = page.locator(loc.firstNameInput).first();
    this.lastNameInput = page.locator(loc.lastNameInput).first();
    this.streetAddress1 = page.locator(loc.streetAddress1).first();
    this.streetAddress2 = page.locator(loc.streetAddress2).first();
    this.cityInput = page.locator(loc.cityInput).first();
    this.stateDropdown = page.locator(loc.stateDropdown).first();
    this.postalCodeInput = page.locator(loc.postalCodeInput).first();
    this.countryDropdown = page.locator(loc.countryDropdown).first();
    this.phoneInput = page.locator(loc.phoneInput).first();
    this.continueBtn = page.locator(loc.continueToShippingBtn).first();
    this.deliverabilityError = page.locator(loc.deliverabilityError).first();
    this.validationError = page.locator(loc.validationError).first();
  }

  /** Fill the complete address form */
  async fillAddress(address: {
    firstName: string;
    lastName: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    phone: string;
  }): Promise<void> {
    await this.firstNameInput.fill(address.firstName);
    await this.lastNameInput.fill(address.lastName);
    await this.streetAddress1.fill(address.street1);
    if (address.street2) {
      await this.streetAddress2.fill(address.street2);
    }
    await this.cityInput.fill(address.city);
    await this.stateDropdown.selectOption({ label: address.state });
    await this.postalCodeInput.fill(address.postalCode);
    if (address.country) {
      await this.countryDropdown.selectOption({ label: address.country });
    }
    await this.phoneInput.fill(address.phone);
    await throttle();
  }

  /** Continue to the next checkout step (shipping) */
  async continueToShipping(): Promise<void> {
    await this.continueBtn.click();
    await throttle(2000, 4000);
  }

  /** Assert the address step is rendered */
  async expectStepRendered(): Promise<void> {
    await expect(this.stepContainer).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
  }

  /** Assert a deliverability error is shown (non-serviceable address) */
  async expectDeliverabilityError(): Promise<void> {
    await expect(this.deliverabilityError).toBeVisible();
  }

  /** Assert no deliverability error is shown (serviceable address) */
  async expectNoDeliverabilityError(): Promise<void> {
    await expect(this.deliverabilityError).toBeHidden();
  }

  /** Assert validation errors are shown */
  async expectValidationErrors(): Promise<void> {
    await expect(this.validationError).toBeVisible();
  }
}
