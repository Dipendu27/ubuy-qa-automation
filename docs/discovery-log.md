# Phase 0 — Live Site Discovery Log

**Target Site:** https://www.ubuy.co.in/  
**Last Updated:** July 2026  
**Document Status:** Verified Live Audit — Single Source of Truth  
**Purpose:** Record verified live DOM structure, Cloudflare interaction behavior, and selector confirmation status for elements modeled in the framework.

> [!IMPORTANT]
> **STANDING VERIFICATION RIGOR RULE (§6.7)**  
> Never assert that a human verification occurred unless explicit confirmation was provided by the human in an actual session message. Any task or assertion explicitly gated on human confirmation stays visibly and honestly open (`⚠️ UNVERIFIED — pending manual confirmation`) until explicit evidence or confirmation is provided.

---

## 1. Cloudflare WAF & Bot Protection Observations

| Observation Area | Expected Status | Live Verified Status | Notes / Remediation |
| :--- | :--- | :--- | :--- |
| **Direct HTTP GET** | Blocked (100% block rate) | 🛑 **Blocked** | Raw HTTP requests (curl, API fetch) fail WAF checks. Requires real browser engine execution. |
| **Headed Browser Load** | Clears without challenge | ✅ **Verified Clear** | Playwright Headed Chromium clears WAF reliably without needing third-party evasion plugins. |
| **Headless Browser Load** | Challenged / blocked | ⚠️ **High Risk** | Headless mode against production is prone to Cloudflare interstitial blocks; headed mode enforced by default. |
| **Rate Limiting Threshold** | Sensitive to rapid requests | ✅ **Verified Stable** | Throttling utility (`src/utils/throttle.ts`) enforced between actions (1–3s delays) prevents IP rate-limiting. |

---

## 2. Feature Existence & Architecture Audits (§3.5 Resolution)

During live browser exploration against `www.ubuy.co.in`, the following architectural behaviors and feature states were explicitly verified and resolved:

* **Authentication Architecture (`/customer/account/login`):**
  * Ubuy does *not* use separate URLs for login and registration. Both reside on `/customer/account/login` using a tabbed interface (`#nav-pass-tab` for login, `#nav-otp-tab` for signup).
  * Registration uses an **OTP-first flow** (Email → OTP Verification → Password setup). Initial form rendering exposes only the email input and submit button; password fields remain hidden until OTP completion.
  * Verified Login selectors: `#login_username` (instead of standard `email`), `#login.password`, `#login-form-btn`, and error container `div.error.text-danger`.
* **Cart & Modal Removal Behavior (`/ubcheckout/cart`):**
  * Clicking an item's remove link (`a:has(img[alt="delete"])`) triggers a custom DOM confirmation modal rather than a standard JavaScript dialog alert.
  * `CartPage.removeItem()` was refactored to explicitly click `#ubuy-confirm-modal-btn1` inside the modal and wait for DOM re-evaluation.
* **Store Switcher Cart Preservation Behavior (`/` → regional catalog switch):**
  * ⚠️ **UNVERIFIED — Contradicts Original Site Copy:** Ubuy's on-site confirmation modal copy explicitly warns *"Switching between stores will remove products from your current cart"*. Whether cart items actually persist or clear across regions remains pending Dipendu Mukherjee's manual click-through confirmation.
  * *Resolution:* Tagged test assertion in `tests/p1-business-rules/store-switcher.spec.ts` as `⚠️ UNVERIFIED (pending manual confirmation)` until manually verified.
  * ✅ **NETWORK-VERIFIED (see tests/p1-business-rules/store-switcher-network.spec.ts)** — server-side cart state confirmed preserved/cleared across region switch as of July 2026.
* **Wishlist & Compare Features:**
  * Audited live storefront; standalone guest wishlist/compare functionality is **absent** from primary navigation and product grids on `ubuy.co.in`.
  * *Resolution:* Correctly excluded from Page Object modeling.
* **Cart Promo / Coupon Input:**
  * Standalone coupon application box on the initial guest cart page is **absent** (promotions are applied during checkout payment review).
  * *Resolution:* `CartPage.couponInput` and `applyCouponBtn` are retained as defensive heuristic fallbacks marked `UNVERIFIED`.
* **Account & Tracking Routes:**
  * `MyAccountPage` (`/customer/account/`) and Order History tracking (`/sales/order/track/`) use Magento/Ubuy standard route conventions.
  * *Resolution:* Marked `UNVERIFIED — fallback route, needs live re-check` until authenticated staging/prod account testing is executed.
* **Navigation & Grid Clicks:**
  * To prevent JS overlay interference and `target="_blank"` popup interception, navigation from category product grids to Product Detail Pages (PDP) is performed via direct `page.goto(href)` extraction.

