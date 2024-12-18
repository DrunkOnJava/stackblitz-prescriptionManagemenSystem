import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { PatientPrescription } from '../types/patient';
import { MEDICATIONS } from '../types/medications';
import { handleError } from './errorService';
import { logActivity } from './activityService';

class PrescriptionService {
  private static readonly COLLECTION = 'prescriptions';

  static async calculateDosage(medication: string, tier: number) {
    try {
      const med = MEDICATIONS[medication.toLowerCase()];
      if (!med || !med.tiers[tier]) {
        throw new Error('Invalid medication or tier');
      }

      const tierData = med.tiers[tier];
      return {
        weeklyDosage: `${tierData.dosageMg}mg`,
        monthlyDosage: `${tierData.dosageMg * 4}mg`,
        weeklyVolume: `${tierData.dosageMl}ml`,
        monthlyVolume: `${tierData.dosageMl * 4}ml`,
        cost: tierData.monthlyCost
      };
    } catch (error) {
      throw handleError(error, { medication, tier });
    }
  }

  static async getPrescriptions() {
    try {
      const querySnapshot = await getDocs(collection(db, this.COLLECTION));
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as PatientPrescription[];
    } catch (error) {
      throw handleError(error);
    }
  }

  static async getPrescriptionsByPatient(patientId: string) {
    try {
      const q = query(
        collection(db, this.COLLECTION), 
        where('patientId', '==', patientId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as PatientPrescription[];
    } catch (error) {
      throw handleError(error, { patientId });
    }
  }

  static async updatePrescription(id: string, data: Partial<PatientPrescription>) {
    try {
      const docRef = doc(db, this.COLLECTION, id);
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
    } catch (error) {
      throw handleError(error, { id, data });
    }
  }

  static async createPrescription(data: Omit<PatientPrescription, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, this.COLLECTION), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      await logActivity({
        type: 'prescription_created',
        description: 'New prescription created',
        patientId: data.patientId || '',
        patientName: 'Unknown', // Should be fetched from patient data
        performedBy: 'System', // Should be current user
        timestamp: new Date().toISOString(),
        metadata: {
          prescriptionId: docRef.id
        }
      });

      return { id: docRef.id, ...data };
    } catch (error) {
      throw handleError(error, { data });
    }
  }

  static async deletePrescription(id: string) {
    try {
      const docRef = doc(db, this.COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      throw handleError(error, { id });
    }
  }
}

export const {
  calculateDosage,
  getPrescriptions,
  getPrescriptionsByPatient,
  updatePrescription,
  createPrescription,
  deletePrescription
} = PrescriptionService;