# Ubuy.co.in — End-to-End QA Automation Framework

A production-grade, end-to-end UI test automation framework built for **Ubuy India (ubuy.co.in)**. This framework demonstrates robust SDET architecture using **Playwright + TypeScript**, implementing the Page Object Model (POM) pattern, data-driven test design, and strict safety guardrails for production environments.

---

## 🛑 Safety Rails & Financial Safety (Non-Negotiable)

> [!CAUTION]
> **FINANCIAL & INFRASTRUCTURE SAFETY GUARDRAILS**
> This framework executes against a live production e-commerce platform. To ensure zero financial risk and prevent service disruption, the following load-bearing safety features are hardcoded into the architecture:
>
> 1. **🚫 Zero Real Payment Submissions:** This test suite **never submits real payment**. Every checkout test strictly halts at the order review screen. Furthermore, `PaymentStep.ts` intentionally omits any `placeOrder()` method or submission locator so an order cannot be placed programmatically.
> 2. **🧵 Serial Execution (`workers: 1`):** Tests are restricted to single-worker execution in both local and CI environments (`playwright.config.ts`). **This is a load-bearing safety rail** designed to avoid concurrency spikes against production servers and must never be increased in future "optimization" PRs.
> 3. **⏱️ Enforced Rate Throttling (`throttle()`):** All navigations and user actions invoke built-in think-time delays (`src/utils/throttle.ts`) to simulate natural human cadence and avoid IP bans or rate-limiting. **Do not remove or reduce throttling.**
> 4. **🛡️ Headed Execution Default:** To comply with Cloudflare WAF inspections, tests run in headed Chromium by default. No attempt is made to bypass or spoof bot detection mechanisms.
> 5. **🔐 Environment Secrets Only:** Credentials are read strictly from environment variables (`.env`). No sensitive account details or payment data are ever stored in source code.

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

### How Selectors Get Confirmed
To maintain transparency and prevent regression drift, any new selector added to `src/locators/*.ts` must ship with an evidence artifact in the same commit (§3.3):
1. Save a dated screenshot (`.png`) or Playwright trace (`.zip`) under `docs/evidence/`.
2. Record the verified selector and reference the artifact filename in `docs/discovery-log.md`.
3. Tag the locator in source code as `// ✅ CONFIRMED (see docs/evidence/filename.png)`. Selectors without dedicated screenshot/trace evidence files must remain tagged `// 🔶 UNVERIFIED (heuristic fallback selector)`.

---

## ⚠️ Known Limitations & Cloudflare WAF

> [!WARNING]
> **CI Execution on Shared Runners**
> The GitHub Actions workflow (`.github/workflows/nightly-smoke.yml`) runs on shared GitHub-hosted `ubuntu-latest` runners using `xvfb-run`. Cloudflare WAF is materially more likely to challenge or hard-block traffic originating from shared datacenter IP ranges than from residential or corporate IPs.
>
> **Mitigation & Workaround (§3.6):**
> * A global WAF challenge detector (`src/utils/waf.ts`) is integrated into the automatic test fixture (`base.fixture.ts`). If a Cloudflare challenge page ("Just a moment" or WAF interstitial) is encountered, tests are cleanly skipped and annotated with `environment-blocked-by-waf` instead of failing with generic locator timeouts.
> * **Long-Term Recommendation:** For 100% reliable scheduled nightly smoke runs against production, execute the test suite from a self-hosted runner on a corporate/office network or residential static IP.
