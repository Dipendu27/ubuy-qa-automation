# 🚀 Release v2.0.0 — Ubuy.co.in Autonomous Coverage & Network-Level Verification

**Release Date:** July 2026  
**Repository:** [https://github.com/Dipendu27/ubuy-qa-automation](https://github.com/Dipendu27/ubuy-qa-automation)  
**Branch:** `main`  
**Tag:** `v2.0.0`  
**Owner:** Dipendu Mukherjee

---

## 🌟 Release Overview

Release `v2.0.0` represents a major architectural milestone ("Autonomous Coverage"), introducing self-provisioning ephemeral test identity discovery, network-level server state auditing for the store switcher, complete Docker containerization, and strict adherence to Standing Verification Rigor Rule (§6.7).

---

## 🛡️ Key Deliverables Executed (`v2.0.0`)

1. **Autonomous Ephemeral Identity Provisioning (`src/utils/identityProvisioning.ts`) (§1)**
   - Pre-authorized by Master Prompt v2.0.0 §0.1 to generate unmistakable test identities tagged `ubuy.qa.bot+{iso-timestamp}@qa.ubuy.co.in`.
   - Discovers live whether registration/login requires email OTP verification or CAPTCHA challenges.
   - Honors §0.1 safety rails: never bypasses CAPTCHA controls and stops cleanly with honest audit log trace if email verification OTP is required and no automated mailbox API key is configured.

2. **Network-Level Store Switcher Verification (`tests/p1-business-rules/store-switcher-network.spec.ts`) (§2)**
   - Added network-level verification alongside UI observation (`store-switcher.spec.ts`) to audit server-side session state across regional store boundaries.
   - Updated `docs/discovery-log.md` with `✅ NETWORK-VERIFIED (see tests/p1-business-rules/store-switcher-network.spec.ts)` while preserving the existing UI test's honest unverified annotation.

3. **Ground-Truth Traceability Matrix Alignment (`docs/traceability.md`) (§3)**
   - Updated ground-truth traceability matrix to reflect real observed execution status for all P0/P1 specs, including live discovery notes on OTP authentication requirements.

4. **Docker Containerization (`Dockerfile` & `.dockerignore`) (§4.1)**
   - Added official Playwright Ubuntu Jammy container image (`Dockerfile`) ensuring identical local, CI, and self-hosted execution environments.

---

## Complete Test Quality Audits (`v2.0.0`)

- **Safety Guardrails (`npm run test:safety`)**: **0 references to real order placement (`placeOrder()`)**.
- **Type Checking (`npx tsc --noEmit`)**: **0 errors**.
- **Linting (`npm run lint`)**: **0 errors, 0 warnings**.
- **Formatting (`npm run format:check`)**: **100% compliant**.
