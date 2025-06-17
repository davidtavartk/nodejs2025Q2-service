import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private logLevels = ['error', 'warn', 'log', 'debug', 'verbose'];
  private currentLevel = process.env.LOG_LEVEL || 'log';

  private shouldLog(level: string): boolean {
    const currentIndex = this.logLevels.indexOf(this.currentLevel);
    const messageIndex = this.logLevels.indexOf(level);
    return messageIndex <= currentIndex;
  }

  log(message: string, context?: string) {
    if (this.shouldLog('log')) {
      console.log(
        `[LOG] ${new Date().toISOString()} ${context ? `[${context}]` : ''} ${message}`,
      );
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.shouldLog('error')) {
      console.error(
        `[ERROR] ${new Date().toISOString()} ${context ? `[${context}]` : ''} ${message}`,
      );
      if (trace) console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    if (this.shouldLog('warn')) {
      console.warn(
        `[WARN] ${new Date().toISOString()} ${context ? `[${context}]` : ''} ${message}`,
      );
    }
  }

  debug(message: string, context?: string) {
    if (this.shouldLog('debug')) {
      console.debug(
        `[DEBUG] ${new Date().toISOString()} ${context ? `[${context}]` : ''} ${message}`,
      );
    }
  }
}
