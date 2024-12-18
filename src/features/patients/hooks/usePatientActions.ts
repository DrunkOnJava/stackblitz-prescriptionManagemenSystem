import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../../types';
import { usePatientService } from '../../../services/interfaces';
import { useError } from '../../../hooks/useError';

export function usePatientActions(onSuccess?: () => void) {
  const navigate = useNavigate();
  const patientService = usePatientService();
  const { handleError } = useError();

  const handleEdit = useCallback(async (id: string, data: Partial<Patient>) => {
    try {
      await patientService.updatePatient(id, data);
      onSuccess?.();
    } catch (err) {
      handleError(err);
    }
  }, [patientService, handleError, onSuccess]);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    
    try {
      await patientService.deletePatient(id);
      onSuccess?.();
    } catch (err) {
      handleError(err);
    }
  }, [patientService, handleError, onSuccess]);

  const handleSelect = useCallback((id: string) => {
    navigate(`/patients/${id}`);
  }, [navigate]);

  return {
    handleEdit,
    handleDelete,
    handleSelect
  };
}