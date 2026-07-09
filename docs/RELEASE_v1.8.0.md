# 🚀 Release v1.8.0 — Ubuy.co.in E2E Automation Framework (Honest Test Alignment & Annotation Hardening)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.8.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v1.8.0` resolves the final follow-on gap from our standing verification rigor audit (**Prompt v1.8.0 §1 P1**). While `v1.7.0` corrected documentation and code comments to honestly reflect open unverified states, `v1.8.0` ensures test **names** and runtime report **annotations** reflect those same unverified states so HTML test reports remain 100% transparent and never imply confirmed certainty.

---

## 🛡️ Key Deliverables Executed (`v1.8.0`)

1. **Honest Test Name Alignment (`tests/p1-business-rules/store-switcher.spec.ts`) (§1 P1)**
   - Renamed test from `confirming store switch preserves cart items across regions (production behavior)` to:
     `store switch currently appears to preserve cart items (UNVERIFIED — pending manual confirmation, see discovery-log.md)`
   - Added runtime Playwright report annotation (`test.info().annotations.push`) so test runners and HTML reports visually flag this observation as `unverified` alongside its description.

2. **Repo-Wide Verification Sweep (§1 P1)**
   - Audited every test file across `tests/` to guarantee zero contradictions between unverified status comments and test titles.

3. **Standing Items Status**
   - **Store Switcher Cart Preservation**: Pending manual click-through check by Dipendu Mukherjee.
   - **Authenticated Test Flow Credentials**: 11 tests remain cleanly skipped awaiting dedicated account provisioning.

---

## Complete Test Quality Audits (`v1.8.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
