/**
 * P2 — Static pages content presence tests.
 *
 * Verifies: FAQ, Terms, Shipping Policy, Warranty, About, Contact pages
 * load and key on-page content sections are present.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';

const staticPages = [
  { name: 'About Us', url: '/about-us', expectedContent: 'about' },
  { name: 'Contact', url: '/contacts', expectedContent: 'contact' },
  { name: 'FAQ / Help Centre', url: '/faq', expectedContent: 'faq' },
  { name: 'Terms & Conditions', url: '/terms', expectedContent: 'terms' },
  { name: 'Shipping Policy', url: '/shipping-policy', expectedContent: 'shipping' },
  { name: 'Warranty (UCare)', url: '/warranty', expectedContent: 'warranty' },
  { name: 'ISO Compliance', url: '/iso-27001-2022-certified', expectedContent: 'iso' },
  { name: 'Download App', url: '/download-app', expectedContent: 'app' },
  { name: 'Customer Reviews', url: '/ubuy-reviews', expectedContent: 'review' },
  { name: 'Bulk Quotation', url: '/quotation-page', expectedContent: 'quotation' },
];

/**
 * v2.0.1: The "HTTP 200" step previously never checked a status code — it only
 * asserted a truthy <title>, so a styled 404 or WAF interstitial passed. Now
 * the navigation response status must be 200 and the page must not contain
 * common error markers.
 */
const ERROR_MARKERS = [/\b404\b/i, /not found/i, /access denied/i, /attention required/i];

test.describe('Static Pages — P2 Content & SEO', () => {
  for (const pageInfo of staticPages) {
    test(`${pageInfo.name} page loads and has content`, async ({ page }) => {
      let status: number | undefined;

      await test.step(`Navigate to ${pageInfo.url}`, async () => {
        const response = await page.goto(pageInfo.url);
        status = response?.status();
      });

      await test.step('Verify page loaded (HTTP 200)', async () => {
        expect(status, `Expected HTTP 200 for ${pageInfo.url}, got ${status}`).toBe(200);
      });

      await test.step('Verify page is not a soft error / block page', async () => {
        const title = await page.title();
        const bodyText = (await page.locator('body').textContent()) ?? '';
        for (const marker of ERROR_MARKERS) {
          expect(title, `Title matches error marker ${marker}`).not.toMatch(marker);
          expect(
            bodyText.slice(0, 2000),
            `Body (leading content) matches error marker ${marker}`,
          ).not.toMatch(marker);
        }
      });

      await test.step('Verify page has visible body content', async () => {
        const body = page.locator('body');
        await expect(body).toBeVisible();
        const bodyText = await body.textContent();
        expect(bodyText?.length).toBeGreaterThan(100);
      });

      await test.step('Verify page contains expected content keyword', async () => {
        const bodyText = (await page.locator('body').textContent()) ?? '';
        expect(bodyText.toLowerCase()).toContain(pageInfo.expectedContent);
      });
    });
  }
});
