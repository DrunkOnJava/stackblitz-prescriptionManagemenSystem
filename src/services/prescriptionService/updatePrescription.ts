import { COLLECTIONS } from '../constants';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { PatientPrescription } from '../../types/patient';
import { handleError } from '../errorService';
import { logActivity } from '../activityService';
import { DiagnosticService } from '../diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export async function updatePrescription(id: string, data: Partial<PatientPrescription>): Promise<void> {
  try {
    diagnosticService.startCheckpoint('updatePrescription');

    if (!id) throw new Error('Prescription ID is required');
    
    const docRef = doc(db, COLLECTIONS.PRESCRIPTIONS, id);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updateData);

    await logActivity({
      type: 'prescription_updated',
      description: 'Prescription updated',
      patientId: data.patientId || '',
      patientName: 'Unknown', // Should be fetched from patient data
      performedBy: 'System', // Should be current user
      timestamp: new Date().toISOString(),
      metadata: {
        prescriptionId: id,
        newValues: data
      }
    });
    diagnosticService.endCheckpoint('updatePrescription');
  } catch (error) {
    diagnosticService.endCheckpoint('updatePrescription');
    throw handleError(error, { id, data });
  }
}