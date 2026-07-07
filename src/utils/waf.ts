/**
 * Cloudflare WAF Challenge Detector utility.
 *
 * Per §3.6 — inspects the active page for known Cloudflare challenge markers
 * ("Just a moment", "Attention Required", or specific Cloudflare DOM IDs).
 * If detected, converts potential generic test failures/timeouts into cleanly
 * annotated skips (`environment-blocked-by-waf`).
 */

import { Page, test } from '@playwright/test';

export async function checkCloudflareWaf(page: Page): Promise<void> {
  try {
    if (page.isClosed()) {
      return;
    }

    const title = await page.title();
    if (
      title.includes('Just a moment') ||
      title.includes('Attention Required') ||
      title.toLowerCase().includes('cloudflare')
    ) {
      test.skip(true, 'environment-blocked-by-waf');
    }

    const challengeCount = await page
      .locator('#cf-challenge-running, .cf-browser-verification, #cf-content, [id*="cf-challenge"]')
      .count();
    if (challengeCount > 0) {
      test.skip(true, 'environment-blocked-by-waf');
    }
  } catch {
    // Ignore errors when page/browser context is closed or during rapid navigation
  }
}
