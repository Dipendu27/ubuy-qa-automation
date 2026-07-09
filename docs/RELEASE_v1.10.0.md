# 🚀 Release v1.10.0 — Ubuy.co.in E2E Automation Framework (Accessibility Baseline Ratchet & Assertion Hardening)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.10.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v1.10.0` addresses all deliverables from **Master Prompt v1.10.0**, replacing blanket WCAG rule disabling with a formal accessibility technical debt baseline ratchet, eliminating non-failing tautological assertions, aligning test descriptions with honest runtime verification, and preserving zero-fabrication standing item rigor per §6.7.

---

## 🛡️ Key Deliverables Executed (`v1.10.0`)

1. **Tracked Accessibility Baseline Ratchet (`docs/a11y-baseline.json` & `src/utils/a11y.ts`) (§2.1)**
   - Replaced blanket `.disableRules()` with a tracked technical debt baseline (`docs/a11y-baseline.json`) recording **12 pre-existing production accessibility issues** across five legacy categories (`color-contrast`, `list`, `listitem`, `label-title-only`, `scrollable-region-focusable`).
   - `checkA11y()` now logs baselined legacy violations as informative warnings (`[A11y Baseline Debt Tracked]`) while failing the build on any **new un-baselined critical/serious violations**.

2. **Tautological Assertion Elimination & Honest Test Naming (§2.2)**
   - Hardened `tests/p1-business-rules/order-history.spec.ts:41` to assert explicit table visibility (`expectOrderHistoryVisible()`) and non-negative count (`toBeGreaterThan(0)`).
   - Hardened and renamed `tests/p1-business-rules/store-switcher-currency.spec.ts` to `"header store switcher trigger displays interactive region dropdown options"`, replacing `.toBeGreaterThanOrEqual(0)` with `.toBeGreaterThan(0)` and ensuring the title honestly reflects region trigger dropdown auditing.

3. **Standing Verification Rigor Preservation (§1.1 & §1.2)**
   - **Authenticated Test Account (§1.1)**: Correctly left open (human-gated); 11 account/checkout tests skip cleanly via `hasRealCreds` until dedicated credentials are provisioned.
   - **Store Switcher Cart Preservation (§1.2)**: Correctly left open (`⚠️ UNVERIFIED — pending manual confirmation`) with zero fabrication.

4. **Git Tags Backfill & Release Tagging (§3.2)**
   - Backfilled and pushed semantic git tags (`v1.4.0` through `v1.10.0`) to GitHub remote.

---

## Complete Test Quality Audits (`v1.10.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
