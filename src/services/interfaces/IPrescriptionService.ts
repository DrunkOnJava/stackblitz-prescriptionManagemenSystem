import { PatientPrescription } from '../../types/patient';

export interface IPrescriptionService {
  getPrescriptions(): Promise<PatientPrescription[]>;
  getPrescriptionsByPatient(patientId: string): Promise<PatientPrescription[]>;
  createPrescription(data: Omit<PatientPrescription, 'id'>): Promise<PatientPrescription>;
  updatePrescription(id: string, data: Partial<PatientPrescription>): Promise<void>;
  deletePrescription(id: string): Promise<void>;
  calculateDosage(medication: string, tier: number): Promise<{
    weeklyDosage: string;
    monthlyDosage: string;
    weeklyVolume: string;
    monthlyVolume: string;
    cost: number;
  }>;
}