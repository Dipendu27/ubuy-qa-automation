/**
 * Core Web Vitals & Navigation Performance Utility (`v1.5.0`).
 *
 * Measures browser navigation timings and paint metrics via Playwright evaluate calls.
 * Allows establishing non-breaking performance budgets across P0 pages.
 */

import { Page } from '@playwright/test';
import { logger } from './logger.js';

export interface PerformanceMetrics {
  ttfbMs: number;
  domContentLoadedMs: number;
  loadEventMs: number;
  firstContentfulPaintMs: number | null;
}

/**
 * Collect navigation and paint timing metrics from the browser context.
 */
export async function measurePagePerformance(page: Page): Promise<PerformanceMetrics> {
  const metrics = await page.evaluate(() => {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const paintEntries = performance.getEntriesByType('paint');

    let ttfbMs = 0;
    let domContentLoadedMs = 0;
    let loadEventMs = 0;
    let fcpMs: number | null = null;

    if (navEntries.length > 0) {
      const nav = navEntries[0];
      ttfbMs = Math.round(nav.responseStart - nav.startTime);
      domContentLoadedMs = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
      loadEventMs = Math.round(nav.loadEventEnd - nav.startTime);
    }

    const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      fcpMs = Math.round(fcpEntry.startTime);
    }

    return {
      ttfbMs,
      domContentLoadedMs,
      loadEventMs,
      firstContentfulPaintMs: fcpMs,
    };
  });

  logger.info(
    'Performance',
    `TTFB: ${metrics.ttfbMs}ms | DCL: ${metrics.domContentLoadedMs}ms | Load: ${metrics.loadEventMs}ms | FCP: ${metrics.firstContentfulPaintMs ?? 'N/A'}ms`,
  );

  return metrics;
}

/**
 * Assert that Time to First Byte (TTFB) is within acceptable upper bound (e.g. 5000ms).
 */
export function verifyPerformanceBudget(
  metrics: PerformanceMetrics,
  maxTtfbMs = 5000,
  maxDclMs = 15000,
): { passed: boolean; warnings: string[] } {
  const warnings: string[] = [];
  let passed = true;

  if (metrics.ttfbMs > maxTtfbMs) {
    warnings.push(`TTFB (${metrics.ttfbMs}ms) exceeded budget (${maxTtfbMs}ms)`);
    passed = false;
  }
  if (metrics.domContentLoadedMs > maxDclMs) {
    warnings.push(
      `DOM Content Loaded (${metrics.domContentLoadedMs}ms) exceeded budget (${maxDclMs}ms)`,
    );
    passed = false;
  }

  return { passed, warnings };
}
