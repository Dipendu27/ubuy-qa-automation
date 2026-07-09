import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env.js';

/**
 * Playwright configuration for Ubuy QA Automation Framework.
 *
 * Key design decisions (per §5 safety rails):
 * - Single worker to rate-limit against production
 * - Headed by default for Cloudflare compatibility
 * - Screenshots/video/trace retained only on failure to save disk
 * - 45s timeout per test to accommodate Cloudflare challenge delays
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      maxDiffPixels: 150,
    },
  },
  retries: 1,
  workers: 1, // Single worker — §5.4 rate-limit rail
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: env.baseUrl,
    // Headed by default (HEADLESS unset/false) — real browser fingerprint, see §5.1.
    // Set HEADLESS=true to run headless (e.g., containers without a display server).
    headless: env.headless,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
  },
  // Cross-Browser Scope Decision (§4 Task 10):
  // Exclusively targeting Chromium (Desktop/Mobile) to protect production rate-limits (single worker)
  // and prioritize >92% user traffic. Firefox and WebKit are deferred until a dedicated corporate
  // self-hosted runner can support parallel multi-engine nightly runs without WAF challenge spikes.
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
  outputDir: 'test-results/',
});
