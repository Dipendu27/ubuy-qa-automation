/**
 * P1 — Store Switcher Network/Session-Level Verification (`v2.0.1` rewrite).
 *
 * Alongside UI-based observation (`store-switcher.spec.ts`), this spec observes
 * REAL network and session evidence during a store region switch:
 *   1. HTTP responses fired by the switch (status must be 2xx/3xx)
 *   2. A before/after diff of the browser cookie jar (session/store cookies
 *      must actually change)
 *
 * v2.0.1: Prior version asserted only `cookies.length > 0`, `options > 0`, and
 * `url.includes('ubuy')` — all tautologies that could never fail. Every
 * assertion below can now fail if the store switch silently breaks.
 *
 * State hygiene: the suite runs serially against a shared production session,
 * so the test switches back to India before finishing.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import type { Response } from '@playwright/test';

/** Cookie shape returned by BrowserContext.cookies() */
interface CookieRecord {
  name: string;
  value: string;
  domain: string;
}

/** Build a name → value map for diffing cookie jars. */
function cookieMap(cookies: CookieRecord[]): Map<string, string> {
  return new Map(cookies.map((c) => [`${c.domain}|${c.name}`, c.value]));
}

/** Count cookies that were added or changed between two snapshots. */
function countCookieChanges(before: CookieRecord[], after: CookieRecord[]): number {
  const beforeMap = cookieMap(before);
  let changes = 0;
  for (const [key, value] of cookieMap(after)) {
    if (!beforeMap.has(key) || beforeMap.get(key) !== value) changes++;
  }
  return changes;
}

test.describe('Store Switcher Network-Level Cart Audit — P1 Business Rules', () => {
  test('network verification: store switch fires successful responses and mutates session cookies', async ({
    homePage,
    storeSwitcher,
    page,
  }, testInfo) => {
    testInfo.annotations.push({
      type: 'network-verified',
      description:
        'Store switch verified via observed HTTP response statuses (2xx/3xx) and a before/after session cookie diff. Falls back to failing — never to a tautology.',
    });

    let cookiesBefore: CookieRecord[] = [];

    await test.step('Navigate to homepage and snapshot the initial cookie jar', async () => {
      await homePage.goto();
      cookiesBefore = await page.context().cookies();
      // Precondition (not the verification): a session exists to diff against.
      expect(cookiesBefore.length).toBeGreaterThan(0);
    });

    // Collect every response observed during the switch window. Listeners are
    // registered BEFORE the interaction so nothing is missed.
    const observedResponses: { url: string; status: number }[] = [];
    const isStoreSwitchRelated = (url: string): boolean =>
      /store|region|country|currency|switch/i.test(url) || /ubuy\.(co\.in|com)\/?$/i.test(url);

    await test.step('Switch from India to US store while observing network traffic', async () => {
      const onResponse = (response: Response): void => {
        observedResponses.push({ url: response.url(), status: response.status() });
      };
      page.on('response', onResponse);

      try {
        // Handles the confirm modal if the cart is non-empty; guest homepage
        // session typically has an empty cart, so the modal may not appear.
        await storeSwitcher.switchStoreAndConfirm('US');
        // Let the post-switch navigation/AJAX settle before evaluating evidence.
        await page.waitForLoadState('domcontentloaded');
      } finally {
        page.off('response', onResponse);
      }
    });

    await test.step('EVIDENCE 1 — switch-related responses completed with 2xx/3xx status', async () => {
      const related = observedResponses.filter((r) => isStoreSwitchRelated(r.url));
      // The switch MUST produce observable network traffic…
      expect(
        related.length,
        `Expected store-switch-related network traffic; observed ${observedResponses.length} total responses`,
      ).toBeGreaterThan(0);
      // …and the primary responses must be successful (2xx) or redirects (3xx).
      const failed = related.filter((r) => r.status >= 400);
      expect(
        failed,
        `Store-switch responses returned error statuses: ${JSON.stringify(failed.slice(0, 5))}`,
      ).toHaveLength(0);
    });

    await test.step('EVIDENCE 2 — session/store cookies changed after the switch', async () => {
      const cookiesAfter = await page.context().cookies();
      const changes = countCookieChanges(cookiesBefore, cookiesAfter);
      expect(
        changes,
        'Expected at least one cookie to be added or changed by the store switch — identical cookie jars mean the switch had no server-side effect',
      ).toBeGreaterThan(0);
    });

    await test.step('Restore state: switch back to India store', async () => {
      await storeSwitcher.switchStoreAndConfirm('India');
      await page.waitForLoadState('domcontentloaded');
    });
  });
});
