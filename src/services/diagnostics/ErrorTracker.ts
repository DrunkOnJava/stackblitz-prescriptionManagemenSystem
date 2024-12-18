import { AppError } from '../errorService';

interface ErrorRecord {
  error: AppError;
  timestamp: string;
  count: number;
  lastOccurrence: string;
  contexts: Record<string, any>[];
}

export class ErrorTracker {
  private static instance: ErrorTracker;
  private errorMap: Map<string, ErrorRecord> = new Map();
  private readonly MAX_CONTEXTS = 10;

  private constructor() {}

  static getInstance(): ErrorTracker {
    if (!this.instance) {
      this.instance = new ErrorTracker();
    }
    return this.instance;
  }

  trackError(error: AppError): void {
    const errorKey = this.getErrorKey(error);
    const existingRecord = this.errorMap.get(errorKey);

    if (existingRecord) {
      existingRecord.count++;
      existingRecord.lastOccurrence = new Date().toISOString();
      if (error.context) {
        existingRecord.contexts = [
          error.context,
          ...existingRecord.contexts.slice(0, this.MAX_CONTEXTS - 1)
        ];
      }
    } else {
      this.errorMap.set(errorKey, {
        error,
        timestamp: new Date().toISOString(),
        count: 1,
        lastOccurrence: new Date().toISOString(),
        contexts: error.context ? [error.context] : []
      });
    }

    this.logErrorOccurrence(error);
  }

  private getErrorKey(error: AppError): string {
    return `${error.type}:${error.code}`;
  }

  private logErrorOccurrence(error: AppError): void {
    console.error('Error Occurrence:', {
      type: error.type,
      code: error.code,
      message: error.message,
      timestamp: error.timestamp,
      context: error.context
    });
  }

  getErrorReport(): ErrorReport {
    const errors = Array.from(this.errorMap.values());
    const frequentErrors = this.getFrequentErrors();
    const recentErrors = this.getRecentErrors();
    
    return {
      totalErrors: errors.length,
      errorsByType: this.groupErrorsByType(),
      frequentErrors,
      recentErrors,
      detailedRecords: errors
    };
  }

  private groupErrorsByType(): Record<string, number> {
    const typeCount: Record<string, number> = {};
    this.errorMap.forEach((record) => {
      const { type } = record.error;
      typeCount[type] = (typeCount[type] || 0) + record.count;
    });
    return typeCount;
  }

  private getFrequentErrors(): ErrorRecord[] {
    return Array.from(this.errorMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getRecentErrors(): ErrorRecord[] {
    return Array.from(this.errorMap.values())
      .sort((a, b) => new Date(b.lastOccurrence).getTime() - new Date(a.lastOccurrence).getTime())
      .slice(0, 5);
  }

  clearErrors(): void {
    this.errorMap.clear();
  }
}

interface ErrorReport {
  totalErrors: number;
  errorsByType: Record<string, number>;
  frequentErrors: ErrorRecord[];
  recentErrors: ErrorRecord[];
  detailedRecords: ErrorRecord[];
}