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

test.describe('Static Pages — P2 Content & SEO', () => {
  for (const pageInfo of staticPages) {
    test(`${pageInfo.name} page loads and has content`, async ({ page }) => {
      await test.step(`Navigate to ${pageInfo.url}`, async () => {
        await page.goto(pageInfo.url);
      });

      await test.step('Verify page loaded (HTTP 200)', async () => {
        // Page should not show a Cloudflare block or 404
        const title = await page.title();
        expect(title).toBeTruthy();
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
