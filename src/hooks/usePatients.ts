import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { Patient } from '../types/patient';
import { 
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  initializePatients 
} from '../services/patientService/index';
import { useError } from './useError';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useError();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
      clearError();
      await initializePatients(); // Initialize with sample data if empty
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const addPatient = useCallback(async (patient: Omit<Patient, 'id'>) => {
    try {
      const newPatient = await createPatient(patient);
      setPatients([...patients, newPatient]);
    } catch (err) {
      handleError(err);
    }
  }, [patients, clearError, handleError]);

  const updatePatientData = useCallback(async (id: string, data: Partial<Patient>) => {
    try {
      clearError();
      await updatePatient(id, data);
      setPatients(patients.map(p => (p.id === id ? { ...p, ...data } : p)));
    } catch (err) {
      handleError(err);
    }
  }, [patients, clearError, handleError]);

  const removePatient = useCallback(async (id: string) => {
    try {
      clearError();
      await deletePatient(id);
      setPatients(patients.filter(p => p.id !== id));
    } catch (err) {
      handleError(err);
    }
  }, [patients, clearError, handleError]);

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient: updatePatientData,
    deletePatient: removePatient,
    refresh: loadPatients
  };
}