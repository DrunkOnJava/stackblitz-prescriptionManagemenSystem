import { collection, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { initialPatients } from '../data/initialPatients';
import { COLLECTIONS } from './constants';
import { DiagnosticService } from './diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export async function initializeFirestore() {
  try {
    diagnosticService.startCheckpoint('initializeFirestore');
    
    // Wait for auth to initialize
    await new Promise<void>((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        unsubscribe();
        resolve();
      });
    });

    // Validate database connection
    if (!db) {
      throw new Error('Firebase database not initialized');
    }

    // Check if data already exists
    const patientsRef = collection(db, COLLECTIONS.PATIENTS);
    const patientsSnap = await getDocs(patientsRef);

    if (patientsSnap.empty) {
      console.log('Initializing patient data...');

      // Use batch write for atomic operations
      const batch = writeBatch(db);

      // Add each patient
      for (const patient of initialPatients) {
        const patientRef = doc(patientsRef, patient.id);
        const patientData = {
          providerId: auth.currentUser?.uid,
          ...patient,
          prescriptions: [], // Store prescriptions in a subcollection instead
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        batch.set(patientRef, patientData);

        // Create prescriptions subcollection for each patient
        if (patient.prescriptions && patient.prescriptions.length > 0) {
          for (const prescription of patient.prescriptions || []) {
            const prescriptionRef = doc(collection(db, `patients/${patient.id}/prescriptions`), prescription.id);
            const prescriptionData = {
              providerId: auth.currentUser?.uid,
              ...prescription,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            batch.set(prescriptionRef, prescriptionData);
          }
        }
      }

      // Commit the batch
      await batch.commit();
      console.log('Initial data loaded successfully');
      diagnosticService.endCheckpoint('initializeFirestore');
    }
  } catch (error) {
    diagnosticService.endCheckpoint('initializeFirestore');
    diagnosticService.trackError(error);
    console.error('Error initializing Firestore:', error);
    throw error;
  }
}