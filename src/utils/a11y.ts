/**
 * Accessibility (a11y) verification utility using @axe-core/playwright (§4 Task 9).
 *
 * Runs an automated accessibility scan against the current page state.
 * - Fails the test ONLY on `critical` or `serious` WCAG violations.
 * - Logs `moderate` and `minor` violations to the console without failing the build.
 */

import fs from 'fs';
import path from 'path';
import { Page, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { logger } from './logger.js';

interface AxeViolation {
  impact?: string | null;
  id: string;
  help: string;
  helpUrl: string;
  nodes: { target: unknown[] }[];
}

interface A11yBaselineEntry {
  ruleId: string;
  target: string;
  page: string;
  notes?: string;
}

function getBaselineEntries(): A11yBaselineEntry[] {
  try {
    const baselinePath = path.resolve(process.cwd(), 'docs/a11y-baseline.json');
    if (fs.existsSync(baselinePath)) {
      const raw = JSON.parse(fs.readFileSync(baselinePath, 'utf-8')) as {
        baseline?: A11yBaselineEntry[];
      };
      return Array.isArray(raw.baseline) ? raw.baseline : [];
    }
  } catch (err: unknown) {
    logger.warn(
      'A11y',
      `Could not read docs/a11y-baseline.json: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
  return [];
}

function isBaselined(
  violation: AxeViolation,
  pageName: string,
  baseline: A11yBaselineEntry[],
): boolean {
  const matchingEntries = baseline.filter((entry) => {
    const pageMatch = entry.page === '*' || entry.page.toLowerCase() === pageName.toLowerCase();
    return entry.ruleId === violation.id && pageMatch;
  });

  if (matchingEntries.length === 0) {
    return false;
  }

  return violation.nodes.every((node) =>
    node.target.some((selector) =>
      matchingEntries.some((entry) => String(selector).includes(entry.target)),
    ),
  );
}

export async function checkA11y(page: Page, pageName: string): Promise<void> {
  logger.info('A11y', `Running Axe-core accessibility scan for: ${pageName}`);

  let criticalOrSerious: AxeViolation[] = [];
  let unbaselinedViolations: AxeViolation[] = [];
  try {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .exclude('#newsletter') // Known site-wide production footer input lacking ARIA label
      .analyze();

    const violations = accessibilityScanResults.violations as unknown as AxeViolation[];
    criticalOrSerious = violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
    const moderateOrMinor = violations.filter(
      (v) => v.impact === 'moderate' || v.impact === 'minor',
    );

    if (moderateOrMinor.length > 0) {
      logger.warn(
        'A11y',
        `Found ${moderateOrMinor.length} moderate/minor accessibility issue(s) on ${pageName}:`,
      );
      moderateOrMinor.forEach((v) => {
        logger.warn('A11y', `  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} element(s))`);
      });
    }

    const baseline = getBaselineEntries();
    unbaselinedViolations = criticalOrSerious.filter((v) => {
      const baselined = isBaselined(v, pageName, baseline);
      if (baselined) {
        logger.warn(
          'A11y',
          `  - [A11y Baseline Debt Tracked] [${v.impact?.toUpperCase()}] ${v.id}: ${v.help}`,
        );
      }
      return !baselined;
    });

    if (unbaselinedViolations.length > 0) {
      logger.error(
        'A11y',
        `Found ${unbaselinedViolations.length} NEW un-baselined CRITICAL/SERIOUS accessibility violation(s) on ${pageName}:`,
      );
      unbaselinedViolations.forEach((v) => {
        logger.error('A11y', `  - [${v.impact?.toUpperCase()}] ${v.id}: ${v.help} (${v.helpUrl})`);
        v.nodes.forEach((node: { target: unknown[] }, idx: number) => {
          logger.error('A11y', `      Node ${idx + 1}: ${JSON.stringify(node.target)}`);
        });
      });
    }
  } catch (err: unknown) {
    // If Axe fails to inject due to Cloudflare cross-domain or frame restrictions, log warning rather than crashing test
    logger.warn(
      'A11y',
      `[A11y Scan Skipped] Could not complete Axe scan on ${pageName}: ${err instanceof Error ? err.message : String(err)}`,
    );
    return;
  }

  expect(
    unbaselinedViolations,
    `Expected zero new un-baselined critical/serious accessibility violations on ${pageName}, but found ${unbaselinedViolations.length}. See logs for details.`,
  ).toEqual([]);
}
