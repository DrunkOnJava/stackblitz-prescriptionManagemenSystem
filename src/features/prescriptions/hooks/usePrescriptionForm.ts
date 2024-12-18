import { useState, useCallback } from 'react';
import { PatientPrescription } from '../../../types/patient';
import { validatePrescriptionData } from '../../../utils/prescriptionUtils';
import { DiagnosticService } from '../../../services/diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

interface UsePrescriptionFormProps {
  initialData?: Partial<PatientPrescription>;
  onSubmit: (data: Partial<PatientPrescription>) => Promise<void>;
}

export function usePrescriptionForm({ initialData, onSubmit }: UsePrescriptionFormProps) {
  const [formData, setFormData] = useState({
    product: initialData?.product || '',
    tier: initialData?.tier?.replace('Tier ', '') || '1',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    instructions: initialData?.instructions || '',
    clientName: initialData?.clientName || '',
    patientId: initialData?.patientId || '',
    price: initialData?.price || '',
    status: initialData?.status || 'active',
    refillDue: initialData?.refillDue || '',
    lastFillDate: initialData?.lastFillDate || '',
    ...initialData
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    diagnosticService.startCheckpoint('prescriptionForm:submit');
    
    try {
      const validationErrors = validatePrescriptionData(formData);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        return;
      }

      setLoading(true);
      setError(null);

      // Validate required fields
      if (!formData.clientName || !formData.patientId) {
        setError('Patient Name and ID are required');
        return;
      }
      
      // Format data for submission
      const prescriptionData = {
        ...formData,
        tier: `Tier ${formData.tier}`,
        status: formData.status || 'active',
        timestamp: new Date().toISOString()
      };

      await onSubmit(prescriptionData);
    } catch (err) {
      diagnosticService.trackError({
        type: 'prescription',
        code: 'form-submission-error',
        message: err instanceof Error ? err.message : 'Failed to save prescription',
        timestamp: new Date().toISOString()
      });
      setError(err instanceof Error ? err.message : 'Failed to save prescription');
    } finally {
      setLoading(false);
      diagnosticService.endCheckpoint('prescriptionForm:submit');
    }
  }, [formData, onSubmit]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    loading,
    error,
    handleSubmit,
    handleChange,
    setError
  };
}