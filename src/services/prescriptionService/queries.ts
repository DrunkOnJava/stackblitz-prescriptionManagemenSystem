import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { PatientPrescription } from '../../types/patient';
import { handleError } from '../errorService';
import { COLLECTIONS } from '../constants';
import { COLLECTIONS } from '../constants';
import { DiagnosticService } from '../diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export async function getPrescriptions(): Promise<PatientPrescription[]> {
  try {
    diagnosticService.startCheckpoint('getPrescriptions');

    // Validate auth
    if (!auth.currentUser) {
      throw new Error('Authentication required');
    }

    // Create collection reference with explicit path
    const prescriptionsRef = collection(db, COLLECTIONS.PRESCRIPTIONS);
    
    // Build query with proper compound index
    const q = query(
      prescriptionsRef,
      where('providerId', '==', auth.currentUser?.uid || ''),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date().toISOString()
    })) as PatientPrescription[];
  } catch (error) {
    diagnosticService.trackError({
      type: 'prescription',
      code: 'query-error',
      message: 'Failed to fetch prescriptions',
      timestamp: new Date().toISOString(),
      context: { userId: auth.currentUser?.uid }
    });
    throw handleError(error);
  } finally {
    diagnosticService.endCheckpoint('getPrescriptions');
  }
}

export async function getPrescriptionsByPatient(patientId: string): Promise<PatientPrescription[]> {
  try {
    diagnosticService.startCheckpoint('getPrescriptionsByPatient');

    if (!patientId) {
      throw new Error('Patient ID is required');
    }

    const prescriptionsRef = collection(db, COLLECTIONS.PRESCRIPTIONS);
    const q = query(
      prescriptionsRef,
      where('patientId', '==', patientId),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PatientPrescription[];
  } catch (error) {
    diagnosticService.trackError({
      type: 'prescription',
      code: 'query-error',
      message: 'Failed to fetch patient prescriptions',
      timestamp: new Date().toISOString(),
      context: { patientId }
    });
    throw handleError(error);
  } finally {
    diagnosticService.endCheckpoint('getPrescriptionsByPatient');
  }
}

export async function getPrescriptionStats() {
  try {
    diagnosticService.startCheckpoint('getPrescriptionStats');

    const prescriptionsRef = collection(db, COLLECTIONS.PRESCRIPTIONS);
    const querySnapshot = await getDocs(prescriptionsRef);
    
    const prescriptions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PatientPrescription[];

    const activeCount = prescriptions.filter(p => p.status === 'active').length;
    const pendingRefills = prescriptions.filter(p => {
      const daysUntilFill = typeof p.daysUntilFill === 'number' ? p.daysUntilFill : 0;
      return daysUntilFill <= 7 && daysUntilFill > 0;
    }).length;

    const monthlyRevenue = prescriptions.reduce((sum, p) => {
      if (p.status !== 'active') return sum;
      const price = typeof p.price === 'string' ? parseFloat(p.price) || 0 : 0;
      return sum + price;
    }, 0);

    return {
      totalPrescriptions: querySnapshot.size,
      activePrescriptions: activeCount,
      pendingRefills,
      monthlyRevenue
    };
  } catch (error) {
    diagnosticService.trackError({
      type: 'prescription',
      code: 'stats-error',
      message: 'Failed to calculate prescription stats',
      timestamp: new Date().toISOString()
    });
    throw handleError(error);
  } finally {
    diagnosticService.endCheckpoint('getPrescriptionStats');
  }
}