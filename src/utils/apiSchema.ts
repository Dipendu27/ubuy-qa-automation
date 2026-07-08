/**
 * API & Network Schema Validation Utility (`v1.5.0`).
 *
 * Provides helper functions to inspect AJAX/API responses and assert
 * JSON schema contracts (status code, content-type, payload shape) during E2E flows.
 */

import { APIResponse, Response } from '@playwright/test';
import { logger } from './logger.js';

export interface ApiContractAssertionResult {
  valid: boolean;
  status: number;
  errors: string[];
}

/**
 * Validate an HTTP API Response for successful JSON contract compliance.
 */
export async function validateJsonResponseContract(
  response: APIResponse | Response,
  expectedKeys?: string[],
): Promise<ApiContractAssertionResult> {
  const errors: string[] = [];
  const status = response.status();

  if (status < 200 || status >= 400) {
    errors.push(`Unexpected HTTP status code: ${status}`);
  }

  const contentType = response.headers()['content-type'] ?? '';
  if (!contentType.includes('application/json') && !contentType.includes('text/html')) {
    errors.push(`Unexpected Content-Type header: ${contentType}`);
  }

  try {
    const json = await response.json();
    if (expectedKeys && expectedKeys.length > 0) {
      for (const key of expectedKeys) {
        if (!(key in json)) {
          errors.push(`Missing expected JSON key: "${key}"`);
        }
      }
    }
  } catch {
    // If not parseable as JSON, record if status indicates JSON expected
    if (contentType.includes('application/json')) {
      errors.push('Response Content-Type is application/json but body failed to parse as JSON');
    }
  }

  const valid = errors.length === 0;
  if (!valid) {
    logger.warn('ApiContract', `Contract validation issues: ${errors.join('; ')}`);
  } else {
    logger.info('ApiContract', `Response validated cleanly (Status: ${status})`);
  }

  return { valid, status, errors };
}
