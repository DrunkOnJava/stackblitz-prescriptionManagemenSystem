import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import * as authService from '../services/authService';
import { User } from '../types';
import { validatePassword, validateEmail } from '../utils/auth';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          email: user.email!,
          name: user.displayName || 'User',
          role: 'provider' // Default role
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: any) => {
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
  };

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setError('');
      setLoading(true);
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        setError(emailValidation.error!);
        return;
      }

      await authService.loginWithEmail(email, password);
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setError('');
      setLoading(true);
      
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        setError(emailValidation.error!);
        return;
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setError(passwordValidation.error!);
        return;
      }

      await authService.signUpWithEmail({ email, password, role: 'provider' });
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      await authService.loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signOut = useCallback(async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err: any) {
      setError(handleAuthError(err));
    }
  }, [navigate]);

  return {
    currentUser,
    error,
    loading,
    signOut,
    signIn,
    signUp,
    signInWithGoogle,
    setError
  };
}