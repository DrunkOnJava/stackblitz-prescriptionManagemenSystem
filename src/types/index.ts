export interface User {
  id: string;
  name: string;
  email: string;
  role: 'provider' | 'patient';
}

export interface Prescription {
  id: string;
  patientId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  cost: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  prescriptions: Prescription[];
}