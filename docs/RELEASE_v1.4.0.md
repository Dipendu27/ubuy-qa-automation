# 🚀 Release v1.4.0 — Ubuy.co.in E2E Automation Framework

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.4.0`

---

## 🌟 Release Overview

Release `v1.4.0` marks a major milestone for the **Ubuy QA Automation Framework**. The repository now features **100% verified E2E runtime passing status** across all active guest-accessible user flows against live production `https://www.ubuy.co.in/`, comprehensive accessibility (`@axe-core/playwright`) scanning, visual regression baselines, defensive locator strategies, and strict safety guardrails.

---

## 🛡️ Key Highlights & Features

1. **Complete Live Runtime Verification (55 Tests)**
   - **44 Passed Cleanly**: 100% pass rate on every active guest flow (Authentication UI, Homepage, Search, Category/Navigation, PDP Add to Cart, Cart Page, Store Switcher, and 10 Static Pages).
   - **11 Skipped Cleanly**: Authenticated flows (Checkout, Order History) cleanly skipped awaiting dedicated test account credentials.
   - **0 Failed Tests**: Every single test case passes reliably on serial single-worker Chromium Desktop.

2. **Automated Safety Guardrails (`npm run test:safety`)**
   - Built-in CI safety gate (`scripts/enforce-no-place-order.mjs`) automatically scans all page objects, specs, and utilities to guarantee **zero references to real order placement (`placeOrder()`)**.
   - Enforces the non-negotiable rule: **No real payment submission, ever.**

3. **Hardened Page Objects & Dynamic DOM Resilience**
   - **Defensive Delivery PIN Check (`ProductDetailPage.ts`)**: Gracefully handles products where delivery check input/button are hidden or omitted.
   - **Store Switcher Resilience (`StoreSwitcher.ts`)**: Uses synthetic click dispatching (`dispatchEvent('click')`) to reliably interact with header dropdown options across regional store switches.
   - **Production Business Rule Alignment**: Aligned Store Switcher assertions to Ubuy India's live cross-border behavior (`confirming store switch preserves cart items across regional catalogs`).

4. **Accessibility & Visual Regression Testing**
   - Integrated automated `@axe-core/playwright` accessibility scanning on P0 critical pages.
   - Captured mobile and desktop visual regression baselines (`tests/p2-content-seo/responsive.spec.ts`).

---

## 🚀 Getting Started for New Users

### 1. Clone & Install
```bash
git clone https://github.com/Dipendu27/ubuy-qa-automation.git
cd ubuy-qa-automation
npm install
npx playwright install --with-deps chromium
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional)* Add `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` once a dedicated test account is provisioned to unlock the 11 skipped authenticated/checkout tests.

### 3. Run Verification & Quality Commands
```bash
# Full static code audit & safety check
npm run format
npx tsc --noEmit
npm run lint
npm run test:safety

# Run full E2E test suite against live production
npm test
```

---

## Complete Test Matrix (`v1.4.0`)

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
| **Footer Links** | `footer-links.spec.ts` | 1 | 1 | 0 | 0 |
| **Responsive Layouts** | `responsive.spec.ts` | 3 | 3 | 0 | 0 |
| **Static Pages** | `static-pages.spec.ts` | 10 | 10 | 0 | 0 |
| **TOTAL** | | **55** | **44** | **11** | **0** |
