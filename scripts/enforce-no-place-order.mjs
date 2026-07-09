/**
 * CI Safety Guardrail (§4 Task 5)
 *
 * Enforces zero references to `placeOrderBtn` or order placement click actions
 * across ALL of `src/` (pages, components, locators, fixtures, utils, config)
 * and `tests/`. Scanning the entire `src/` tree ensures no subdirectory (e.g.,
 * `src/locators/`) can ever become a blind spot for forbidden order-placement
 * references. (v2.0.1 — widened scope from src/pages + src/components.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const TARGET_DIRS = ['src', 'tests'];
const FORBIDDEN_PATTERNS = [
  /placeOrderBtn/i,
  /\.click\(\s*.*place.*order/i,
  /has-text\("place order"\)/i,
  /getByRole\(\s*["']button["']\s*,\s*\{\s*name:\s*["']place order["']/i,
  /title=["']place order["']/i,
];

let violationsFound = 0;

function scanDirectory(dir) {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) return;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const resPath = path.join(fullPath, entry.name);
    const relPath = path.relative(rootDir, resPath);
    if (entry.isDirectory()) {
      scanDirectory(relPath);
    } else if (
      entry.isFile() &&
      ['.ts', '.tsx', '.js', '.mjs'].some((ext) => entry.name.endsWith(ext))
    ) {
      const content = fs.readFileSync(resPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        for (const pattern of FORBIDDEN_PATTERNS) {
          if (pattern.test(line)) {
            console.error(
              `❌ SAFETY VIOLATION [${relPath}:${index + 1}]: Forbidden order-placement reference matching ${pattern}`,
            );
            console.error(`   Line content: ${line.trim()}`);
            violationsFound++;
          }
        }
      });
    }
  }
}

console.log('🛡️ Running safety guardrail check: Enforcing zero place-order references...');
TARGET_DIRS.forEach((dir) => scanDirectory(dir));

if (violationsFound > 0) {
  console.error(
    `\n🛑 BUILD FAILED: Found ${violationsFound} safety violation(s). Per §2 Non-Negotiable Safety Rails, real order placement must NEVER be referenced in tests or page objects.`,
  );
  process.exit(1);
} else {
  console.log('✅ Safety check passed: Zero place-order references found across target directories.');
  process.exit(0);
}
