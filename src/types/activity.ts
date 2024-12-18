export type ActivityType = 
  | 'patient_created'
  | 'patient_updated'
  | 'patient_deleted'
  | 'prescription_created'
  | 'prescription_updated'
  | 'prescription_deleted'
  | 'refill_requested'
  | 'refill_approved'
  | 'refill_denied'
  | 'dosage_changed'
  | 'price_changed';

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  patientId: string;
  patientName: string;
  performedBy: string;
  timestamp: string;
  metadata?: {
    prescriptionId?: string;
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
    reason?: string;
  };
}

export interface ActivityFilters {
  type?: ActivityType[];
  patientId?: string;
  startDate?: string;
  endDate?: string;
  performedBy?: string;
}