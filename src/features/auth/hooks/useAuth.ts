import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, SignUpData, AuthUser } from '../types';
import { loginWithEmail, signUpWithEmail, loginWithGoogle, logout } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthError = useCallback((error: any) => {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/invalid-email':
        return 'Invalid email address';
      default:
        return 'An error occurred during authentication';
    }
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginWithEmail(credentials);
      setUser(user);
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError]);

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      setLoading(true);
      setError(null);
      const user = await signUpWithEmail(data);
      setUser(user);
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginWithGoogle();
      setUser(user);
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate, handleAuthError]);

  const signOut = useCallback(async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (err: any) {
      setError(handleAuthError(err));
    }
  }, [navigate, handleAuthError]);

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    setError
  };
}