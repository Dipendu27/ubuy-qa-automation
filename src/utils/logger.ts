/**
 * Simple structured logger for test automation.
 * Provides timestamped, level-tagged log output for debugging
 * and for the discovery-log documentation.
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'DISCOVERY';

function timestamp(): string {
  return new Date().toISOString();
}

function formatMessage(level: LogLevel, context: string, message: string): string {
  return `[${timestamp()}] [${level}] [${context}] ${message}`;
}

export const logger = {
  info(context: string, message: string): void {
    console.log(formatMessage('INFO', context, message));
  },

  warn(context: string, message: string): void {
    console.warn(formatMessage('WARN', context, message));
  },

  error(context: string, message: string): void {
    console.error(formatMessage('ERROR', context, message));
  },

  debug(context: string, message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(formatMessage('DEBUG', context, message));
    }
  },

  /**
   * Special log level for Phase 0 discovery findings.
   * Output goes to stdout for capture into discovery-log.md.
   */
  discovery(context: string, message: string): void {
    console.log(formatMessage('DISCOVERY', context, message));
  },
};
