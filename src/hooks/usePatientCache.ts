import { useCallback } from 'react';
import { useCache } from './useCache';
import { Patient } from '../types/patient';

export function usePatientCache() {
  const { get, set, invalidate } = useCache<Patient>({
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100
  });

  const getPatientKey = useCallback((id: string) => `patient:${id}`, []);

  const getCachedPatient = useCallback((id: string) => {
    return get(getPatientKey(id));
  }, [get, getPatientKey]);

  const setCachedPatient = useCallback((id: string, patient: Patient) => {
    set(getPatientKey(id), patient);
  }, [set, getPatientKey]);

  const invalidatePatientCache = useCallback((id: string) => {
    invalidate(getPatientKey(id));
  }, [invalidate, getPatientKey]);

  return {
    getCachedPatient,
    setCachedPatient,
    invalidatePatientCache
  };
}