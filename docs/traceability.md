# Test Traceability Matrix

This document maps user journeys, business requirements, and functional specifications to automated test specs across P0 (Critical Path), P1 (Business Rules), and P2 (Content & SEO).
This document is generated directly from ground-truth codebase test names (`test()`) and their real execution status against live production.

### Status Legend
* `✅ Automated & Passing`: Verified passing in live test executions without requiring authenticated credentials.
* `🔶 Automated — Blocked (needs test account)`: Fully implemented and automated in code, but cleanly skipped at runtime via credential safety guardrails (`hasRealCreds`) until a dedicated test account is provisioned in `.env` / CI secrets.
* `⚠️ Automated — Assertion Weak / Needs Review`: Automated but requires stronger assertion logic before considered fully verified.

---

## P0 — Critical Path (Revenue & Core User Journeys)

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Homepage rendering | `tests/p0-critical-path/homepage.spec.ts` | `homepage loads successfully` | P0 | ✅ Automated & Passing |
| Header core elements | `tests/p0-critical-path/homepage.spec.ts` | `header renders with core elements` | P0 | ✅ Automated & Passing |
| Search bar interactive | `tests/p0-critical-path/homepage.spec.ts` | `search bar is visible and interactive` | P0 | ✅ Automated & Passing |
| Store switcher UI | `tests/p0-critical-path/homepage.spec.ts` | `store switcher is visible` | P0 | ✅ Automated & Passing |
| Mega-menu navigation | `tests/p0-critical-path/homepage.spec.ts` | `navigation mega-menu is present` | P0 | ✅ Automated & Passing |
| Footer links rendering | `tests/p0-critical-path/homepage.spec.ts` | `footer renders with links` | P0 | ✅ Automated & Passing |
| Header cart icon | `tests/p0-critical-path/homepage.spec.ts` | `cart icon is visible in header` | P0 | ✅ Automated & Passing |
| Product search (popular) | `tests/p0-critical-path/search.spec.ts` | `search for "headphones" returns non-empty results — Common electronics product, should return many results` | P0 | ✅ Automated & Passing |
| Product search (broad) | `tests/p0-critical-path/search.spec.ts` | `search for "laptop" returns non-empty results — Popular search term with broad results` | P0 | ✅ Automated & Passing |
| Zero-result search | `tests/p0-critical-path/search.spec.ts` | `search for nonsense keyword "xyzqwerty123456nonsense" shows empty-state message` | P0 | ✅ Automated & Passing |
| Category/PDP navigation | `tests/p0-critical-path/navigation.spec.ts` | `navigate Home → Category → PDP via product grid click` | P0 | ✅ Automated & Passing |
| Breadcrumb hierarchy | `tests/p0-critical-path/navigation.spec.ts` | `breadcrumb navigation works on category page` | P0 | ✅ Automated & Passing |
| PDP rendering | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `PDP renders with core product elements` | P0 | ✅ Automated & Passing |
| Add to cart & cart badge | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `add product to cart and verify cart badge updates` | P0 | ✅ Automated & Passing |
| Multi-quantity add to cart | `tests/p0-critical-path/pdp-add-to-cart.spec.ts` | `add product with quantity > 1` | P0 | ✅ Automated & Passing |
| Cart line item verification | `tests/p0-critical-path/cart.spec.ts` | `cart page reflects correct item and quantity` | P0 | ✅ Automated & Passing |
| Cart subtotal display | `tests/p0-critical-path/cart.spec.ts` | `cart subtotal is displayed` | P0 | ✅ Automated & Passing |
| Quantity recalculation | `tests/p0-critical-path/cart.spec.ts` | `quantity update recalculates totals` | P0 | ✅ Automated & Passing |
| Cart item removal & empty | `tests/p0-critical-path/cart.spec.ts` | `remove item empties cart and shows empty-cart state` | P0 | ✅ Automated & Passing |
| Login form rendering | `tests/p0-critical-path/auth.spec.ts` | `login page renders with all form elements` | P0 | ✅ Automated & Passing |
| Invalid login handling | `tests/p0-critical-path/auth.spec.ts` | `login with invalid credentials shows error` | P0 | ✅ Automated & Passing |
| Valid customer login | `tests/p0-critical-path/auth.spec.ts` | `login with valid credentials succeeds` | P0 | 🔶 Automated — Blocked (needs test account) |
| Sign up tab rendering | `tests/p0-critical-path/auth.spec.ts` | `registration form renders after clicking Sign Up tab` | P0 | ✅ Automated & Passing |
| Checkout auth gate | `tests/p0-critical-path/auth.spec.ts` | `guest user is redirected to login when attempting checkout` | P0 | ✅ Automated & Passing |
| Shipping address entry | `tests/p0-critical-path/checkout.spec.ts` | `enter serviceable shipping address and proceed` | P0 | 🔶 Automated — Blocked (needs test account) |
| Non-serviceable PIN check | `tests/p0-critical-path/checkout.spec.ts` | `non-serviceable PIN code shows deliverability error` | P0 | 🔶 Automated — Blocked (needs test account) |
| Carrier method pricing | `tests/p0-critical-path/checkout.spec.ts` | `Standard vs Express shipping shows different prices` | P0 | 🔶 Automated — Blocked (needs test account) |
| **Payment review & STOP** | `tests/p0-critical-path/checkout.spec.ts` | `reach payment step and verify order summary — STOP before submission` | P0 | 🔶 Automated — Blocked (needs test account) [Enforced — No Payment] |

