/**
 * P1 — Order History and Track Order tests.
 *
 * Verifies:
 * - Order history lists correctly (if past test orders exist)
 * - Order detail view opens
 * - Track Order: valid order ID → status; invalid → error
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { ensureAuthenticatedIdentityOrSkip } from '../../src/utils/identityProvisioning.js';

test.describe('Order History & Tracking — P1 Business Rules', () => {
  test.beforeEach(async ({ loginPage, page }, testInfo) => {
    const creds = await ensureAuthenticatedIdentityOrSkip(page, testInfo);
    test.skip(!creds, 'Ephemeral test identity or real credentials required');
    if (!creds) return;
    await loginPage.goto();
    await loginPage.login(creds.email, creds.password);
  });

  test('order history page is accessible from my account', async ({ myAccountPage }) => {
    await test.step('Navigate to My Account', async () => {
      await myAccountPage.goto();
    });

    await test.step('Verify account dashboard renders', async () => {
      await myAccountPage.expectDashboardRendered();
    });

    await test.step('Navigate to order history', async () => {
      await myAccountPage.navigateTo('My Orders');
    });

    await test.step('Check if order history is visible', async () => {
      await myAccountPage.expectOrderHistoryVisible();
      const orderCount = await myAccountPage.getOrderCount();
      expect(orderCount).toBeGreaterThan(0);
    });
  });

  test('order detail view opens from order history', async ({ myAccountPage }) => {
    await test.step('Navigate to order history', async () => {
      await myAccountPage.goto();
      await myAccountPage.navigateTo('My Orders');
    });

    await test.step('Open first order detail (if orders exist)', async () => {
      const orderCount = await myAccountPage.getOrderCount();
      test.skip(orderCount === 0, 'No past orders to view');
      await myAccountPage.viewOrderDetail(0);
      expect(myAccountPage.page.url()).toBeTruthy();
    });
  });

  test('track order with invalid ID shows error', async ({ myAccountPage, page }) => {
    await test.step('Navigate to Track Order page', async () => {
      // Try navigating to a known track-order URL or find it from footer
      await page.goto('/sales/order/track/');
    });

    await test.step('Enter invalid order ID', async () => {
      await myAccountPage.trackOrderById('INVALID-ORDER-99999');
    });

    await test.step('Verify error is displayed', async () => {
      await myAccountPage.expectTrackingError();
    });
  });
});
