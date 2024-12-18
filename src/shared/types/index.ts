// Common types used across features
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export * from './auth';
export * from './patient';
export * from './prescription';
export * from './activity';