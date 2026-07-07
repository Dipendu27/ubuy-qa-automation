/**
 * Base fixture — extends Playwright's test with page objects injected.
 *
 * This is the central fixture file. All test specs should import `test`
 * and `expect` from here instead of from '@playwright/test' directly.
 * Page objects are lazily instantiated and available as fixture parameters.
 */

import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { CategoryPage } from '../pages/CategoryPage.js';
import { ProductDetailPage } from '../pages/ProductDetailPage.js';
import { CartPage } from '../pages/CartPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { AddressStep } from '../pages/checkout/AddressStep.js';
import { ShippingStep } from '../pages/checkout/ShippingStep.js';
import { PaymentStep } from '../pages/checkout/PaymentStep.js';
import { MyAccountPage } from '../pages/MyAccountPage.js';
import { StoreSwitcher } from '../components/StoreSwitcher.js';
import { checkCloudflareWaf } from '../utils/waf.js';

/** Type definition for all page object fixtures */
type PageObjectFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  categoryPage: CategoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  addressStep: AddressStep;
  shippingStep: ShippingStep;
  paymentStep: PaymentStep;
  myAccountPage: MyAccountPage;
  storeSwitcher: StoreSwitcher;
  checkWaf: void;
};

/**
 * Extended test object with all page objects available as fixtures.
 *
 * Usage in test files:
 * ```ts
 * import { test, expect } from '../../src/fixtures/base.fixture';
 *
 * test('homepage loads', async ({ homePage }) => {
 *   await homePage.goto();
 *   await homePage.expectCoreElementsVisible();
 * });
 * ```
 */
export const test = base.extend<PageObjectFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  addressStep: async ({ page }, use) => {
    await use(new AddressStep(page));
  },

  shippingStep: async ({ page }, use) => {
    await use(new ShippingStep(page));
  },

  paymentStep: async ({ page }, use) => {
    await use(new PaymentStep(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  storeSwitcher: async ({ page }, use) => {
    await use(new StoreSwitcher(page));
  },

  checkWaf: [
    async ({ page }, use) => {
      await checkCloudflareWaf(page);
      try {
        await use();
      } catch (error) {
        await checkCloudflareWaf(page);
        throw error;
      } finally {
        await checkCloudflareWaf(page);
      }
    },
    { auto: true },
  ],
});

export { expect };
