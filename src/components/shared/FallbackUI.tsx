import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface FallbackUIProps {
  error?: Error | string | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

export function FallbackUI({ error, resetErrorBoundary, message }: FallbackUIProps) {
  const errorMessage = error instanceof Error ? error.message : error;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {message || 'Something went wrong'}
          </h3>
          {errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{errorMessage}</p>
          )}
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FallbackUI;