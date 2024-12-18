import { PatientPrescription } from '../types/patient';

export function formatCurrency(amount: string | number | undefined): string {
  if (amount === undefined || amount === null) return 'N/A';
  
  if (typeof amount === 'string') {
    if (amount.toLowerCase() === 'free' || amount === '0' || amount === '0.00') {
      return 'Free';
    }
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ''));
    return isNaN(numericAmount) ? 'N/A' : `$${numericAmount.toFixed(2)}`;
  }
  
  return amount === 0 ? 'Free' : `$${amount.toFixed(2)}`;
}

export function calculateDaysUntilFill(refillDue: string): number {
  if (!refillDue) return 0;
  const today = new Date();
  const refillDate = new Date(refillDue);
  const diffTime = refillDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getRefillStatus(daysUntilFill: number | undefined): {
  status: 'overdue' | 'due-soon' | 'upcoming' | 'ok';
  color: string;
} {
  if (daysUntilFill === undefined || daysUntilFill === null) {
    return { status: 'ok', color: 'text-gray-600' };
  }

  if (daysUntilFill < 0) {
    return { status: 'overdue', color: 'text-red-600' };
  }
  
  if (daysUntilFill <= 3) {
    return { status: 'due-soon', color: 'text-yellow-600' };
  }
  
  if (daysUntilFill <= 7) {
    return { status: 'upcoming', color: 'text-blue-600' };
  }
  
  return { status: 'ok', color: 'text-green-600' };
}

export function validatePrescriptionData(data: Partial<PatientPrescription>): string[] {
  const errors: string[] = [];

  if (!data.product) {
    errors.push('Medication type is required');
  }

  if (!data.weeklyDosage) {
    errors.push('Weekly dosage is required');
  }

  if (!data.tier) {
    errors.push('Tier level is required');
  }

  if (!data.price) {
    errors.push('Price is required');
  }

  return errors;
}