---

## P1 — Business Rules & Localization

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Out of stock badging | `tests/p1-business-rules/out-of-stock.spec.ts` | `out-of-stock product shows OOS badge` | P1 | ✅ Automated & Passing |
| OOS cart prevention | `tests/p1-business-rules/out-of-stock.spec.ts` | `out-of-stock product has disabled add-to-cart button` | P1 | ✅ Automated & Passing |
| Shipping scaling rule | `tests/p1-business-rules/shipping-calculation.spec.ts` | `shipping cost changes when basket quantity increases` | P1 | 🔶 Automated — Blocked (needs test account) |
| Store switch cart modal | `tests/p1-business-rules/store-switcher.spec.ts` | `switching store with items in cart triggers confirm modal` | P1 | ✅ Automated & Passing |
| Store switch confirm clear | `tests/p1-business-rules/store-switcher.spec.ts` | `confirming store switch clears the cart` | P1 | ✅ Automated & Passing |
| Store switch cancel | `tests/p1-business-rules/store-switcher.spec.ts` | `cancelling store switch preserves the cart` | P1 | ✅ Automated & Passing |
| Store switch network state | `tests/p1-business-rules/store-switcher-network.spec.ts` | `network verification: server-side cart session reset across regional store switch` | P1 | ✅ Automated & Passing (Network-Verified) |
| Order history accessibility| `tests/p1-business-rules/order-history.spec.ts` | `order history page is accessible from my account` | P1 | 🔶 Automated — Blocked (needs test account) |
| Order detail view | `tests/p1-business-rules/order-history.spec.ts` | `order detail view opens from order history` | P1 | 🔶 Automated — Blocked (needs test account) |
| Track order invalid ID | `tests/p1-business-rules/order-history.spec.ts` | `track order with invalid ID shows error` | P1 | ✅ Automated & Passing |

---

## P2 — Content, SEO & Responsive Design

| Requirement / User Story | Test File | Test Case Name | Priority | Automation Status |
| :--- | :--- | :--- | :---: | :--- |
| Footer link integrity | `tests/p2-content-seo/footer-links.spec.ts` | `footer links on homepage do not return 404 or dead links` | P2 | ✅ Automated & Passing |
| Responsive mobile header | `tests/p2-content-seo/responsive.spec.ts` | `homepage renders correctly on mobile viewport` | P2 | ✅ Automated & Passing |
| Responsive mobile PDP | `tests/p2-content-seo/responsive.spec.ts` | `PDP renders correctly and allows add-to-cart on mobile viewport` | P2 | ✅ Automated & Passing |
| Responsive mobile cart | `tests/p2-content-seo/responsive.spec.ts` | `cart page renders correctly on mobile viewport` | P2 | ✅ Automated & Passing |
| About Us content | `tests/p2-content-seo/static-pages.spec.ts` | `About Us page loads and has content` | P2 | ✅ Automated & Passing |
| Contact Us content | `tests/p2-content-seo/static-pages.spec.ts` | `Contact page loads and has content` | P2 | ✅ Automated & Passing |
| FAQ content | `tests/p2-content-seo/static-pages.spec.ts` | `FAQ / Help Centre page loads and has content` | P2 | ✅ Automated & Passing |
| Terms & Conditions content | `tests/p2-content-seo/static-pages.spec.ts` | `Terms & Conditions page loads and has content` | P2 | ✅ Automated & Passing |
| Shipping Policy content | `tests/p2-content-seo/static-pages.spec.ts` | `Shipping Policy page loads and has content` | P2 | ✅ Automated & Passing |
| Warranty content | `tests/p2-content-seo/static-pages.spec.ts` | `Warranty (UCare) page loads and has content` | P2 | ✅ Automated & Passing |
| ISO Compliance content | `tests/p2-content-seo/static-pages.spec.ts` | `ISO Compliance page loads and has content` | P2 | ✅ Automated & Passing |
| Download App content | `tests/p2-content-seo/static-pages.spec.ts` | `Download App page loads and has content` | P2 | ✅ Automated & Passing |
| Customer Reviews content | `tests/p2-content-seo/static-pages.spec.ts` | `Customer Reviews page loads and has content` | P2 | ✅ Automated & Passing |
| Bulk Quotation content | `tests/p2-content-seo/static-pages.spec.ts` | `Bulk Quotation page loads and has content` | P2 | ✅ Automated & Passing |
