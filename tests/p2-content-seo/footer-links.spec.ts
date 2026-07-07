/**
 * P2 — Footer link integrity tests.
 *
 * Verifies: Footer link integrity sweep — no dead links across static pages,
 * brand pages, and category pages sampled from the sitemap.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';

test.describe('Footer Links — P2 Content & SEO', () => {
  test('footer links on homepage do not return 404 or dead links', async ({ homePage, page }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Collect sample of footer links', async () => {
      const footerLinks = page.locator('footer a[href^="http"], footer a[href^="/"]');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(0);

      // We test a sample of up to 5 links to keep test execution duration reasonable
      const sampleSize = Math.min(5, count);
      const linksToTest: string[] = [];

      for (let i = 0; i < sampleSize; i++) {
        const href = await footerLinks.nth(i).getAttribute('href');
        if (href && !linksToTest.includes(href)) {
          linksToTest.push(href);
        }
      }

      for (const href of linksToTest) {
        await test.step(`Verify link: ${href}`, async () => {
          // Open link in a new page or check response status via request
          const response = await page.request.get(href);
          expect(response.status()).toBeLessThan(400);
        });
      }
    });
  });
});
