# Ubuy.co.in — End-to-End QA Automation Framework

A production-grade, end-to-end UI test automation framework built for **Ubuy India (ubuy.co.in)**. This framework demonstrates robust SDET architecture using **Playwright + TypeScript**, implementing the Page Object Model (POM) pattern, data-driven test design, and strict safety guardrails for production environments.

---

## 🛑 Strict Safety Guardrails (Non-Negotiable)

This framework is configured to execute against a live, production e-commerce platform. To ensure zero disruption and strict compliance, the following safety guardrails are hardcoded and enforced across all test specs:

1. **🚫 Zero Real Payment Submissions:** Every checkout test strictly halts at the final order review screen immediately prior to payment submission. No order placement CTA is ever clicked. No real card details or billing credentials are used.
2. **🛡️ Real Browser Fingerprinting (Headed Mode):** To comply with Cloudflare bot protections and avoid triggering WAF blocks, tests run in headed Chromium by default. No attempt is made to bypass, spoof, or evade bot detection.
3. **⏱️ Enforced Rate Limiting:** All page actions and navigations utilize built-in think-time throttling (`throttle()`) to simulate realistic human browsing patterns and prevent server overloading.
4. **🧵 Single-Worker Execution:** Tests are restricted to serial execution (`workers: 1`) both locally and in CI to avoid concurrency spikes.
5. **🔐 Strict Secrets Management:** All account credentials and sensitive parameters are managed exclusively via environment variables (`.env`). Nothing is hardcoded.

---

## 🏗️ Architecture & Tech Stack

* **Engine:** [Playwright](https://playwright.dev/) (v1.52+)
* **Language:** TypeScript (Strict mode enabled)
* **Design Pattern:** Page Object Model (POM) with Lazy Fixtures
* **Code Quality:** ESLint, Prettier, Husky, and Lint-Staged pre-commit hooks
* **CI/CD:** GitHub Actions (Nightly Scheduled Cron via `xvfb` headed execution)

### Directory Structure

```text
ubuy-qa-automation/
├── playwright.config.ts        # Playwright test runner configuration
├── package.json                # Scripts and dependency declarations
├── tsconfig.json               # TypeScript compiler rules
├── .env.example                # Environment variable template
├── .github/workflows/          # GitHub Actions nightly workflow
├── docs/                       # Framework documentation
│   └── discovery-log.md        # Live site discovery & selector audit log
├── src/
│   ├── config/env.ts           # Type-safe environment reader
│   ├── locators/               # Centralized CSS/DOM selector registry
│   ├── pages/                  # Page Object Model classes
│   ├── components/             # Reusable UI components (e.g., StoreSwitcher)
│   ├── fixtures/               # Playwright test fixture extensions & JSON data
│   └── utils/                  # Throttling and logging utilities
└── tests/
    ├── p0-critical-path/       # P0: Core user flows (Home, Search, Cart, Checkout)
    ├── p1-business-rules/      # P1: Store region switching, shipping rules, OOS
    └── p2-content-seo/         # P2: Static pages, footer links, responsive layout
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18 or v20+
* npm v9+

### 1. Installation

Clone the repository and install dependencies along with Playwright browser binaries:

```bash
git clone https://github.com/your-username/ubuy-qa-automation.git
cd ubuy-qa-automation
npm install
npx playwright install --with-deps chromium
```

### 2. Environment Configuration

Copy the example environment template and populate your test credentials:

```bash
cp .env.example .env
```

Open `.env` and configure:
```env
BASE_URL=https://www.ubuy.co.in
TEST_USER_EMAIL=your-dedicated-test-account@example.com
TEST_USER_PASSWORD=your-test-password
```

---

## 🧪 Running Tests

### Execute Test Suites

Run the entire suite locally (defaults to headed Chromium):
```bash
npm test
```

Run specific test priority tiers:
```bash
npm run test:p0   # Execute critical path suite
npm run test:p1   # Execute business rules suite
npm run test:p2   # Execute SEO & content suite
```

Run against specific device profiles:
```bash
npm run test:chromium   # Desktop Chrome
npm run test:mobile     # Pixel 7 mobile viewport
```

### View Test Reports

After execution, open the generated HTML report:
```bash
npm run report
```

---

## 📋 Phase 0 — Live Selector Discovery

Because production sites evolve and may employ dynamic class names, this framework uses a centralized locator registry (`src/locators/`). Before running suites against live production for the first time, review `docs/discovery-log.md` and audit confirmed selectors against the live DOM.
