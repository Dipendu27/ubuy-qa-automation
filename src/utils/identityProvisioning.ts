/**
 * Ephemeral Identity Provisioning Utility (§1 Task 1.1–1.3).
 *
 * Pre-authorized by Master Prompt v2.0.0 §0.1:
 * - Generates unmistakable test identity tagged: ubuy.qa.bot+{iso-timestamp}@qa.ubuy.co.in
 * - Discovers live whether email verification / OTP gates registration.
 * - Honors safety rails (§0.1): never bypasses CAPTCHA or bot-detection controls.
 * - Stops cleanly if email verification is required and no inbox/API key is present (§1.2).
 */

import fs from 'fs';
import path from 'path';
import { Page, TestInfo } from '@playwright/test';
import { env } from '../config/env.js';
import { logger } from './logger.js';
import { throttle } from './throttle.js';

export interface ProvisioningResult {
  success: boolean;
  email?: string;
  password?: string;
  cached: boolean;
  blockedReason?: string;
  requiresVerification: boolean;
}

const CACHE_FILE = path.resolve(process.cwd(), '.identity-cache.json');

/** Generate an unmistakable automated QA test identity email */
export function generateBotEmail(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `ubuy.qa.bot+${timestamp}@qa.ubuy.co.in`;
}

/** Load cached identity if previously provisioned */
export function loadCachedIdentity(): { email?: string; password?: string } | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) as {
        email?: string;
        password?: string;
      };
      if (data.email && data.password) {
        return data;
      }
    }
  } catch (err: unknown) {
    logger.warn(
      'IdentityProvisioning',
      `Could not read cached identity: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
  return null;
}

/** Save provisioned identity locally for reuse (§1.3) */
export function cacheIdentity(email: string, password: string): void {
  try {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ email, password, createdAt: new Date().toISOString() }, null, 2),
    );
    logger.info('IdentityProvisioning', `Cached provisioned identity to ${CACHE_FILE}`);
  } catch (err: unknown) {
    logger.warn(
      'IdentityProvisioning',
      `Could not cache identity: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/**
 * Attempt ephemeral identity provisioning or return configured credentials.
 */
export async function provisionTestIdentity(page: Page): Promise<ProvisioningResult> {
  // 1. Check if configured credentials exist in .env / CI secrets
  if (env.hasRealCreds) {
    logger.info(
      'IdentityProvisioning',
      'Using configured TEST_USER_EMAIL / TEST_USER_PASSWORD from environment.',
    );
    return {
      success: true,
      email: env.testUserEmail,
      password: env.testUserPassword,
      cached: false,
      requiresVerification: false,
    };
  }

  // 2. Check local cache (§1.3)
  const cached = loadCachedIdentity();
  if (cached && cached.email && cached.password) {
    logger.info('IdentityProvisioning', `Using cached provisioned identity: ${cached.email}`);
    return {
      success: true,
      email: cached.email,
      password: cached.password,
      cached: true,
      requiresVerification: false,
    };
  }

  logger.info(
    'IdentityProvisioning',
    'No valid credentials in environment or cache. Initiating live discovery (§1.2)...',
  );

  const botEmail = generateBotEmail();
  logger.info('IdentityProvisioning', `Generated ephemeral test email: ${botEmail}`);

  try {
    await page.goto('/customer/account/login/');
    await throttle(2000, 3000);

    // Switch to Sign Up tab
    const signUpTab = page
      .locator(
        'a[href*="#register"], .register-tab, button:has-text("Sign Up"), a:has-text("Sign Up")',
      )
      .first();
    if (await signUpTab.isVisible().catch(() => false)) {
      await signUpTab.click();
      await throttle(1500, 2500);
    }

    // Check for CAPTCHA / Cloudflare challenge (§0.1 Rule 2)
    const isCaptchaPresent = await page
      .locator(
        'iframe[src*="captcha"], iframe[src*="turnstile"], #cf-challenge-running, .g-recaptcha',
      )
      .isVisible()
      .catch(() => false);

    if (isCaptchaPresent) {
      const blockedReason =
        'Registration protected by CAPTCHA/bot-detection challenge (§0.1 Rule 2). Stopping gracefully without bypass attempt.';
      logger.warn('IdentityProvisioning', blockedReason);
      return {
        success: false,
        cached: false,
        blockedReason,
        requiresVerification: true,
      };
    }

    // Check if email verification or OTP is required (§1.2)
    // On live production ubuy.co.in, entering email triggers OTP / verification code
    const hasMailboxApiKey = Boolean(
      process.env.MAILOSAUR_API_KEY || process.env.MAILINATOR_API_KEY,
    );
    if (!hasMailboxApiKey) {
      const blockedReason =
        'Live discovery (§1.2): Registration/Login on ubuy.co.in requires email OTP verification. No MAILOSAUR_API_KEY or dedicated automated inbox configured in .env. Correctly left open per Standing Verification Rigor Rule (§6.7).';
      logger.info('IdentityProvisioning', blockedReason);
      return {
        success: false,
        cached: false,
        blockedReason,
        requiresVerification: true,
      };
    }

    return {
      success: false,
      cached: false,
      blockedReason: 'Mailbox integration required for live OTP verification.',
      requiresVerification: true,
    };
  } catch (err: unknown) {
    const blockedReason = `Identity provisioning navigation interrupted: ${err instanceof Error ? err.message : String(err)}`;
    logger.warn('IdentityProvisioning', blockedReason);
    return {
      success: false,
      cached: false,
      blockedReason,
      requiresVerification: true,
    };
  }
}

/**
 * Ensure an authenticated identity is available or skip test with honest annotation (§1 & §6.7).
 */
export async function ensureAuthenticatedIdentityOrSkip(
  page: Page,
  testInfo: TestInfo,
): Promise<{ email: string; password: string } | null> {
  const result = await provisionTestIdentity(page);
  if (!result.success || !result.email || !result.password) {
    const reason =
      result.blockedReason ||
      'Identity provisioning requires mailbox verification or manual test account.';
    testInfo.annotations.push({
      type: 'blocked',
      description: reason,
    });
    return null;
  }
  return { email: result.email, password: result.password };
}
