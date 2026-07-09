# ==============================================================================
# Ubuy QA Automation — Production E2E Playwright Dockerfile (v2.0.0 §4.1)
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

# Default command: execute safety-gated Playwright E2E suite
CMD ["npx", "playwright", "test", "--project=chromium-desktop"]
