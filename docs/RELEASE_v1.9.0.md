# 🚀 Release v1.9.0 — Ubuy.co.in E2E Automation Framework (Bug Hunt: Assertion Rigor & Network Precision)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.9.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v1.9.0` executes a dedicated deep-dive bug hunt across core utilities and test specifications, remediating three subtle logical defects identified in prompt `v1.9.0` that were invisible to TypeScript compilation and static linting.

---

## 🛡️ Key Deliverables Executed (`v1.9.0`)

1. **Eliminated Tautological Performance Budget Assertions (`tests/p2-content-seo/performance.spec.ts`) (§1)**
   - Fixed both Homepage and PDP Core Web Vitals tests to explicitly assert `expect(audit.passed).toBe(true)` with detailed warning messages.
   - Replaced tautological checks (`expect(audit.warnings.length).toBeDefined()`) that previously allowed performance budget breaches to pass silently.

2. **Fixed AJAX Network Interception Predicate & Assertion (`tests/p1-business-rules/api-contracts.spec.ts`) (§2)**
   - Grouped URL match conditions using logical `&&`: `(response.url().includes('/search') || response.url().includes('ajax')) && response.status() === 200`.
   - Prevented `waitForResponse` from prematurely intercepting arbitrary HTTP 200 static assets (images, fonts, stylesheets).
   - Replaced weak `expect(contract.status).toBeGreaterThanOrEqual(200)` with `expect(contract.valid).toBe(true)` to guarantee schema and error validation.

3. **Hardened Currency Parsing Documentation & Added Regression Suite (`CartPage.parsePrice` & `price-parsing.spec.ts`) (§3 & §7)**
   - Documented potential prefix-period fragility (`⚠️ UNVERIFIED — pending live evidence capture of exact raw price element text per v1.9.0 §3`).
   - Created comprehensive unit regression test suite `tests/p1-business-rules/price-parsing.spec.ts` verifying `CartPage.parsePrice` behavior.

4. **Synchronized Documentation (`README.md`)**
   - Upgraded `README.md` capabilities, test matrix (61 tests across 15 spec files), and directory tree to reflect Release `v1.9.0`.

---

## Complete Test Quality Audits (`v1.9.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
