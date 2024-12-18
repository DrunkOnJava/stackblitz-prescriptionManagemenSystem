import { COLLECTIONS } from '../constants';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { PatientPrescription } from '../../types/patient';
import { handleError, createError } from '../errorService';
import { logActivity } from '../activityService';
import { DiagnosticService } from '../diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export async function createPrescription(data: Omit<PatientPrescription, 'id'>): Promise<PatientPrescription> {
  try {
    diagnosticService.startCheckpoint('createPrescription');

    // Validate auth and data
    if (!auth.currentUser) {
      throw createError({ code: 'auth/not-authenticated', message: 'User must be authenticated' });
    }
    if (!data.patientId) {
      throw createError({ code: 'validation/missing-patient', message: 'Patient ID is required' });
    }

    // Create prescription with provider ID
    const prescriptionData = {
      ...data,
      providerId: auth.currentUser.uid,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.PRESCRIPTIONS), prescriptionData);

    // Log activity
    await logActivity({
      type: 'prescription_created',
      description: 'New prescription created',
      patientId: data.patientId,
      patientName: data.clientName || 'Unknown',
      performedBy: auth.currentUser.email || 'Unknown',
      timestamp: new Date().toISOString(),
      metadata: {
        prescriptionId: docRef.id,
        medication: data.product,
        tier: data.tier
      }
    });

    diagnosticService.endCheckpoint('createPrescription');
    return { id: docRef.id, ...prescriptionData };
  } catch (error) {
    diagnosticService.endCheckpoint('createPrescription');
    throw handleError(error, { data });
  }
}