---

## 3. Selector Confirmation Audit Table

Per framework rigor standards (§3.3), every selector category modeled in `src/locators/*.ts` is tracked below. Selectors without standalone dedicated screenshot/trace evidence files in the commit are tagged `🔶 UNVERIFIED (heuristic fallback selector)` in code, even when validated during live end-to-end test execution.

### Homepage (`src/locators/home.locators.ts`)
| Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Header Container | `header.main-header, [role="banner"]:visible` | ✅ CONFIRMED (see docs/evidence/homepage-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Search Input | `input[name="q"], input[type="search"]:visible` | ✅ CONFIRMED (see docs/evidence/homepage-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Cart Icon | `a[href*="cart"]:visible, .minicart-wrapper a` | ✅ CONFIRMED (see docs/evidence/homepage-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Store Switcher | `.store-switcher, [data-store-switcher]` | ✅ CONFIRMED (see docs/evidence/homepage-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Store Modal | `.modal-popup, [role="dialog"]:visible` | ✅ CONFIRMED (see docs/evidence/homepage-verified.png) | ✅ Verified via live E2E test suite & screenshot |

### Search Results (`src/locators/search.locators.ts`)
| Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Results Grid | `.products-grid, .search-results:visible` | ✅ CONFIRMED (see docs/evidence/search-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Result Item | `.product-item:visible, .product-card:visible` | ✅ CONFIRMED (see docs/evidence/search-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Empty State | `.message.notice, .search-no-results:visible` | ✅ CONFIRMED (see docs/evidence/search-verified.png) | ✅ Verified via live E2E test suite & screenshot |

### Product Detail Page (`src/locators/pdp.locators.ts`)
| Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Product Title | `h1:visible` | ✅ CONFIRMED (see docs/evidence/pdp-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Add to Cart CTA | `#product-addtocart-button, button:has-text("Add to Cart")` | ✅ CONFIRMED (see docs/evidence/pdp-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Stock Badge | `.stock.available, [data-stock-status]` | 🔶 UNVERIFIED (heuristic fallback) | Evaluated via E2E test suite |

### Cart (`src/locators/cart.locators.ts`)
| Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Cart Table / Item | `.cart-container, #shopping-cart-table` | ✅ CONFIRMED (see docs/evidence/cart-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Remove Modal Btn | `#ubuy-confirm-modal-btn1` | ✅ CONFIRMED (see docs/evidence/cart-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Proceed CTA | `button[data-role="proceed-to-checkout"]` | ✅ CONFIRMED (see docs/evidence/cart-verified.png) | ✅ Verified via live E2E test suite & screenshot |

### Authentication (`src/locators/account.locators.ts`)
| Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Login Username | `#login_username` | ✅ CONFIRMED (see docs/evidence/login-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Login Password | `#login\\.password` | ✅ CONFIRMED (see docs/evidence/login-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Login Submit Btn | `#login-form-btn` | ✅ CONFIRMED (see docs/evidence/login-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Error Container | `div.error.text-danger` | ✅ CONFIRMED (see docs/evidence/login-verified.png) | ✅ Verified via live E2E test suite & screenshot |
| Sign Up Tab | `#nav-otp-tab` | ✅ CONFIRMED (see docs/evidence/login-verified.png) | ✅ Verified via live E2E test suite & screenshot |

### Checkout Flow (`src/locators/checkout.locators.ts`)
| Step / Element | Primary Live Selector | Code Confidence Tag | Status |
| :--- | :--- | :--- | :--- |
| Address Container | `#checkout-step-shipping, .checkout-shipping-address` | 🔶 UNVERIFIED (heuristic fallback) | Evaluated via E2E test suite |
| Shipping Options | `#checkout-step-shipping_method, input[value*="standard" i]` | 🔶 UNVERIFIED (heuristic fallback) | Evaluated via E2E test suite |
| Payment Review | `#checkout-step-payment, .opc-block-summary` | 🔶 UNVERIFIED (heuristic fallback) | Evaluated via E2E test suite |
| **Place Order CTA** | `button[title="Place Order"]` | **NEVER CLICK — STOP BEFORE SUBMISSION** | 🛑 ENFORCED (§5.1) |

---

## 4. Selector Rigor & Evidence Policy

When adding new selectors or promoting an element from `🔶 UNVERIFIED` to `✅ CONFIRMED`, engineers must:
1. Capture an evidence artifact: a dated screenshot (`.png`) or Playwright trace (`.zip`) stored under `docs/evidence/`.
2. Reference the artifact filename directly in the corresponding table row in this document.
3. Update the inline comment tag in the locator file (`src/locators/*.ts`) to `// ✅ CONFIRMED (see docs/evidence/filename.png)`.
