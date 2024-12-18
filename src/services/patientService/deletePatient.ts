import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { handleError } from '../errorService';

export async function deletePatient(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'patients', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw handleError(error, { id });
  }
}