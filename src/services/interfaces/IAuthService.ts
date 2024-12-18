import { User } from '../../types';
import { LoginCredentials, SignUpData } from '../../types/auth';

export interface IAuthService {
  loginWithEmail(credentials: LoginCredentials): Promise<User>;
  signUpWithEmail(data: SignUpData): Promise<User>;
  loginWithGoogle(): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
}