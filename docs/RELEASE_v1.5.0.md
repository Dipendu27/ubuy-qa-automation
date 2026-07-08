# 🚀 Release v1.5.0 — Ubuy.co.in E2E Automation Framework (Architectural Enhancements)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.5.0`

---

## 🌟 Release Overview

Release `v1.5.0` builds on top of `v1.4.0` by introducing **Core Web Vitals performance budgeting**, **network-layer API contract validation**, **dynamic inventory discovery**, and **cross-border store switcher currency verification** across our 59-test E2E automation suite.

---

## 🛡️ Key Architectural Additions (`v1.5.0`)

1. **Automated Core Web Vitals & Navigation Timings (`src/utils/performance.ts`)**
   - Collects browser navigation and paint timings (`TTFB`, `DOM Content Loaded`, `Load Event`, `First Contentful Paint`) via runtime evaluation.
   - Enforces performance budgets across P0 critical pages (`Homepage`, `PDP`) in `tests/p2-content-seo/performance.spec.ts`.

2. **Network Interception & API Contract Schema Checking (`src/utils/apiSchema.ts`)**
   - Inspects intercepted AJAX API responses (`/search/`) to assert non-breaking status codes, valid Content-Type headers, and JSON structure in `tests/p1-business-rules/api-contracts.spec.ts`.

3. **Dynamic Product & SKU Discovery (`src/utils/productDiscovery.ts`)**
   - Normalizes and extracts live in-stock product links dynamically from listings to protect E2E flows against catalog SKU obsolescence.

4. **Multi-Currency Store Switcher Auditing (`tests/p1-business-rules/store-switcher-currency.spec.ts`)**
   - Verifies header store switcher trigger visibility and dropdown menu options across cross-border regional catalogs.

5. **Safety Guardrails Guarantee (`scripts/enforce-no-place-order.mjs`)**
   - 100% compliant with our non-negotiable safety gate: **Zero references to real order submission (`placeOrder()`)**.

---

## Complete Test Matrix (`v1.5.0`)

| Suite | File | Active Tests | Passed | Skipped | Failed |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Authentication** | `auth.spec.ts` | 5 | 4 | 1 | 0 |
| **Cart** | `cart.spec.ts` | 4 | 4 | 0 | 0 |
| **Checkout** | `checkout.spec.ts` | 4 | 0 | 4 | 0 |
| **Homepage** | `homepage.spec.ts` | 7 | 7 | 0 | 0 |
| **Navigation** | `navigation.spec.ts` | 2 | 2 | 0 | 0 |
| **PDP Add to Cart** | `pdp-add-to-cart.spec.ts` | 5 | 5 | 0 | 0 |
| **Search** | `search.spec.ts` | 4 | 4 | 0 | 0 |
| **Order History** | `order-history.spec.ts` | 3 | 0 | 3 | 0 |
| **Out of Stock** | `out-of-stock.spec.ts` | 2 | 0 | 2 | 0 |
| **Shipping Calculation** | `shipping-calculation.spec.ts` | 2 | 1 | 1 | 0 |
| **Store Switcher** | `store-switcher.spec.ts` | 3 | 3 | 0 | 0 |
| **Store Switcher Currency *(v1.5.0)*** | `store-switcher-currency.spec.ts` | 1 | 1 | 0 | 0 |
| **API Schema Contracts *(v1.5.0)*** | `api-contracts.spec.ts` | 1 | 1 | 0 | 0 |
| **Footer Links** | `footer-links.spec.ts` | 1 | 1 | 0 | 0 |
| **Performance Vitals *(v1.5.0)*** | `performance.spec.ts` | 2 | 2 | 0 | 0 |
| **Responsive Layouts** | `responsive.spec.ts` | 3 | 3 | 0 | 0 |
| **Static Pages** | `static-pages.spec.ts` | 10 | 10 | 0 | 0 |
| **TOTAL** | | **59** | **48** | **11** | **0** |
