import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Patient } from '../../types';
import { handleError } from '../errorService';
import { logActivity } from '../activityService';

export async function createPatient(data: Omit<Patient, 'id'>): Promise<Patient> {
  try {
    const docRef = await addDoc(collection(db, 'patients'), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const newPatient = {
      id: docRef.id,
      ...data
    } as Patient;

    await logActivity({
      type: 'patient_created',
      description: `Created new patient: ${data.name}`,
      patientId: docRef.id,
      patientName: data.name,
      performedBy: 'System',
      timestamp: new Date().toISOString()
    });

    return newPatient;
  } catch (error) {
    throw handleError(error, { data });
  }
}