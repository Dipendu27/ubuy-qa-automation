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

  /**
   * Assert the login attempt was REJECTED.
   *
   * v2.0.1: Previously asserted `errorVisible || stillOnLogin` — a dead submit
   * button (no error, no navigation) still satisfied `stillOnLogin`, so the
   * assertion could never fail. Now requires a positive rejection signal:
   * either the error element becomes visible, or the login page re-rendered
   * with a RESET (empty) password field — evidence of a rejected round-trip,
   * not mere absence of navigation. A dead page (typed password still present,
   * no error) fails both branches.
   */
  async expectErrorMessage(): Promise<void> {
    // Primary positive signal: error element (AJAX div.error.text-danger) appears.
    const errorAppeared = await this.errorMessage
      .waitFor({ state: 'visible', timeout: 10_000 })
      .then(() => true)
      .catch(() => false);

    if (errorAppeared) {
      await expect(this.errorMessage).toBeVisible();
      return;
    }

    // Fallback: page reloaded the login form without a persistent DOM error
    // element. Require evidence of a rejected round-trip.
    expect(this.page.url(), 'Rejected login must remain on the login page').toContain(
      '/customer/account/login',
    );
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(
      this.passwordInput,
      'Password field must be reset after a rejected login round-trip — a still-populated field means the submit did nothing',
    ).toHaveValue('');
  }

  /** Assert the error message contains specific text */
  async expectErrorMessageContains(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(text);
  }

  /**
   * Assert social login options are visible.
   *
   * v2.0.1: Rewritten as an unconditional web-first assertion via Locator.or()
   * — fails with a proper timeout/diff instead of a bare boolean expect.
   */
  async expectSocialLoginVisible(): Promise<void> {
    const socialBtn = this.page.locator(accountLocators.login.socialLoginBtn).first();
    const anySocialLogin = socialBtn
      .or(this.socialLoginGoogle)
      .or(this.socialLoginFacebook)
      .first();
    await expect(anySocialLogin).toBeVisible({ timeout: 10_000 });
  }

  /** Click the "Sign Up" tab to go to register */
  async goToRegister(): Promise<void> {
    await this.createAccountLink.click();
    await throttle();
  }
}
