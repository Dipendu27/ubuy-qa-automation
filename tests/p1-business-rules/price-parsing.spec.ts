/**
 * P1 — Price Parsing Unit Regression Tests (`v1.9.0`).
 *
 * Verifies that `CartPage.parsePrice` correctly converts price strings to numeric values.
 */

import { test, expect } from '../../src/fixtures/base.fixture.js';
import { CartPage } from '../../src/pages/CartPage.js';

test.describe('Price Parsing Unit Regression — P1 Business Rules', () => {
  test('CartPage.parsePrice correctly parses standard INR currency format', () => {
    const parsed = CartPage.parsePrice('INR 71,883.00');
    expect(parsed).toBe(71883);
  });

  // ⚠️ UNVERIFIED — Live currency prefix format pending exact DOM text capture per v1.9.0 §3.
  test('CartPage.parsePrice behavior on currency prefix strings (UNVERIFIED — pending live evidence capture)', () => {
    test.info().annotations.push({
      type: 'unverified',
      description:
        'Pending live capture of exact currency prefix format per v1.9.0 §3; if live format contains a period (e.g. "Rs. 1,234.56"), regex will be hardened.',
    });

    const parsed = CartPage.parsePrice('INR 1,234.56');
    expect(parsed).toBe(1234.56);
  });
});
