# Test Traceability Matrix

This document maps user journeys, business requirements, and functional specifications to automated test specs across P0 (Critical Path), P1 (Business Rules), and P2 (Content & SEO).

**Regenerated for v2.0.1** from ground truth: every test title below matches the output of
`npx playwright test --list --project=chromium-desktop` (62 tests). Statuses are honest — a test
that skips at runtime is never marked "Passing".

### Status Legend
* `✅ Passing` — verified passing in live runs; no credential or discovery dependency.
* `⏭️ Skipped (needs credentials)` — implemented, but cleanly skips until a test account is provisioned in `.env` / CI secrets.
* `⏭️ Conditional skip (dynamic discovery)` — passes only when dynamic discovery finds a qualifying product (e.g., out-of-stock item); otherwise skips at runtime.
* `🔶 Passing but UNVERIFIED behavior` — automated and green, but the asserted behavior contradicts site copy or lacks manual confirmation (see annotations / discovery-log).
* `🔄 Strengthened in v2.0.1 — pending live re-run` — assertions were rewritten in the v2.0.1 Integrity Patch (tautologies removed); requires one live headed run to reconfirm green status.

---

## P0 — Critical Path (Revenue & Core User Journeys)

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Login form rendering | `tests/p0-critical-path/auth.spec.ts` | `login page renders with all form elements` | P0 | ✅ Passing |
| Invalid login handling | `tests/p0-critical-path/auth.spec.ts` | `login with invalid credentials shows error` | P0 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Valid customer login | `tests/p0-critical-path/auth.spec.ts` | `login with valid credentials succeeds` | P0 | ⏭️ Skipped (needs credentials) |
| Sign up tab rendering | `tests/p0-critical-path/auth.spec.ts` | `registration form renders after clicking Sign Up tab` | P0 | ✅ Passing |
| Checkout auth gate | `tests/p0-critical-path/auth.spec.ts` | `guest user is redirected to login when attempting checkout` | P0 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Cart line item verification | `tests/p0-critical-path/cart.spec.ts` | `cart page reflects correct item and quantity` | P0 | ✅ Passing |
| Cart subtotal display | `tests/p0-critical-path/cart.spec.ts` | `cart subtotal is displayed` | P0 | ✅ Passing |
| Quantity recalculation | `tests/p0-critical-path/cart.spec.ts` | `quantity update recalculates totals` | P0 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Cart item removal & empty | `tests/p0-critical-path/cart.spec.ts` | `remove item empties cart and shows empty-cart state` | P0 | ✅ Passing |
| Shipping address entry | `tests/p0-critical-path/checkout.spec.ts` | `enter serviceable shipping address and proceed` | P0 | ⏭️ Skipped (needs credentials) |
| Non-serviceable PIN check | `tests/p0-critical-path/checkout.spec.ts` | `non-serviceable PIN code shows deliverability error` | P0 | ⏭️ Skipped (needs credentials) |
| Carrier method pricing | `tests/p0-critical-path/checkout.spec.ts` | `Standard vs Express shipping shows different prices` | P0 | ⏭️ Skipped (needs credentials) |
| **Payment review & STOP** | `tests/p0-critical-path/checkout.spec.ts` | `reach payment step and verify order summary — STOP before submission` | P0 | ⏭️ Skipped (needs credentials) [Enforced — No Payment] |
| Homepage rendering | `tests/p0-critical-path/homepage.spec.ts` | `homepage loads successfully` | P0 | ✅ Passing |
| Header core elements | `tests/p0-critical-path/homepage.spec.ts` | `header renders with core elements` | P0 | ✅ Passing |
| Search bar interactive | `tests/p0-critical-path/homepage.spec.ts` | `search bar is visible and interactive` | P0 | ✅ Passing |
| Store switcher UI | `tests/p0-critical-path/homepage.spec.ts` | `store switcher is visible` | P0 | ✅ Passing |
| Mega-menu navigation | `tests/p0-critical-path/homepage.spec.ts` | `navigation mega-menu is present` | P0 | ✅ Passing |
| Footer links rendering | `tests/p0-critical-path/homepage.spec.ts` | `footer renders with links` | P0 | ✅ Passing |
| Header cart icon | `tests/p0-critical-path/homepage.spec.ts` | `cart icon is visible in header` | P0 | ✅ Passing |
| Category/PDP navigation | `tests/p0-critical-path/navigation.spec.ts` | `navigate Home → Category → PDP via product grid click` | P0 | ✅ Passing |
| Breadcrumb hierarchy | `tests/p0-critical-path/navigation.spec.ts` | `breadcrumb navigation works on category page` | P0 | ✅ Passing |
| PDP rendering | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `PDP renders with core product elements` | P0 | ✅ Passing |
| Add to cart & cart badge | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `add product to cart and verify cart badge updates` | P0 | ✅ Passing |
| Multi-quantity add to cart | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `add product with quantity > 1` | P0 | ✅ Passing |
| Quantity boundary handling | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `handle quantity boundary value 0 without crashing (§4 Task 11)` | P0 | ✅ Passing |
| Double-submit protection | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `rapid double-click on Add to Cart handles multiple submissions cleanly (§4 Task 11)` | P0 | ✅ Passing |
| Product search (popular) | `tests/p0-critical-path/search.spec.ts` | `search for "headphones" returns non-empty results — Common electronics product, should return many results` | P0 | ✅ Passing |
| Product search (broad) | `tests/p0-critical-path/search.spec.ts` | `search for "laptop" returns non-empty results — Popular search term with broad results` | P0 | ✅ Passing |
| Zero-result search | `tests/p0-critical-path/search.spec.ts` | `search for nonsense keyword "xyzqwerty123456nonsense" shows empty-state message` | P0 | ✅ Passing |
| Search input hardening | `tests/p0-critical-path/search.spec.ts` | `search for XSS/SQLi-shaped input safely handles input without executing attacks (§4 Task 11)` | P0 | ✅ Passing |

