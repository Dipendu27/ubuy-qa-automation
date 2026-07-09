# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.10.0] - 2026-07-09

### Added
- **Tracked Accessibility Baseline Ratchet (`docs/a11y-baseline.json` & §2.1)**: Replaced blanket `.disableRules()` in `src/utils/a11y.ts` with a tracked technical debt baseline of 12 pre-existing production accessibility issues (`color-contrast`, `list`, `listitem`, `label-title-only`, `scrollable-region-focusable`). Tests log baselined debt and fail only when new un-baselined violations occur.
- **Git Tags Backfill (§3.2)**: Backfilled and pushed semantic git tags (`v1.4.0` through `v1.10.0`) aligning with repository releases.

### Fixed
- **Tautological Assertion Elimination (`store-switcher-currency.spec.ts` & `order-history.spec.ts` §2.2)**: Replaced non-failing `.count()` `>= 0` assertions with strict visibility and non-negative count assertions (`toBeGreaterThan(0)`).
- **Honest Test Title Alignment (`store-switcher-currency.spec.ts` §2.2)**: Renamed test to `"header store switcher trigger displays interactive region dropdown options"` to accurately reflect scope without claiming multi-currency switching.

## [1.9.0] - 2026-07-09

### Added
- **Price Parsing Unit Regression Suite (`tests/p1-business-rules/price-parsing.spec.ts`)**: Added unit regression tests for `CartPage.parsePrice` and documented potential currency prefix-period fragility.

### Fixed
- **Tautological Performance Assertions (`performance.spec.ts`)**: Replaced non-failing assertions with `expect(audit.passed).toBe(true)`.
- **AJAX Interception Precision (`api-contracts.spec.ts`)**: Hardened `waitForResponse` predicate (`&&`) to intercept exact `/search` calls rather than arbitrary HTTP 200 static assets.

## [1.8.0] - 2026-07-08

### Added
- **Runtime Unverified Annotations (`store-switcher.spec.ts`)**: Added `test.info().annotations.push({ type: 'unverified' })` so HTML runtime reports visually reflect unconfirmed production store-switcher cart behavior.

## [1.7.0] - 2026-07-08

### Added
- **Standing Verification Rigor Enforcement (§6.7)**: Hardcoded zero-fabrication verification policy across documentation and tests.
- **Deduplicated Self-Healing OOS Discovery (`src/utils/productDiscovery.ts`)**: Hoisted dynamic out-of-stock product search into a shared `beforeAll` fixture to reduce network traffic.

## [1.6.0] - 2026-07-08

### Added
- **Dynamic Self-Healing OOS Discovery**: Implemented live category crawling (`findCurrentOosProduct`) to locate current out-of-stock SKUs dynamically.

## [1.5.0] - 2026-07-08

### Added
- **Core Web Vitals Performance Budgeting (`src/utils/performance.ts`)**: Added navigation timing metrics collection and upper-bound SLA budgets.
- **Passive API Schema Contract Verification (`src/utils/apiSchema.ts`)**: Added runtime JSON schema interception and validation on UI-triggered AJAX endpoints.

## [1.4.0] - 2026-07-08

### Added
- **High-Risk Page Visual Evidence (§3.1)**: Captured live production evidence screenshots for guest-accessible high-risk pages: `docs/evidence/cart-verified.png` and `docs/evidence/login-verified.png`.
- **Evidence-Linked Confidence Tags**: Updated `src/locators/cart.locators.ts` and `src/locators/account.locators.ts` with `✅ CONFIRMED` tags citing specific test specs and screenshot evidence.
- **WAF Mitigation vs. Solution Documentation (§3.2)**: Clarified in `README.md` Known Limitations that automated retry/backoff is a transient mitigation, while self-hosted residential/corporate runners remain the long-term permanent solution.
- **Architecture Browser Scope Documentation (§3.3)**: Explicitly documented Chromium-family-only scope in the `README.md` Architecture & Tech Stack section.
- **Automatic Cookie Consent Suppression**: Hardened `base.fixture.ts` and `waf.ts` to automatically dismiss obstructive `#notice-cookie-block` overlays across desktop and mobile viewports.

## [1.3.0] - 2026-07-07

### Added
- **Phase 0 Live Discovery & Evidence**: Verified live SKUs against `ubuy.co.in`, added visual screenshot evidence under `docs/evidence/`, and updated locator confidence tags (`✅ CONFIRMED` vs `🔶 UNVERIFIED`).
- **PR CI Gate**: Created `.github/workflows/pr-checks.yml` running fast linting, formatting, type checking, safety guardrails, and smoke tests on PRs to `main`.
- **CI Safety Guardrail**: Added `scripts/enforce-no-place-order.mjs` (invoked via `npm run test:safety` and `lint`) to guarantee zero references to order placement across code and tests.
- **WAF Mitigation & Alerts**: Added bounded retry-with-backoff for WAF challenges on GitHub-hosted IPs in `nightly-smoke.yml`, plus automated Slack notification on failure.
- **Axe-Core Accessibility Integration**: Integrated `@axe-core/playwright` and added baseline accessibility checks across P0 pages.
- **Visual Regression Baselines**: Added screenshot snapshot testing for responsive header/footer components with configured pixel diff thresholds.

### Changed
- Bumped package version from `1.0.0` to `1.3.0` to align package metadata with released milestone versions.
- Documented explicit cross-browser scope decision (focusing on Chromium/Mobile Chrome per traffic volume and concurrency bounds).

## [1.2.0] - 2026-07-07

### Fixed
- Fixed `shippingStep` refactoring in `checkout.spec.ts` and resolved `expect-expect` ESLint warnings.
- Aligned Node.js versions to v20 across GitHub Actions workflows and documentation.
- Removed stray webpack CI workflow file added via merge.
- Added comprehensive ground-truth traceability matrix connecting specifications to tests.

## [1.1.0] - 2026-07-06

### Added
- Comprehensive WAF / Cloudflare bot protection detection utility (`src/utils/waf.ts`).
- Ground-truth traceability documentation and rigorous selector tagging in locator files.
- Added MIT License and updated project README.

### Fixed
- Skipped PDP quantity input interaction when quantity is default 1 on mobile viewports.
- Skipped auth-dependent P1 tests when using placeholder credentials in `.env`.

## [1.0.0] - 2026-07-05

### Added
- Initial production-grade E2E UI test automation framework for `ubuy.co.in`.
- Page Object Model architecture with Playwright + TypeScript.
- Tiered test suites: P0 Critical Path, P1 Business Rules, and P2 Content & SEO.
- Nightly cron CI workflow with xvfb headed execution support.
