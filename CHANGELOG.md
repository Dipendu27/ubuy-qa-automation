# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