---

## P1 — Business Rules & Localization

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Autocomplete API contract | `tests/p1-business-rules/api-contracts.spec.ts` | `search autocomplete AJAX endpoint responds with valid HTTP status` | P1 | ✅ Passing |
| Order history accessibility | `tests/p1-business-rules/order-history.spec.ts` | `order history page is accessible from my account` | P1 | ⏭️ Skipped (needs credentials) |
| Order detail view | `tests/p1-business-rules/order-history.spec.ts` | `order detail view opens from order history` | P1 | ⏭️ Skipped (needs credentials) |
| Track order invalid ID | `tests/p1-business-rules/order-history.spec.ts` | `track order with invalid ID shows error` | P1 | ✅ Passing |
| Out of stock badging | `tests/p1-business-rules/out-of-stock.spec.ts` | `out-of-stock product shows OOS badge` | P1 | ⏭️ Conditional skip (dynamic discovery) |
| OOS cart prevention | `tests/p1-business-rules/out-of-stock.spec.ts` | `out-of-stock product has disabled add-to-cart button` | P1 | ⏭️ Conditional skip (dynamic discovery) |
| INR price parsing | `tests/p1-business-rules/price-parsing.spec.ts` | `CartPage.parsePrice correctly parses standard INR currency format` | P1 | ✅ Passing |
| Currency-prefix parsing | `tests/p1-business-rules/price-parsing.spec.ts` | `CartPage.parsePrice behavior on currency prefix strings (UNVERIFIED — pending live evidence capture)` | P1 | 🔶 Passing but UNVERIFIED behavior |
| Shipping scaling rule | `tests/p1-business-rules/shipping-calculation.spec.ts` | `shipping cost changes when basket quantity increases` | P1 | ⏭️ Skipped (needs credentials) |
| Malformed PIN handling | `tests/p1-business-rules/shipping-calculation.spec.ts` | `malformed PIN formats (e.g. "000000", "ABCDEF") on delivery check are handled gracefully without errors (§4 Task 11)` | P1 | ✅ Passing |
| Region dropdown audit | `tests/p1-business-rules/store-switcher-currency.spec.ts` | `header store switcher trigger displays interactive region dropdown options` | P1 | ✅ Passing |
| Store switch network state | `tests/p1-business-rules/store-switcher-network.spec.ts` | `network verification: store switch fires successful responses and mutates session cookies` | P1 | 🔄 Strengthened in v2.0.1 — pending live re-run (previous version asserted tautologies; fully rewritten) |
| Store switch cart modal | `tests/p1-business-rules/store-switcher.spec.ts` | `switching store with items in cart triggers confirm modal` | P1 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Store switch cart preservation | `tests/p1-business-rules/store-switcher.spec.ts` | `store switch currently appears to preserve cart items (UNVERIFIED — pending manual confirmation, see discovery-log.md)` | P1 | 🔶 Passing but UNVERIFIED behavior (contradicts site warning copy; pending manual confirmation) |
| Store switch cancel | `tests/p1-business-rules/store-switcher.spec.ts` | `cancelling store switch preserves the cart` | P1 | 🔄 Strengthened in v2.0.1 — pending live re-run |

