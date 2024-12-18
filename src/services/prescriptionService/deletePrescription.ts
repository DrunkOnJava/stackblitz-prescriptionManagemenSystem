import { COLLECTIONS } from '../constants';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { handleError } from '../errorService';
import { DiagnosticService } from '../diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export async function deletePrescription(id: string): Promise<void> {
  try {
    diagnosticService.startCheckpoint('deletePrescription');

    if (!id) throw new Error('Prescription ID is required');
    
    const docRef = doc(db, COLLECTIONS.PRESCRIPTIONS, id);
    await deleteDoc(docRef);

    diagnosticService.endCheckpoint('deletePrescription');
  } catch (error) {
    diagnosticService.endCheckpoint('deletePrescription');
    throw handleError(error, { id });
  }
}