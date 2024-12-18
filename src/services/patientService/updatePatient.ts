import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Patient } from '../../types';
import { handleError } from '../errorService';

export async function updatePatient(id: string, data: Partial<Patient>): Promise<void> {
  try {
    const docRef = doc(db, 'patients', id);
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    throw handleError(error, { id, data });
  }
}