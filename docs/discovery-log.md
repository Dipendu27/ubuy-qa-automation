# Phase 0 — Live Site Discovery Log

**Target Site:** https://www.ubuy.co.in/  
**Document Status:** Placeholder / Initial Audit Template  
**Purpose:** Record live DOM structure, verify Cloudflare interaction behavior, and confirm exact CSS/DOM selectors for all elements modeled in the framework.

---

## 1. Cloudflare WAF & Bot Protection Observations

| Observation Area | Expected Status (from Recon) | Live Verified Status | Notes / Remediation |
| :--- | :--- | :--- | :--- |
| **Direct HTTP GET** | Blocked (100% block rate) | *Pending Phase 0* | Requires real browser engine |
| **Headed Browser Load** | Clears without challenge / low interstitial | *Pending Phase 0* | Playwright Headed Chromium |
| **Headless Browser Load** | Likely challenged / blocked | *Pending Phase 0* | Avoid headless against prod |
| **Rate Limiting Threshold** | Sensitive to rapid requests | *Pending Phase 0* | Throttling utility enforced (1-3s delays) |

---

## 2. Robots.txt & Sitemap Audit

* **robots.txt URL:** `https://www.ubuy.co.in/robots.txt`
* **Sitemap URL:** `https://www.ubuy.co.in/sitemap.xml` / `/html-sitemap/ubuybrands/a`
* **Findings:** *Pending live browser check.* Ensure no automation scripts hit disallowed admin or system paths.

---

## 3. Selector Confirmation Audit Table

Every locator in `src/locators/*.ts` must be audited against the live site and marked as confirmed below.

### Homepage (`src/locators/home.locators.ts`)
| Element | Proposed Placeholder Selector | Confirmed Live Selector | Status |
| :--- | :--- | :--- | :--- |
| Header Container | `header, [role="banner"]` | | ⚠️ UNCONFIRMED |
| Search Input | `input[name="q"], input[type="search"]` | | ⚠️ UNCONFIRMED |
| Cart Icon | `a[href*="cart"], .minicart-wrapper a` | | ⚠️ UNCONFIRMED |
| Store Switcher Trigger | `[data-store-switcher], .store-switcher`| | ⚠️ UNCONFIRMED |
| Store Confirm Modal | `.modal-popup, [role="dialog"]` | | ⚠️ UNCONFIRMED |

### Search Results (`src/locators/search.locators.ts`)
| Element | Proposed Placeholder Selector | Confirmed Live Selector | Status |
| :--- | :--- | :--- | :--- |
| Results Container | `.search-results, .products-grid` | | ⚠️ UNCONFIRMED |
| Result Item | `.product-item, .product-card` | | ⚠️ UNCONFIRMED |
| Empty State Message | `.message.notice, .search-no-results` | | ⚠️ UNCONFIRMED |

### PDP (`src/locators/pdp.locators.ts`)
| Element | Proposed Placeholder Selector | Confirmed Live Selector | Status |
| :--- | :--- | :--- | :--- |
| Product Title | `h1.page-title, h1[itemprop="name"]` | | ⚠️ UNCONFIRMED |
| Add to Cart CTA | `#product-addtocart-button` | | ⚠️ UNCONFIRMED |
| Stock Badge | `.stock.available, [data-stock-status]`| | ⚠️ UNCONFIRMED |

### Cart (`src/locators/cart.locators.ts`)
| Element | Proposed Placeholder Selector | Confirmed Live Selector | Status |
| :--- | :--- | :--- | :--- |
| Cart Container | `.cart-container, #shopping-cart-table` | | ⚠️ UNCONFIRMED |
| Line Item Qty | `input[name*="qty"], input.qty` | | ⚠️ UNCONFIRMED |
| Proceed CTA | `button[data-role="proceed-to-checkout"]`| | ⚠️ UNCONFIRMED |

### Checkout Flow (`src/locators/checkout.locators.ts`)
| Step / Element | Proposed Placeholder Selector | Confirmed Live Selector | Status |
| :--- | :--- | :--- | :--- |
| Address Step Container | `#checkout-step-shipping` | | ⚠️ UNCONFIRMED |
| Shipping Step Container| `#checkout-step-shipping_method` | | ⚠️ UNCONFIRMED |
| Payment Step Container | `#checkout-step-payment` | | ⚠️ UNCONFIRMED |
| **Place Order CTA** | `button[title="Place Order"]` | **NEVER CLICK — STOP BEFORE SUBMISSION** | 🛑 ENFORCED |

---

## 4. Next Steps for Phase 0 Execution

1. Run the headed browser exploration session:
   ```bash
   npx playwright test --headed
   ```
2. Inspect live DOM elements using Playwright Inspector or Chrome DevTools.
3. Replace placeholder selectors in `src/locators/*.ts` with live verified selectors.
4. Update this document with confirmed findings and change status tags to `✅ CONFIRMED`.
