import { useEffect, useCallback } from 'react';
import { DiagnosticService } from '../services/diagnostics/DiagnosticService';

export function useDiagnostics(componentName: string) {
  const diagnosticService = DiagnosticService.getInstance();

  useEffect(() => {
    // Start component lifecycle checkpoint
    diagnosticService.startCheckpoint(`${componentName}:mount`);

    return () => {
      // End component lifecycle checkpoint
      diagnosticService.endCheckpoint(`${componentName}:mount`);
    };
  }, [componentName]);

  const trackOperation = useCallback((operationName: string, operation: () => Promise<any>) => {
    const checkpointName = `${componentName}:${operationName}`;
    
    return async () => {
      diagnosticService.startCheckpoint(checkpointName);
      try {
        const result = await operation();
        const duration = diagnosticService.endCheckpoint(checkpointName);
        console.debug(`Operation ${checkpointName} completed in ${duration}ms`);
        return result;
      } catch (error) {
        diagnosticService.endCheckpoint(checkpointName);
        throw error;
      }
    };
  }, [componentName]);

  return {
    trackOperation
  };
}