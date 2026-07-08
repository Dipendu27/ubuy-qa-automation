/**
 * Dynamic Product & Inventory Discovery Helper (`v1.5.0`).
 *
 * Discovers valid product URLs dynamically from category or search listings
 * to protect E2E tests against SKU obsolescence or inventory fluctuations.
 */

import { Page } from '@playwright/test';
import { logger } from './logger.js';

export interface DiscoveredProduct {
  title: string;
  url: string;
}

/**
 * Extract available product URLs from the current category or search result page.
 */
export async function discoverProductUrlsFromGrid(
  page: Page,
  maxItems = 5,
): Promise<DiscoveredProduct[]> {
  const discovered: DiscoveredProduct[] = [];
  const links = page.locator('a[href*="/product/"]:visible');

  const count = await links.count();
  const limit = Math.min(count, maxItems * 2);

  for (let i = 0; i < limit && discovered.length < maxItems; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute('href').catch(() => null);
    const title = (await link.textContent().catch(() => ''))?.trim() ?? 'Unknown Product';

    if (href && href.includes('/product/')) {
      const normalizedUrl = href.startsWith('/') ? `${new URL(page.url()).origin}${href}` : href;
      if (!discovered.some((p) => p.url === normalizedUrl)) {
        discovered.push({ title, url: normalizedUrl });
      }
    }
  }

  logger.info('ProductDiscovery', `Discovered ${discovered.length} live product URLs`);
  return discovered;
}
