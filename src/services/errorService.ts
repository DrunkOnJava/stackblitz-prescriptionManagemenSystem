export type ErrorType = 
  | 'auth'
  | 'database'
  | 'validation'
  | 'network'
  | 'prescription'
  | 'patient'
  | 'unknown';

export interface AppError {
  type: ErrorType;
  code: string;
  message: string;
  originalError?: any;
  timestamp: string;
  context?: Record<string, any>;
}

export const errorCodes: Record<string, { type: ErrorType; message: string }> = {
  // Auth errors
  'auth/user-not-found': { type: 'auth', message: 'Invalid email or password' },
  'auth/wrong-password': { type: 'auth', message: 'Invalid email or password' },
  'auth/email-already-in-use': { type: 'auth', message: 'Email is already in use' },
  'auth/weak-password': { type: 'auth', message: 'Password is too weak' },
  'auth/invalid-email': { type: 'auth', message: 'Invalid email address' },
  'auth/operation-not-allowed': { type: 'auth', message: 'Operation not allowed' },
  'auth/popup-closed-by-user': { type: 'auth', message: 'Authentication popup was closed' },
  
  // Database errors
  'permission-denied': { type: 'database', message: 'You don\'t have permission to perform this action' },
  'not-found': { type: 'database', message: 'The requested resource was not found' },
  'already-exists': { type: 'database', message: 'The resource already exists' },
  
  // Prescription errors
  'prescription/invalid-dosage': { type: 'prescription', message: 'Invalid medication dosage' },
  'prescription/invalid-tier': { type: 'prescription', message: 'Invalid medication tier' },
  'prescription/invalid-dates': { type: 'prescription', message: 'Invalid prescription dates' },
  'prescription/invalid-price': { type: 'prescription', message: 'Invalid prescription price' },
  
  // Patient errors
  'patient/invalid-data': { type: 'patient', message: 'Invalid patient data' },
  'patient/duplicate-record': { type: 'patient', message: 'Patient record already exists' },
  'patient/missing-required-fields': { type: 'patient', message: 'Required patient fields are missing' }
};

export const createError = (error: any, context?: Record<string, any>): AppError => {
  // Handle Firebase errors
  if (error?.code && errorCodes[error.code]) {
    const errorInfo = errorCodes[error.code] || {
      type: 'unknown',
      message: 'An unexpected error occurred'
    };

    return {
      type: errorInfo.type,
      code: error.code,
      message: errorInfo.message,
      originalError: error,
      timestamp: new Date().toISOString(),
      context
    };
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return {
      type: 'validation',
      code: 'validation-error',
      message: error.message,
      originalError: error,
      timestamp: new Date().toISOString(),
      context
    };
  }

  // Handle network errors
  if (error.name === 'NetworkError' || error instanceof TypeError) {
    return {
      type: 'network',
      code: 'network-error',
      message: 'Network connection error. Please check your internet connection.',
      originalError: error,
      timestamp: new Date().toISOString(),
      context
    };
  }

  // Handle generic errors
  return {
    type: 'unknown',
    code: 'unknown-error',
    message: error.message || 'An unexpected error occurred',
    originalError: error,
    timestamp: new Date().toISOString(),
    context
  };
};

export const logError = (error: AppError): void => {
  console.error('Error:', {
    type: error.type,
    code: error.code,
    message: error.message,
    timestamp: error.timestamp,
    context: error.context,
    originalError: error.originalError
  });

  // Here you could add additional error logging:
  // - Send to error monitoring service (e.g., Sentry)
  // - Log to analytics
  // - Send to server-side logging
};

export const handleError = (error: any, context?: Record<string, any>): AppError => {
  const appError = createError(error, context);
  logError(appError);

  // Add error reporting to monitoring service
  if (process.env.NODE_ENV === 'production') {
    console.error('Production Error:', {
      type: appError.type,
      code: appError.code,
      message: appError.message,
      timestamp: appError.timestamp,
      context: appError.context
    });
  }

  return appError;
};

export const isErrorType = (error: AppError, type: ErrorType): boolean => {
  return error.type === type;
};

export const getErrorMessage = (code: string): string => {
  return errorCodes[code]?.message || 'An unexpected error occurred';
};