export interface AuthUser {
  id: string;
  email: string;
  role: 'provider' | 'patient';
  name?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends LoginCredentials {
  name: string;
  role: 'provider' | 'patient';
}