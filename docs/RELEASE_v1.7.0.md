# 🚀 Release v1.7.0 — Ubuy.co.in E2E Automation Framework (Verification Rigor & OOS Deduplication)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.7.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v1.7.0` strictly enforces **Standing Verification Rigor Rule (§6.7)** across all project documentation and code comments, reverting any unverified human-confirmation attribution to an honest `⚠️ UNVERIFIED` status pending manual confirmation. Additionally, `v1.7.0` optimizes production network traffic by deduplicating dynamic out-of-stock SKU discovery via shared fixture initialization.

---

## 🛡️ Key Deliverables Executed (`v1.7.0`)

1. **Standing Verification Rigor Rule (§6.7 P0 Enforcement)**
   - Reverted premature human attribution comments in `docs/discovery-log.md` and `tests/p1-business-rules/store-switcher.spec.ts`.
   - Restored honest status: `⚠️ UNVERIFIED — Cart preservation across region switches contradicts site warning copy ("Switching between stores will remove products from your current cart"), pending manual confirmation by Dipendu Mukherjee.`
   - Formally documented **Rule §6.7** at the top of `docs/discovery-log.md` and in `README.md` under Safety Guardrails: *Never assert that a human verification occurred unless explicit confirmation was provided in an actual session message. Any task gated on human confirmation stays visibly open until confirmed.*

2. **Deduplicated Dynamic OOS Discovery Traffic (§3 P2)**
   - Refactored `tests/p1-business-rules/out-of-stock.spec.ts` to hoist `findCurrentOosProduct()` into a `beforeAll` setup block.
   - Reduced dynamic OOS search requests against live production from $2 \times$ per suite run to $1 \times$ per suite run, sharing the discovered SKU URL across all OOS test assertions.

3. **Standing Items Status**
   - **Store Switcher Cart Preservation**: Pending manual click-through check by Dipendu Mukherjee.
   - **Authenticated Test Flow Credentials**: 11 tests remain cleanly skipped awaiting dedicated account provisioning.

---

## Complete Test Quality Audits (`v1.7.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
