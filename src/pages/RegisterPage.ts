/**
 * RegisterPage Page Object — models the Sign Up tab on /customer/account/login/.
 *
 * Note: On Ubuy, registration is on the SAME page as login, behind the "Sign Up" tab.
 * The registration form has: email, password, confirm password (no first/last name).
 */

import { Page, Locator, expect } from '@playwright/test';
import { accountLocators } from '../locators/account.locators.js';
import { throttle } from '../utils/throttle.js';

export class RegisterPage {
  readonly page: Page;
  readonly signUpTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitBtn: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpTab = page.locator(accountLocators.register.signUpTab).first();
    this.emailInput = page.locator(accountLocators.register.emailInput).first();
    this.passwordInput = page.locator(accountLocators.register.passwordInput).first();
    this.confirmPasswordInput = page.locator(accountLocators.register.confirmPasswordInput).first();
    this.submitBtn = page.locator(accountLocators.register.submitBtn).first();
    this.successMessage = page.locator(accountLocators.register.successMessage).first();
    this.errorMessage = page.locator(accountLocators.register.errorMessage).first();
  }

  /** Navigate to the login page and switch to the Sign Up tab */
  async goto(): Promise<void> {
    await this.page.goto('/customer/account/login/');
    await throttle();
    // Click the Sign Up tab to reveal registration form
    await this.signUpTab.click();
    await throttle();
  }

  /** Fill out and submit the registration form */
  async register(data: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
    await this.submitBtn.click();
    await throttle(3000, 5000);
  }

  /** Generate a unique test email with timestamp */
  static generateTestEmail(prefix: string = 'ubuy.qa.test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}+${timestamp}${random}@test.example.com`;
  }

  /** Assert registration form elements are visible (email + submit) */
  async expectFormRendered(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    // Note: password fields only appear after OTP verification on Ubuy
    await expect(this.submitBtn).toBeVisible();
  }

  /** Assert registration success */
  async expectRegistrationSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  /** Assert registration error */
  async expectRegistrationError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
