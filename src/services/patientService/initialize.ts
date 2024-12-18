import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { initialPatients } from '../../data/initialPatients';
import { handleError } from '../errorService';

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
    throw handleError(error);
  }
}