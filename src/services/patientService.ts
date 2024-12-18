import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Patient } from '../types';
import { initialPatients } from '../data/initialPatients';
import { handleError } from './errorService';

export async function getPatients(): Promise<Patient[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'patients'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Patient));
  } catch (error) {
    console.error('Error getting patients:', error);
    throw handleError(error);
  }
}

export async function initializePatients(): Promise<void> {
  try {
    const patientsRef = collection(db, 'patients');
    const snapshot = await getDocs(patientsRef);
    
    if (snapshot.empty) {
      console.log('Initializing patient data...');
      const batch = writeBatch(db);
      
      for (const patient of initialPatients) {
        const docRef = doc(patientsRef, patient.id);
        batch.set(docRef, {
          ...patient,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      await batch.commit();
      console.log('Initial patient data loaded successfully');
    }
  } catch (error) {
    console.error('Error initializing patients:', error);
    throw handleError(error);
  }
}

export async function getPatient(id: string): Promise<Patient | null> {
  try {
    const docRef = doc(db, 'patients', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Patient;
  } catch (error) {
    console.error('Error getting patient:', error);
    throw handleError(error);
  }
}

export async function updatePatient(id: string, data: Partial<Patient>): Promise<void> {
  try {
    const docRef = doc(db, 'patients', id);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating patient:', error);
    throw handleError(error);
  }
}

export async function deletePatient(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'patients', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw handleError(error);
  }
}