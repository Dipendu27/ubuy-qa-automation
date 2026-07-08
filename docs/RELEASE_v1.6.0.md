# 🚀 Release v1.6.0 — Ubuy.co.in E2E Automation Framework (Self-Healing Inventory & Scope Hardening)

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v1.6.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v1.6.0` addresses all audit findings from **Ubuy QA Automation Prompt v1.6.0**, introducing dynamic self-healing out-of-stock discovery, formalizing manual verification documentation for cross-border cart preservation, and clarifying architectural scope decisions across documentation.

---

## 🛡️ Key Deliverables Executed (`v1.6.0`)

1. **Store-Switcher Cart Preservation Documentation (§1 P0)**
   - Synchronized `docs/discovery-log.md` and `tests/p1-business-rules/store-switcher.spec.ts` to explicitly document that cart preservation across regional store switches was manually verified via click-through by Dipendu Mukherjee (July 2026), superseding legacy modal copy warnings.

2. **Self-Healing Dynamic OOS Inventory Discovery (§2 P1)**
   - Extended `src/utils/productDiscovery.ts` with `findCurrentOosProduct(page)` helper to dynamically crawl live listings for Out-of-Stock SKUs at runtime.
   - Refactored `tests/p1-business-rules/out-of-stock.spec.ts` so tests no longer skip permanently on hardcoded placeholder URLs, enabling self-healing OOS verification.

3. **Formalized Scope Decision on API / AJAX Network Testing (§3.1 P2)**
   - Documented in `README.md` that light network-assertion coverage on UI-triggered AJAX calls (such as search autocomplete in `api-contracts.spec.ts`) is formally **in-scope**, passively inspecting HTTP status ($\ge 200$) and JSON schemas during genuine user interactions.

4. **Sourced Chromium Traffic Metric & Clarified WAF Resilience (§3.2 & §3.3 P2)**
   - Reframed the `~92%` Chromium traffic claim as an estimated industry e-commerce distribution metric.
   - Explicitly distinguished WAF automated retry-with-backoff (`nightly-smoke.yml`) as an active **mitigation** vs. self-hosted residential/corporate runners as the permanent **solution**.

---

## Complete Test Quality Audits (`v1.6.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