---

## P2 — Content, SEO & Responsive Design

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Footer link integrity | `tests/p2-content-seo/footer-links.spec.ts` | `footer links on homepage do not return 404 or dead links` | P2 | ✅ Passing |
| Homepage performance budget | `tests/p2-content-seo/performance.spec.ts` | `homepage navigation timings respect performance budget` | P2 | ✅ Passing |
| PDP performance budget | `tests/p2-content-seo/performance.spec.ts` | `PDP navigation timings respect performance budget` | P2 | ✅ Passing |
| Responsive mobile header | `tests/p2-content-seo/responsive.spec.ts` | `homepage renders correctly on mobile viewport` | P2 | ✅ Passing |
| Responsive mobile PDP | `tests/p2-content-seo/responsive.spec.ts` | `PDP renders correctly and allows add-to-cart on mobile viewport` | P2 | ✅ Passing |
| Responsive mobile cart | `tests/p2-content-seo/responsive.spec.ts` | `cart page renders correctly on mobile viewport` | P2 | ✅ Passing |
| About Us content | `tests/p2-content-seo/static-pages.spec.ts` | `About Us page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Contact Us content | `tests/p2-content-seo/static-pages.spec.ts` | `Contact page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| FAQ content | `tests/p2-content-seo/static-pages.spec.ts` | `FAQ / Help Centre page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Terms & Conditions content | `tests/p2-content-seo/static-pages.spec.ts` | `Terms & Conditions page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Shipping Policy content | `tests/p2-content-seo/static-pages.spec.ts` | `Shipping Policy page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Warranty content | `tests/p2-content-seo/static-pages.spec.ts` | `Warranty (UCare) page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| ISO Compliance content | `tests/p2-content-seo/static-pages.spec.ts` | `ISO Compliance page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Download App content | `tests/p2-content-seo/static-pages.spec.ts` | `Download App page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Customer Reviews content | `tests/p2-content-seo/static-pages.spec.ts` | `Customer Reviews page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |
| Bulk Quotation content | `tests/p2-content-seo/static-pages.spec.ts` | `Bulk Quotation page loads and has content` | P2 | 🔄 Strengthened in v2.0.1 — pending live re-run |

---

**Totals:** 62 tests (31 P0 · 15 P1 · 16 P2) — 33 ✅ Passing · 8 ⏭️ needs credentials · 2 ⏭️ dynamic discovery · 2 🔶 UNVERIFIED behavior · 17 🔄 strengthened in v2.0.1 pending live re-run.
