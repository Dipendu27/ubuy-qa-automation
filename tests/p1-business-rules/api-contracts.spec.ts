/**
 * P1 — Network & API Schema Contract Tests (`v1.5.0`).
 *
 * Intercepts live AJAX responses during user navigation to assert valid payload schemas.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { validateJsonResponseContract } from '../../src/utils/apiSchema.js';

test.describe('API Schema & Network Contracts — P1 Business Rules', () => {
  test('search autocomplete AJAX endpoint responds with valid HTTP status', async ({
    homePage,
    page,
  }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await test.step('Listen for AJAX search responses & validate contract', async () => {
      const responsePromise = page.waitForResponse(
        (response) =>
          (response.url().includes('/search') || response.url().includes('ajax')) &&
          response.status() === 200,
        { timeout: 5000 },
      );

      const searchInput = page.locator('input[name="q"]:visible').first();
      await searchInput.fill('laptop');

      const response = await responsePromise;
      const contract = await validateJsonResponseContract(response);
      expect(contract.valid, `API contract validation failed: ${contract.errors.join('; ')}`).toBe(
        true,
      );

      await expect(searchInput).toHaveValue('laptop');
    });
  });
});
