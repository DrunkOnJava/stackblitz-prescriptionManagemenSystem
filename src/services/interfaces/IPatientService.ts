import { Patient } from '../../types';

export interface IPatientService {
  getPatients(): Promise<Patient[]>;
  getPatient(id: string): Promise<Patient | null>;
  createPatient(data: Omit<Patient, 'id'>): Promise<Patient>;
  updatePatient(id: string, data: Partial<Patient>): Promise<void>;
  deletePatient(id: string): Promise<void>;
  getPatientsStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
  }>;
}