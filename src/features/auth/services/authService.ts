import { auth, db } from '../../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { AuthUser, LoginCredentials, SignUpData } from '../types';

export async function loginWithEmail({ email, password }: LoginCredentials) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return createUserProfile(userCredential.user);
}

export async function signUpWithEmail(data: SignUpData) {
  const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
  return createUserProfile({
    ...userCredential.user,
    role: data.role,
    name: data.name
  });
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return createUserProfile(userCredential.user);
}

async function createUserProfile(user: any): Promise<AuthUser> {
  const userProfile: AuthUser = {
    id: user.uid,
    email: user.email,
    role: user.role || 'patient',
    name: user.displayName || user.name
  };

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, userProfile, { merge: true });

  return userProfile;
}

export async function logout() {
  await signOut(auth);
}