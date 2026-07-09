# ==============================================================================
# Ubuy QA Automation — Production E2E Playwright Dockerfile (v2.0.2 §4.1)
# ==============================================================================
# Base image: Official Playwright environment on Ubuntu Jammy (Node 20 + browsers)
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory inside container
WORKDIR /app

# Copy package metadata and install deterministic dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy remaining framework source code
COPY . .

# Verify financial safety guardrail on container build
RUN npm run test:safety

# Default command: execute safety-gated Playwright E2E suite.
# The framework runs HEADED by default (§5.1 — real browser fingerprint for Cloudflare),
# so the container wraps execution in a virtual display via xvfb-run (bundled in the
# Playwright base image). Without this, headed Chromium cannot launch in a container.
# To run headless instead, override with: docker run -e HEADLESS=true <image> npx playwright test --project=chromium-desktop
CMD ["xvfb-run", "--auto-servernum", "--server-args=-screen 0 1920x1080x24", "npx", "playwright", "test", "--project=chromium-desktop"]
