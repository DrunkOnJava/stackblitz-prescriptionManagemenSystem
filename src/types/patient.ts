export interface Patient {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  prescriptions: PatientPrescription[];
  status: 'active' | 'inactive' | 'pending';
  contactInfo: string;
  notes?: string;
}

export interface PatientPrescription {
  id: string;
  product: 'Semaglutide' | 'Tirzepatide' | 'Retatrutide';
  weeklyDosage: string;
  monthlyDosage: string;
  weeklyVolume: string;
  monthlyVolume: string;
  tier: string;
  price: string;
  contactInfo: string;
  refillDue: string;
  lastFillDate: string;
  daysUntilFill: number;
  status: 'active' | 'pending' | 'completed';
  nextMonthDosage?: string;
  newPrice?: string;
  volume?: string;
}

export interface PrescriptionStats {
  totalPatients: number;
  activePrescriptions: number;
  pendingRefills: number;
  monthlyRevenue: number;
}