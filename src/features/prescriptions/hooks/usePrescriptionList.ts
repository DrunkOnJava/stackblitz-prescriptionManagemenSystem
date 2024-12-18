import { useState, useCallback } from 'react';
import { PatientPrescription } from '../../../types/patient';
import { usePrescriptions } from '../../../hooks/usePrescriptions';
import { DiagnosticService } from '../../../services/diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

export function usePrescriptionList() {
  const { 
    prescriptions, 
    loading, 
    error, 
    updatePrescription, 
    deletePrescription,
    createPrescription 
  } = usePrescriptions();
  
  const [selectedPrescription, setSelectedPrescription] = useState<PatientPrescription | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const handleEdit = useCallback((prescription: PatientPrescription) => {
    diagnosticService.startCheckpoint('prescriptionList:edit');
    setSelectedPrescription(prescription);
    setShowForm(true);
    diagnosticService.endCheckpoint('prescriptionList:edit');
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this prescription?')) return;
    
    diagnosticService.startCheckpoint('prescriptionList:delete');
    try {
      await deletePrescription(id);
    } catch (err) {
      diagnosticService.trackError({
        type: 'prescription',
        code: 'delete-error',
        message: 'Failed to delete prescription',
        timestamp: new Date().toISOString(),
        context: { prescriptionId: id }
      });
      console.error('Error deleting prescription:', err);
    } finally {
      diagnosticService.endCheckpoint('prescriptionList:delete');
    }
  }, [deletePrescription]);

  const handleSubmit = useCallback(async (data: Partial<PatientPrescription>) => {
    diagnosticService.startCheckpoint('prescriptionList:submit');
    try {
      if (selectedPrescription) {
        await updatePrescription(selectedPrescription.id, data);
      } else {
        await createPrescription(data as Omit<PatientPrescription, 'id'>);
      }
      setShowForm(false);
      setSelectedPrescription(null);
    } catch (err) {
      diagnosticService.trackError({
        type: 'prescription',
        code: 'save-error',
        message: 'Failed to save prescription',
        timestamp: new Date().toISOString(),
        context: { prescriptionData: data }
      });
      console.error('Error saving prescription:', err);
      throw err;
    } finally {
      diagnosticService.endCheckpoint('prescriptionList:submit');
    }
  }, [selectedPrescription, updatePrescription, createPrescription]);

  const handleFormClose = useCallback(() => {
    setSelectedPrescription(null);
    setShowForm(false);
  }, []);

  return {
    prescriptions,
    loading,
    error,
    selectedPrescription,
    showForm,
    showComparison,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleFormClose,
    setShowForm,
    setShowComparison
  };
}