import { useState, useCallback } from 'react';
import type { AppError } from '../services/errorService';
import * as errorService from '../services/errorService';

export function useError() {
  const [error, setError] = useState<AppError | null>(null);

  const handleAppError = useCallback((error: any, context?: Record<string, any>) => {
    const appError = errorService.handleError(error, context);
    setError(appError);
    return appError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isLoading = useCallback((type: string) => {
    return error?.type === type;
  }, [error]);

  return {
    error,
    handleError: handleAppError,
    clearError,
    isLoading,
    setError
  };
}