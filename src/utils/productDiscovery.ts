/**
 * Dynamic Product & Inventory Discovery Helper (`v1.5.0`).
 *
 * Discovers valid product URLs dynamically from category or search listings
 * to protect E2E tests against SKU obsolescence or inventory fluctuations.
 */

import { Page } from '@playwright/test';
import { env } from '../config/env.js';
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

/**
 * Dynamically discover an Out-of-Stock (OOS) product URL from search/category listings.
 * Returns null if all discovered items are currently in stock.
 */
export async function findCurrentOosProduct(
  page: Page,
  searchKeyword = 'discontinued clearance',
): Promise<DiscoveredProduct | null> {
  logger.info(
    'ProductDiscovery',
    `Searching for dynamic OOS product with keyword: "${searchKeyword}"`,
  );

  // Respect BASE_URL so staging-environment runs are not silently redirected to production (v2.0.2)
  await page.goto(`${env.baseUrl}/search/?q=${encodeURIComponent(searchKeyword)}`);

  // Look for product cards or badges indicating out of stock status
  const oosCard = page
    .locator(
      '.product-item:has(.out-of-stock, .sold-out, [data-stock="out_of_stock"], :text("Out of Stock")), .product-card:has(:text("Out of Stock"))',
    )
    .first();

  if (await oosCard.isVisible().catch(() => false)) {
    const link = oosCard.locator('a[href*="/product/"]').first();
    const href = await link.getAttribute('href').catch(() => null);
    const title = (await link.textContent().catch(() => ''))?.trim() ?? 'Out of Stock SKU';

    if (href && href.includes('/product/')) {
      const normalizedUrl = href.startsWith('/') ? `${new URL(page.url()).origin}${href}` : href;
      logger.info('ProductDiscovery', `Found live OOS product: ${normalizedUrl}`);
      return { title, url: normalizedUrl };
    }
  }

  logger.info('ProductDiscovery', 'No OOS product found on current search listing.');
  return null;
}
