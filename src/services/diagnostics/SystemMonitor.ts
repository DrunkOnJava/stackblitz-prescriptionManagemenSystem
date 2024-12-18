interface SystemState {
  timestamp: string;
  memoryUsage: number;
  activeRequests: number;
  pendingOperations: number;
}

export class SystemMonitor {
  private static instance: SystemMonitor;
  private states: SystemState[] = [];
  private readonly MAX_STATES = 100;

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): SystemMonitor {
    if (!this.instance) {
      this.instance = new SystemMonitor();
    }
    return this.instance;
  }

  private startMonitoring(): void {
    setInterval(() => {
      this.captureState();
    }, 60000); // Monitor every minute
  }

  private captureState(): void {
    const state: SystemState = {
      timestamp: new Date().toISOString(),
      memoryUsage: this.getMemoryUsage(),
      activeRequests: this.getActiveRequests(),
      pendingOperations: this.getPendingOperations()
    };

    this.states.unshift(state);
    if (this.states.length > this.MAX_STATES) {
      this.states.pop();
    }
  }

  private getMemoryUsage(): number {
    // In a browser environment, we can use performance.memory
    // @ts-ignore
    const memory = performance?.memory;
    return memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0;
  }

  private getActiveRequests(): number {
    // This would track active network requests
    // For now, return a placeholder
    return 0;
  }

  private getPendingOperations(): number {
    // This would track pending async operations
    // For now, return a placeholder
    return 0;
  }

  getSystemReport(): SystemReport {
    return {
      currentState: this.states[0],
      historicalStates: this.states,
      averages: this.calculateAverages(),
      peaks: this.calculatePeaks()
    };
  }

  private calculateAverages(): SystemAverages {
    if (!this.states.length) return { memoryUsage: 0, activeRequests: 0, pendingOperations: 0 };

    const sum = this.states.reduce((acc, state) => ({
      memoryUsage: acc.memoryUsage + state.memoryUsage,
      activeRequests: acc.activeRequests + state.activeRequests,
      pendingOperations: acc.pendingOperations + state.pendingOperations
    }), { memoryUsage: 0, activeRequests: 0, pendingOperations: 0 });

    return {
      memoryUsage: Math.round(sum.memoryUsage / this.states.length),
      activeRequests: Math.round(sum.activeRequests / this.states.length),
      pendingOperations: Math.round(sum.pendingOperations / this.states.length)
    };
  }

  private calculatePeaks(): SystemPeaks {
    if (!this.states.length) return { memoryUsage: 0, activeRequests: 0, pendingOperations: 0 };

    return {
      memoryUsage: Math.max(...this.states.map(s => s.memoryUsage)),
      activeRequests: Math.max(...this.states.map(s => s.activeRequests)),
      pendingOperations: Math.max(...this.states.map(s => s.pendingOperations))
    };
  }
}

interface SystemReport {
  currentState: SystemState;
  historicalStates: SystemState[];
  averages: SystemAverages;
  peaks: SystemPeaks;
}

interface SystemAverages {
  memoryUsage: number;
  activeRequests: number;
  pendingOperations: number;
}

interface SystemPeaks {
  memoryUsage: number;
  activeRequests: number;
  pendingOperations: number;
}