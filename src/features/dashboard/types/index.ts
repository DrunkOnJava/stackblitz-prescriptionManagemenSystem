export interface DashboardStats {
  totalPatients: number;
  activePrescriptions: number;
  pendingRefills: number;
  monthlyRevenue: number;
}

export interface Activity {
  id: string;
  type: 'prescription_created' | 'prescription_updated' | 'patient_created' | 'patient_updated' | 'refill_requested' | 'refill_approved';
  description: string;
  patientId: string;
  patientName: string;
  performedBy: string;
  timestamp: string;
  metadata?: Record<string, any>;
}