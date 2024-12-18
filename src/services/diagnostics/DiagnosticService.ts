import { ErrorTracker } from './ErrorTracker';
import { SystemMonitor } from './SystemMonitor';
import { AppError } from '../errorService';

export class DiagnosticService {
  private static instance: DiagnosticService | null = null;
  private errorTracker: ErrorTracker;
  private systemMonitor: SystemMonitor;
  private checkpoints: Map<string, number> = new Map();
  private operationStack: string[] = [];
  private readonly DEBUG = true;

  private constructor() {
    this.errorTracker = ErrorTracker.getInstance();
    this.systemMonitor = SystemMonitor.getInstance();
    this.setupGlobalErrorHandlers();
    console.log('DiagnosticService initialized');
  }

  static getInstance(): DiagnosticService {
    if (!this.instance) {
      this.instance = new DiagnosticService();
    }
    return this.instance;
  }

  private setupGlobalErrorHandlers(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'promise',
        code: 'unhandled-rejection',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        timestamp: new Date().toISOString(),
        context: {
          stack: event.reason?.stack,
          currentOperation: this.getCurrentOperation()
        }
      });
    });
  }

  trackError(error: AppError): void {
    const enhancedError = {
      ...error,
      context: {
        ...error.context,
        currentOperation: this.getCurrentOperation(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        userAgent: navigator.userAgent
      }
    };
    this.errorTracker.trackError(enhancedError);
    
    if (this.DEBUG) {
      console.error('Diagnostic Error:', enhancedError);
    }
  }

  startCheckpoint(name: string): void {
    this.checkpoints.set(name, performance.now());
    this.operationStack.push(name);
    if (this.DEBUG) {
      console.debug(`Starting operation: ${name}`);
    }
  }

  endCheckpoint(name: string): number | null {
    const startTime = this.checkpoints.get(name);
    if (!startTime) return null;

    const duration = performance.now() - startTime;
    this.checkpoints.delete(name);
    this.operationStack = this.operationStack.filter(op => op !== name);
    
    if (this.DEBUG) {
      console.debug(`Operation completed: ${name} (${duration.toFixed(2)}ms)`);
    }
    return duration;
  }

  private getCurrentOperation(): string {
    return this.operationStack[this.operationStack.length - 1] || 'unknown';
  }

  generateDiagnosticReport(): DiagnosticReport {
    return {
      timestamp: new Date().toISOString(),
      errors: this.errorTracker.getErrorReport(),
      system: this.systemMonitor.getSystemReport(),
      checkpoints: Array.from(this.checkpoints.entries()).map(([name, startTime]) => ({
        name,
        duration: performance.now() - startTime
      }))
    };
  }

  clearDiagnostics(): void {
    this.errorTracker.clearErrors();
    this.checkpoints.clear();
  }
}

interface DiagnosticReport {
  timestamp: string;
  errors: any;
  system: any;
  checkpoints: Array<{
    name: string;
    duration: number;
  }>;
}