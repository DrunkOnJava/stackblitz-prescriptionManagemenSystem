import { AppError, ErrorType } from '../errorService';

export interface IErrorService {
  createError(error: any, context?: Record<string, any>): AppError;
  logError(error: AppError): void;
  handleError(error: any, context?: Record<string, any>): AppError;
  getErrorMessage(code: string): string;
  isErrorType(error: any, type: ErrorType): boolean;
}