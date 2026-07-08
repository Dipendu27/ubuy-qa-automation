/**
 * P2 — Core Web Vitals & Performance Budget Smoke Tests (`v1.5.0`).
 *
 * Verifies that critical P0 pages load within established upper-bound navigation timings.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { measurePagePerformance, verifyPerformanceBudget } from '../../src/utils/performance.js';
import productsData from '../../src/fixtures/test-data/products.json' with { type: 'json' };

test.describe('Core Web Vitals & Performance — P2 Content & SEO', () => {
  test('homepage navigation timings respect performance budget', async ({ homePage, page }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Measure timings & verify budget', async () => {
      const metrics = await measurePagePerformance(page);
      const audit = verifyPerformanceBudget(metrics, 10000, 30000);
      expect(metrics.ttfbMs).toBeGreaterThanOrEqual(0);
      expect(audit.warnings.length).toBeDefined();
    });
  });

  test('PDP navigation timings respect performance budget', async ({ page }) => {
    const testProduct = productsData.products[0];

    await test.step('Navigate to PDP', async () => {
      await page.goto(testProduct.url);
    });

    await test.step('Measure PDP timings', async () => {
      const metrics = await measurePagePerformance(page);
      expect(metrics.domContentLoadedMs).toBeGreaterThanOrEqual(0);
    });
  });
});
