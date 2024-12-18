import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  calculateDaysUntilFill, 
  getRefillStatus,
  validatePrescriptionData 
} from '../prescriptionUtils';

describe('formatCurrency', () => {
  it('formats numeric values correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(99.99)).toBe('$99.99');
    expect(formatCurrency(0)).toBe('Free');
  });

  it('handles string values correctly', () => {
    expect(formatCurrency('100')).toBe('$100.00');
    expect(formatCurrency('Free')).toBe('Free');
    expect(formatCurrency('0')).toBe('Free');
  });

  it('handles undefined and invalid values', () => {
    expect(formatCurrency(undefined)).toBe('N/A');
    expect(formatCurrency('invalid')).toBe('N/A');
  });
});

describe('calculateDaysUntilFill', () => {
  it('calculates days correctly', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    expect(calculateDaysUntilFill(tomorrow.toISOString())).toBe(1);
    expect(calculateDaysUntilFill(nextWeek.toISOString())).toBe(7);
  });

  it('returns 0 for invalid dates', () => {
    expect(calculateDaysUntilFill('')).toBe(0);
    expect(calculateDaysUntilFill('invalid-date')).toBe(0);
  });
});

describe('getRefillStatus', () => {
  it('returns correct status for overdue refills', () => {
    const status = getRefillStatus(-1);
    expect(status.status).toBe('overdue');
    expect(status.color).toBe('text-red-600');
  });

  it('returns correct status for upcoming refills', () => {
    const status = getRefillStatus(5);
    expect(status.status).toBe('upcoming');
    expect(status.color).toBe('text-blue-600');
  });

  it('returns correct status for due soon refills', () => {
    const status = getRefillStatus(2);
    expect(status.status).toBe('due-soon');
    expect(status.color).toBe('text-yellow-600');
  });

  it('returns ok status for far future refills', () => {
    const status = getRefillStatus(10);
    expect(status.status).toBe('ok');
    expect(status.color).toBe('text-green-600');
  });

  it('handles undefined values', () => {
    const status = getRefillStatus(undefined);
    expect(status.status).toBe('ok');
    expect(status.color).toBe('text-gray-600');
  });
});

describe('validatePrescriptionData', () => {
  it('validates required fields', () => {
    const errors = validatePrescriptionData({});
    expect(errors).toContain('Medication type is required');
    expect(errors).toContain('Weekly dosage is required');
    expect(errors).toContain('Tier level is required');
    expect(errors).toContain('Price is required');
  });

  it('returns no errors for valid data', () => {
    const validData = {
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      tier: 'Tier 1',
      price: '200.00'
    };
    const errors = validatePrescriptionData(validData);
    expect(errors).toHaveLength(0);
  });
});