/**
 * Throttle / think-time utility.
 *
 * Per §5.4 — enforced delays between actions to rate-limit
 * automation against the production site. Every page navigation
 * and major action should call throttle() to simulate realistic
 * user think-time and avoid triggering Cloudflare rate-limits.
 */

/** Default delay range in milliseconds */
const DEFAULT_MIN_MS = 1000;
const DEFAULT_MAX_MS = 3000;

/**
 * Wait for a random duration between min and max milliseconds.
 * Simulates natural user think-time.
 */
export async function throttle(
  minMs: number = DEFAULT_MIN_MS,
  maxMs: number = DEFAULT_MAX_MS,
): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Wait for a fixed duration in milliseconds.
 * Use when you need a specific, deterministic pause.
 */
export async function waitFor(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Rate-limited action wrapper.
 * Executes an action, then enforces a throttle delay afterward.
 */
export async function withThrottle<T>(
  action: () => Promise<T>,
  minMs?: number,
  maxMs?: number,
): Promise<T> {
  const result = await action();
  await throttle(minMs, maxMs);
  return result;
}
