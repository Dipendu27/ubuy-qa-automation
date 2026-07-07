/**
 * Environment configuration reader.
 * Centralizes all env-var access so tests never read process.env directly.
 */

import dotenv from 'dotenv';

dotenv.config();

export const env = {
  /** Base URL for the Ubuy storefront under test */
  baseUrl: process.env.BASE_URL ?? 'https://www.ubuy.co.in',

  /** Test account email for login tests */
  testUserEmail: process.env.TEST_USER_EMAIL ?? '',

  /** Test account password for login tests */
  testUserPassword: process.env.TEST_USER_PASSWORD ?? '',

  /** Email prefix for registration tests (timestamp appended at runtime) */
  registerEmailPrefix: process.env.TEST_REGISTER_EMAIL_PREFIX ?? 'ubuy.qa.test',

  /** Whether running in CI */
  isCI: process.env.CI === 'true',

  /** Whether to run headless (overrides playwright.config default) */
  headless: process.env.HEADLESS === 'true',
} as const;
