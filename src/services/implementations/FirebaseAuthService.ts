import { auth } from '../../config/firebase';
import { User } from '../../types';
import { LoginCredentials, SignUpData } from '../../types/auth';
import { IAuthService } from '../interfaces/IAuthService';
import { handleError } from '../errorService';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as firebaseAuthStateChanged
} from 'firebase/auth';

export class FirebaseAuthService implements IAuthService {
  async loginWithEmail(credentials: LoginCredentials): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      return this.mapFirebaseUser(user);
    } catch (error) {
      throw handleError(error, { email: credentials.email });
    }
  }

  async signUpWithEmail(data: SignUpData): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return this.mapFirebaseUser(user);
    } catch (error) {
      throw handleError(error, { email: data.email });
    }
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      return this.mapFirebaseUser(user);
    } catch (error) {
      throw handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw handleError(error);
    }
  }

  getCurrentUser(): User | null {
    const user = auth.currentUser;
    return user ? this.mapFirebaseUser(user) : null;
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseAuthStateChanged(auth, (user) => {
      callback(user ? this.mapFirebaseUser(user) : null);
    });
  }

  private mapFirebaseUser(firebaseUser: any): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      role: 'provider' // Default role, should be fetched from user profile
    };
  }
}