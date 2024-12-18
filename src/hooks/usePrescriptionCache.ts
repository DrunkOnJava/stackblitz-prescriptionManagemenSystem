import { useCallback } from 'react';
import { useCache } from './useCache';
import { PatientPrescription } from '../types/patient';
import { MEDICATIONS } from '../types/medications';

export function usePrescriptionCache() {
  const { get, set, invalidate } = useCache<PatientPrescription[]>({
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100
  });

  const calculateDosageKey = useCallback((medication: string, tier: number) => {
    return `dosage:${medication.toLowerCase()}:${tier}`;
  }, []);

  const getCachedDosage = useCallback((medication: string, tier: number) => {
    return get(calculateDosageKey(medication, tier));
  }, [get, calculateDosageKey]);

  const setCachedDosage = useCallback((medication: string, tier: number, data: any) => {
    set(calculateDosageKey(medication, tier), data);
  }, [set, calculateDosageKey]);

  const invalidateDosageCache = useCallback((medication: string, tier: number) => {
    invalidate(calculateDosageKey(medication, tier));
  }, [invalidate, calculateDosageKey]);

  const calculateDosage = useCallback((medication: string, tier: number) => {
    const cached = getCachedDosage(medication, tier);
    if (cached) return cached;

    const med = MEDICATIONS[medication.toLowerCase()];
    if (!med || !med.tiers[tier]) {
      throw new Error('Invalid medication or tier');
    }

    const tierData = med.tiers[tier];
    const result = {
      weeklyDosage: `${tierData.dosageMg}mg`,
      monthlyDosage: `${tierData.dosageMg * 4}mg`,
      weeklyVolume: `${tierData.dosageMl}ml`,
      monthlyVolume: `${tierData.dosageMl * 4}ml`,
      cost: tierData.monthlyCost
    };

    setCachedDosage(medication, tier, result);
    return result;
  }, [getCachedDosage, setCachedDosage]);

  return {
    calculateDosage,
    invalidateDosageCache
  };
}