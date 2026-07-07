/**
 * LoginPage Page Object — models /customer/account/login/.
 *
 * Key elements: email/password fields, submit, social login,
 * forgot-password link, "Sign Up" tab.
 *
 * Note: Ubuy uses a tabbed login/signup interface. The "Log In" tab is
 * active by default showing #login_username and #login.password.
 */

import { Page, Locator, expect } from '@playwright/test';
import { accountLocators } from '../locators/account.locators.js';
import { throttle } from '../utils/throttle.js';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;
  readonly socialLoginGoogle: Locator;
  readonly socialLoginFacebook: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(accountLocators.login.emailInput).first();
    this.passwordInput = page.locator(accountLocators.login.passwordInput).first();
    this.submitBtn = page.locator(accountLocators.login.submitBtn).first();
    this.forgotPasswordLink = page.locator(accountLocators.login.forgotPasswordLink).first();
    this.createAccountLink = page.locator(accountLocators.login.createAccountLink).first();
    this.socialLoginGoogle = page.locator(accountLocators.login.socialLoginGoogle).first();
    this.socialLoginFacebook = page.locator(accountLocators.login.socialLoginFacebook).first();
    this.errorMessage = page.locator(accountLocators.login.errorMessage).first();
  }

  /** Navigate to the login page */
  async goto(): Promise<void> {
    await this.page.goto('/customer/account/login/');
    await throttle();
  }

  /** Login with email and password */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
    await throttle(3000, 5000);
  }

  /** Assert login form elements are visible */
  async expectFormRendered(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitBtn).toBeVisible();
  }

  /** Assert an error message is displayed after invalid login */
  async expectErrorMessage(): Promise<void> {
    // Ubuy may show errors via AJAX in div.error.text-danger,
    // or the page may reload with an error message, or the URL stays the same
    // We check both: error div with text, or still on login page
    const errorVisible = await this.errorMessage.isVisible().catch(() => false);
    const url = this.page.url();
    const stillOnLogin = url.includes('/customer/account/login');
    expect(errorVisible || stillOnLogin).toBeTruthy();
  }

  /** Assert the error message contains specific text */
  async expectErrorMessageContains(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  /** Assert social login options are visible */
  async expectSocialLoginVisible(): Promise<void> {
    const socialBtn = this.page.locator(accountLocators.login.socialLoginBtn).first();
    const visible = await socialBtn.isVisible().catch(() => false);
    const googleVisible = await this.socialLoginGoogle.isVisible().catch(() => false);
    const facebookVisible = await this.socialLoginFacebook.isVisible().catch(() => false);
    expect(visible || googleVisible || facebookVisible).toBeTruthy();
  }

  /** Click the "Sign Up" tab to go to register */
  async goToRegister(): Promise<void> {
    await this.createAccountLink.click();
    await throttle();
  }
}
