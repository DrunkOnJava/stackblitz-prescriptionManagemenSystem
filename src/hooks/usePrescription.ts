import { useState, useCallback } from 'react';
import { PatientPrescription } from '../types/patient';
import * as prescriptionService from '../services/prescriptionService/index';
import { useError } from './useError';
import { validatePrescriptionData } from '../utils/prescriptionUtils';

export function usePrescription(patientId?: string) {
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleError, error, clearError } = useError();

  const loadPrescriptions = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      const data = patientId 
        ? await prescriptionService.getPrescriptionsByPatient(patientId)
        : await prescriptionService.getPrescriptions();
      setPrescriptions(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [patientId, handleError, clearError]);

  const updatePrescription = useCallback(async (
    id: string,
    data: Partial<PatientPrescription>
  ) => {
    try {
      setLoading(true);
      clearError();
      
      const validationErrors = validatePrescriptionData(data);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      await prescriptionService.updatePrescription(id, data);
      await loadPrescriptions();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError, loadPrescriptions]);

  const createPrescription = useCallback(async (
    data: Omit<PatientPrescription, 'id'>
  ) => {
    try {
      setLoading(true);
      clearError();
      
      const validationErrors = validatePrescriptionData(data);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      await prescriptionService.createPrescription(data);
      await loadPrescriptions();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError, loadPrescriptions]);

  const deletePrescription = useCallback(async (id: string) => {
    try {
      setLoading(true);
      clearError();
      await prescriptionService.deletePrescription(id);
      await loadPrescriptions();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError, loadPrescriptions]);

  const calculateDosage = useCallback(async (medication: string, tier: number) => {
    try {
      clearError();
      return await prescriptionService.calculateDosage(medication, tier);
    } catch (err) {
      handleError(err);
      return null;
    }
  }, [handleError, clearError]);

  return {
    prescriptions,
    loading,
    error,
    loadPrescriptions,
    updatePrescription,
    createPrescription,
    deletePrescription,
    calculateDosage
  };
}