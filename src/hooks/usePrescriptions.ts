import { useState, useEffect, useCallback } from 'react';
import { PatientPrescription } from '../types/patient';
import * as prescriptionService from '../services/prescriptionService';
import { useAuth } from './useAuth';

export function usePrescriptions() {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrescriptions = useCallback(async () => {
    if (!currentUser) {
      setError('Authentication required');
      console.debug('No current user, skipping prescription load');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.debug('Loading prescriptions for user:', currentUser.id);
      console.debug('Loading prescriptions for user:', currentUser.id);
      const data = await prescriptionService.getPrescriptions();
      console.debug('Loaded prescriptions:', data.length);
      console.debug('Loaded prescriptions:', data.length);
      setPrescriptions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load prescriptions';
      setError(errorMessage);
      console.error('Error loading prescriptions:', err);
      console.error('Error loading prescriptions:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadPrescriptions();
  }, [loadPrescriptions, currentUser?.id]);

  const updatePrescription = useCallback(async (id: string, data: Partial<PatientPrescription>) => {
    try {
      await prescriptionService.updatePrescription(id, data);
      await loadPrescriptions(); // Refresh list after update
    } catch (err) {
      console.error('Error updating prescription:', err);
      throw err;
    }
  }, [loadPrescriptions]);

  const deletePrescription = useCallback(async (id: string) => {
    try {
      await prescriptionService.deletePrescription(id);
      await loadPrescriptions(); // Refresh list after delete
    } catch (err) {
      console.error('Error deleting prescription:', err);
      throw err;
    }
  }, [loadPrescriptions]);

  const createPrescription = useCallback(async (data: Omit<PatientPrescription, 'id'>) => {
    try {
      await prescriptionService.createPrescription(data);
      await loadPrescriptions(); // Refresh list after create
    } catch (err) {
      console.error('Error creating prescription:', err);
      throw err;
    }
  }, [loadPrescriptions]);

  return {
    prescriptions,
    loading,
    error,
    refresh: loadPrescriptions,
    updatePrescription,
    deletePrescription,
    createPrescription
  };
}