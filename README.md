# 🛡️ Ubuy.co.in — Enterprise End-to-End QA Automation Framework

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-v1.52%2B-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Version](https://img.shields.io/badge/Release-v2.0.0-007ACC?style=for-the-badge)
![Safety Gate](https://img.shields.io/badge/Safety_Gate-Zero_Payment_Guaranteed-FF4B4B?style=for-the-badge)
![Test Status](https://img.shields.io/badge/Tests-51%20Passed%20%7C%2011%20Skipped%20%7C%200%20Failed-238636?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

</div>

---

A production-grade, highly resilient end-to-end UI and API test automation framework engineered specifically for **Ubuy India (`https://www.ubuy.co.in/`)**. Built with **Playwright** and strict **TypeScript**, this framework showcases enterprise-class SDET architectural patterns: strict Page Object Model (POM) separation, lazy fixture injection, network-layer API contract validation, real-time Core Web Vitals performance budgeting, dynamic inventory discovery, and non-negotiable financial safety guardrails.

---

## 📑 Table of Contents

1. [🛑 Financial & Infrastructure Safety Guardrails](#-financial--infrastructure-safety-guardrails)
2. [🌟 Release v2.0.0 Key Capabilities & Architectural Pillars](#-release-v200-key-capabilities--architectural-pillars)
3. [📊 Comprehensive Test Matrix & Live Runtime Status](#-comprehensive-test-matrix--live-runtime-status)
4. [🏗️ Architectural Overview & Directory Structure](#-architectural-overview--directory-structure)
5. [🚀 Getting Started & Environment Configuration](#-getting-started--environment-configuration)
6. [🧪 Test Execution & Quality Command Reference](#-test-execution--quality-command-reference)
7. [⚡ Core Web Vitals & API Contract Verification](#-core-web-vitals--api-contract-verification)
8. [🌐 Cloudflare WAF Resilience & Cross-Browser Rationale](#-cloudflare-waf-resilience--cross-browser-rationale)
9. [📋 License & Contributing](#-license--contributing)

---

## 🛑 Financial & Infrastructure Safety Guardrails

> [!CAUTION]
> **NON-NEGOTIABLE ZERO-PAYMENT PRODUCTION SAFETY**  
> Because this framework runs against live e-commerce production servers (`ubuy.co.in`), multiple hardcoded safety gates prevent any accidental financial transactions or server disruption:
>
> 1. **🚫 Built-In CI Safety Gate (`npm run test:safety`):** Before tests run, `scripts/enforce-no-place-order.mjs` recursively scans **the entire `src/` tree** (pages, components, locators, fixtures, utils, config) **and `tests/`** — covering `.ts`, `.tsx`, `.js`, and `.mjs` files — to guarantee **zero references to real order submission (`placeOrder()`)**. No order-placement selector exists anywhere in the codebase, by design (v2.0.1: previously only `src/pages/`, `src/components/`, and `tests/` were scanned, leaving `src/locators/` unchecked).
> 2. **🛑 Hard Stop Before Payment Submission:** Checkout workflows inspect shipping and payment step summaries but intentionally halt before order placement.
> 3. **🧵 Rate-Limited Serial Execution (`workers: 1`):** Configured in `playwright.config.ts` to execute sequentially, protecting production infrastructure from concurrency spikes.
> 4. **⏱️ Built-In Human Cadence Throttling (`throttle()`):** Automatically injects realistic think-time delays (`src/utils/throttle.ts`) to prevent aggressive request bursts.
> 5. **🔐 Strict Environment Secrets Separation:** Sensitive credentials are read strictly from `.env` or CI environment variables.
> 6. **📋 Standing Verification Rigor Rule (§6.7):** Never assert that a human verification occurred unless explicit confirmation was provided in an actual session message. Any task gated on human confirmation stays visibly open (`⚠️ UNVERIFIED — pending manual confirmation`) until explicit evidence or confirmation is provided.

---

## 🌟 Release v2.0.0 Key Capabilities & Architectural Pillars

Release `v2.0.0` represents a major architectural upgrade ("Autonomous Coverage"), introducing ephemeral identity provisioning, network-level server state verification, and complete Docker containerization across our 62-test suite:

- **🤖 Autonomous Ephemeral Identity Provisioning (`v2.0.0`)**: Added `src/utils/identityProvisioning.ts` to autonomously provision test identities (`ubuy.qa.bot+{timestamp}@qa.ubuy.co.in`) with live OTP verification discovery and CAPTCHA safety handling (§0.1).
- **📡 Network-Level Store Switcher Verification (`v2.0.0`)**: Added `tests/p1-business-rules/store-switcher-network.spec.ts` alongside UI observation to inspect server-side session state across regional store boundaries (`✅ NETWORK-VERIFIED`).
- **🐳 Production Docker Containerization (`v2.0.0`)**: Added `Dockerfile` based on official Playwright Ubuntu Jammy container (`mcr.microsoft.com/playwright:v1.52.0-jammy`) for strict environment parity across local, CI, and self-hosted runners.
- **♿ Tracked Accessibility Baseline Ratchet (`v1.10.0`)**: Replaced blanket `.disableRules()` in `src/utils/a11y.ts` with a committed technical debt baseline (`docs/a11y-baseline.json`) tracking 12 legacy production issues (`color-contrast`, `list`, `listitem`, `label-title-only`, `scrollable-region-focusable`). Known legacy debt is logged informative while any new un-baselined critical/serious violations fail CI.
- **🔍 Tautological Assertion Elimination (`v1.10.0`)**: Hardened `store-switcher-currency.spec.ts` and `order-history.spec.ts` to replace non-failing `>= 0` count checks with strict DOM visibility and positive item count checks (`toBeGreaterThan(0)`).
- **📋 Honest Test Title & Scope Alignment (`v1.10.0`)**: Renamed store switcher header region test to `"header store switcher trigger displays interactive region dropdown options"` to accurately describe scope without claiming multi-currency switching.
- **🔍 Tautological Performance & API Assertion Hardening (`v1.9.0`)**: Replaced non-failing assertion patterns with rigorous boolean assertions (`expect(audit.passed).toBe(true)`, `expect(contract.valid).toBe(true)`), and grouped `waitForResponse` predicates (`&&`) to intercept exact `/search` endpoints.
- **💰 Price Parsing Regression Suite (`v1.9.0`)**: Added `tests/p1-business-rules/price-parsing.spec.ts` to guard against currency parsing fragilities and document live currency prefix format requirements.
- **📋 Honest Test Report Annotation Alignment (`v1.8.0`)**: Ensures test titles and runtime HTML report annotations (`test.info().annotations.push({ type: 'unverified' })`) strictly align with unverified documentation notes so results never imply false certainty.
- **📋 Standing Verification Rigor Enforcement (§6.7)**: Hardcodes our zero-fabrication verification policy across documentation and tests. Any task gated on human verification stays visibly open (`⚠️ UNVERIFIED — pending manual confirmation`) until explicit evidence or human confirmation is provided.
- **⚡ Deduplicated Self-Healing Out-of-Stock Discovery (`src/utils/productDiscovery.ts`)**: Crawls live listings dynamically at runtime (`findCurrentOosProduct`) and hoists discovery into a shared `beforeAll` fixture setup.

---

## 📊 Comprehensive Test Matrix & Live Runtime Status

Our verification suite consists of **62 tests** distributed across **16 specification files** under three priority tiers (`P0 Critical Path`, `P1 Business Rules`, `P2 Content & SEO`).

```
  51 active tests passed (100% Pass Rate across all guest, dynamic inventory & unit regression flows)
  11 skipped cleanly (awaiting dedicated test account credentials per prompt §2)
   0 failed
```

### Complete Suite Execution Matrix

| Tier | Suite File | Coverage Scope | Total Tests | Passed | Skipped | Status |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **P0** | `auth.spec.ts` | Login UI, Registration Form, Guest Checkout Redirect | 5 | 4 | 1 | ✅ **PASS** |
| **P0** | `cart.spec.ts` | Cart Item Verification, Subtotals, Quantity Updates, Empty State | 4 | 4 | 0 | ✅ **PASS** |
| **P0** | `checkout.spec.ts` | Serviceable PIN Check, Express Shipping, Order Summary Review | 4 | 0 | 4 | ⏸️ **SKIP** |
| **P0** | `homepage.spec.ts` | Header, Search Bar, Mega-Menu, Store Switcher, Footer | 7 | 7 | 0 | ✅ **PASS** |
| **P0** | `navigation.spec.ts` | Category Grid Clickability, Breadcrumb Navigation | 2 | 2 | 0 | ✅ **PASS** |
| **P0** | `pdp-add-to-cart.spec.ts` | PDP Core Elements, Add to Cart Badge, Rapid Double-Click Safety | 5 | 5 | 0 | ✅ **PASS** |
| **P0** | `search.spec.ts` | Broad Keyword Search, Nonsense Search Empty State, XSS Input Safety | 4 | 4 | 0 | ✅ **PASS** |
| **P1** | `api-contracts.spec.ts` | Search Autocomplete AJAX Contract Verification | 1 | 1 | 0 | ✅ **PASS** |
| **P1** | `order-history.spec.ts` | My Account Order List, Order Detail View, Tracking Error State | 3 | 0 | 3 | ⏸️ **SKIP** |
| **P1** | `out-of-stock.spec.ts` | **(v1.7.0)** Dynamic Self-Healing OOS Discovery & CTA Disabled Check | 2 | 0 | 2 | ⏸️ **SKIP** |
| **P1** | `price-parsing.spec.ts` | **(v1.9.0)** Price Parsing Unit Regression Suite | 2 | 2 | 0 | ✅ **PASS** |
| **P1** | `shipping-calculation.spec.ts` | Malformed PIN Validation Safety, Basket Quantity Scaling | 2 | 1 | 1 | ✅ **PASS** |
| **P1** | `store-switcher.spec.ts` | Store Switch Modal (`⚠️ UNVERIFIED — annotated observation pending manual check`) | 3 | 3 | 0 | ✅ **PASS** |
| **P1** | `store-switcher-currency.spec.ts` | Header Region Selector Trigger & Dropdown Auditing | 1 | 1 | 0 | ✅ **PASS** |
| **P1** | `store-switcher-network.spec.ts` | **(v2.0.0)** Network-Level Server Session Cart Audit (`✅ NETWORK-VERIFIED`) | 1 | 1 | 0 | ✅ **PASS** |
| **P2** | `footer-links.spec.ts` | Footer Navigation Links Integrity & Dead Link Detection | 1 | 1 | 0 | ✅ **PASS** |
| **P2** | `performance.spec.ts` | Homepage & PDP Core Web Vitals Navigation Timings (`v1.9.0 assertion fix`) | 2 | 2 | 0 | ✅ **PASS** |
| **P2** | `responsive.spec.ts` | Mobile Viewport Layout Verification (Homepage, PDP, Cart) | 3 | 3 | 0 | ✅ **PASS** |
| **P2** | `static-pages.spec.ts` | About Us, Contact, FAQ, Terms, Shipping, Warranty, ISO, App, Reviews | 10 | 10 | 0 | ✅ **PASS** |
| **TOTAL** | **16 Spec Files** | **Complete Production E2E & Regression Coverage** | **62** | **51** | **11** | **100% Pass** |

---

## 🏗️ Architectural Overview & Directory Structure

```text
ubuy-qa-automation/
├── Dockerfile                  # Official Playwright Ubuntu Jammy container build
├── .dockerignore               # Build exclusion filters for containerization
├── playwright.config.ts        # Playwright runner configuration (Headed Chromium, workers: 1)
├── package.json                # Scripts, dependencies, and v2.0.0 version declaration
├── tsconfig.json               # TypeScript strict mode compiler rules
├── .prettierrc.json            # Code formatting rules (100 line width, single quotes)
├── scripts/
│   └── enforce-no-place-order.mjs  # Load-bearing CI safety guardrail script
├── docs/                       # Comprehensive documentation & release notes
│   ├── a11y-baseline.json      # Tracked technical debt baseline of 12 legacy production a11y issues
│   ├── discovery-log.md        # Live site discovery log & Standing Verification Rigor Rule (§6.7)
│   ├── RELEASE_v1.4.0.md       # Release v1.4.0 publication notes
│   ├── RELEASE_v1.5.0.md       # Release v1.5.0 publication notes
│   ├── RELEASE_v1.6.0.md       # Release v1.6.0 publication notes
│   ├── RELEASE_v1.7.0.md       # Release v1.7.0 publication notes
│   ├── RELEASE_v1.8.0.md       # Release v1.8.0 publication notes
│   ├── RELEASE_v1.9.0.md       # Release v1.9.0 publication notes
│   ├── RELEASE_v1.10.0.md      # Release v1.10.0 publication notes
│   └── RELEASE_v2.0.0.md       # Release v2.0.0 publication notes
├── src/
│   ├── config/env.ts           # Strongly-typed environment variable loader
│   ├── locators/               # Centralized CSS & DOM selector registry
│   ├── pages/                  # Page Object Model classes (Home, PDP, Cart, Checkout, etc.)
│   ├── components/             # Reusable UI components (StoreSwitcher.ts)
│   ├── fixtures/               # Lazy POM fixtures with automated Cloudflare WAF detection
│   └── utils/                  # Core Web Vitals, API Schema, Identity Provisioning & Throttling
└── tests/
    ├── p0-critical-path/       # P0 Critical Path smoke suites
    ├── p1-business-rules/      # P1 Business rules & cross-border suites
    └── p2-content-seo/         # P2 Performance, responsive, and SEO suites
```

---

## 🚀 Getting Started & Environment Configuration

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone & Install
```bash
git clone https://github.com/Dipendu27/ubuy-qa-automation.git
cd ubuy-qa-automation
npm install
npx playwright install --with-deps chromium
```

### 2. Configure Credentials (`.env`)
Copy the environment template:
```bash
cp .env.example .env
```
Populate `.env` with your dedicated test account details once provisioned:
```env
BASE_URL=https://www.ubuy.co.in
TEST_USER_EMAIL=qa-test-account@example.com
TEST_USER_PASSWORD=your-secure-test-password
```

### 3. Docker Container Execution (`v2.0.0`)
Build and run the official Playwright container environment:
```bash
# Build production test container (verifies safety guardrail on build)
docker build -t ubuy-qa-automation:v2.0.2 .

# Execute E2E suite inside container
# Runs HEADED inside a virtual display (xvfb-run baked into the image CMD) — §5.1 Cloudflare compatibility
docker run --rm --env-file .env ubuy-qa-automation:v2.0.2

# Optional: run headless instead (skips the virtual display)
docker run --rm --env-file .env -e HEADLESS=true ubuy-qa-automation:v2.0.2 npx playwright test --project=chromium-desktop

# Visual baselines are platform-suffixed; generate Linux baselines from inside the container:
docker run --rm --env-file .env -v "$(pwd)/tests:/app/tests" ubuy-qa-automation:v2.0.2 xvfb-run npm run snapshots:update
```

---

## 🧪 Test Execution & Quality Command Reference

### Safety & Static Quality Gates
```bash
# Verify financial safety guardrails (0 references to placeOrder())
npm run test:safety

# Check Prettier code formatting
npm run format:check

# Run strict TypeScript compilation check (0 errors)
npx tsc --noEmit

# Run ESLint across all source and test files
npm run lint
```

### Executing Test Suites against Live Production
```bash
# Run the entire 62-test suite
npm test

# Execute by Priority Tier
npm run test:p0   # P0 Critical Path Suites
npm run test:p1   # P1 Business Rules & API Contract Suites
npm run test:p2   # P2 Performance, Responsive Layouts & Static Pages

# Execute specifically on mobile viewport
npm run test:mobile
```

### Generating & Viewing HTML Test Reports
```bash
npm run report
```

---

## ⚡ Core Web Vitals & API Contract Verification

In `v1.6.0`, automated performance budgeting and network contract validation are seamlessly integrated:
- **Core Web Vitals Thresholds**: Asserts that `Time to First Byte (TTFB)` remains under `10,000ms` and `First Contentful Paint (FCP)` completes cleanly on live production pages.
- **Conscious Scope Decision on API/Network Testing (§3.1)**: While standalone backend REST API testing remains out of scope, **light network-assertion coverage on UI-triggered AJAX calls** (such as live search autocomplete in `api-contracts.spec.ts`) is formally **in-scope**. It passively verifies HTTP status codes ($\ge 200$) and JSON payload structures during genuine user interactions without hitting standalone APIs directly.
- **Dynamic Inventory Self-Healing (§2)**: Out-of-Stock tests (`out-of-stock.spec.ts`) dynamically discover current OOS SKUs at runtime (`findCurrentOosProduct`) instead of hardcoding static URLs.

---

## 🌐 Cloudflare WAF Resilience & Cross-Browser Rationale

### Automated WAF Handling: Mitigation vs. Solution (§3.3)
When running automated tests against enterprise CDNs like Cloudflare, datacenter IPs may encounter defensive bot interstitials ("Just a moment..."). Our framework integrates a built-in WAF detector within `base.fixture.ts`. If a WAF interstitial is detected, the fixture safely marks the test as skipped with reason `environment-blocked-by-waf`.
- **WAF Mitigation:** Automated retry-with-backoff (up to 3 retries with exponential delay) in `.github/workflows/nightly-smoke.yml` serves as an active **mitigation** to smooth over transient datacenter IP challenges.
- **WAF Solution:** A self-hosted corporate or residential runner remains the only permanent **solution** for 100% reliable scheduled runs against production without Cloudflare datacenter IP reputation blocks.

### Why Chromium-Only Scope (`chromium-desktop`, `mobile-chrome`)
- **Traffic Dominance (§3.2)**: Chromium-based engines account for an estimated **~92% of active desktop and mobile user traffic** (per industry e-commerce benchmarks and site traffic distributions).
- **Server Rate-Limit Protection**: Enforcing single-worker serial execution (`workers: 1`) prevents server strain; adding a 3-browser matrix would triple execution times without improving core defect discovery.

---

## 📋 License & Contributing

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full legal text.

Designed and hardened for **Ubuy India Quality Assurance Engineering**. Contributions adhering to zero-payment safety rules and Prettier/TypeScript strict standards are welcome!
