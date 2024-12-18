import React, { useState } from 'react';
import { PatientPrescription } from '../../../../types/patient';
import { usePrescriptionForm } from '../../hooks/usePrescriptionForm';
import DosageCalculator from './DosageCalculator';
import ErrorAlert from '../../../../components/shared/ErrorAlert';
import PatientSelect from './PatientSelect';
import MedicationSelect from './MedicationSelect';
import DateFields from './DateFields';
import DosageInstructions from './DosageInstructions';
import SuccessModal from './SuccessModal';

interface PrescriptionFormProps {
  prescription?: PatientPrescription;
  onSubmit: (data: Partial<PatientPrescription>) => Promise<void>;
  onCancel: () => void;
}

export default function PrescriptionForm({ prescription, onSubmit, onCancel }: PrescriptionFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    formData,
    loading,
    error,
    handleSubmit,
    handleChange,
  } = usePrescriptionForm({
    initialData: prescription,
    onSubmit: async (data) => {
      await onSubmit(data);
      setShowSuccess(true);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorAlert error={error} />}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {prescription ? 'Edit Prescription' : 'New Prescription'}
        </h2>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {prescription ? 'Edit Prescription' : 'New Prescription'}
        </h2>
      </div>

      <div className="space-y-6">
        <PatientSelect 
          onSelect={(patient) => {
            handleChange('clientName', patient.name);
            handleChange('patientId', patient.id);
            handleChange('contactInfo', patient.contactInfo);
            // Show patient info after selection
            setSelectedPatient(patient);
          }} 
          selectedPatient={selectedPatient}
        />

        {selectedPatient && (
          <PatientInfo patient={selectedPatient} />
        )}

        <MedicationSelect
          value={formData.product}
          onChange={(medication) => handleChange('product', medication)}
          selectedTier={formData.tier}
          onTierChange={(tier) => handleChange('tier', tier)}
        />

        <DateFields
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={(date) => handleChange('startDate', date)}
          onEndDateChange={(date) => handleChange('endDate', date)}
        />

        <DosageInstructions
          value={formData.instructions || ''}
          onChange={(value) => handleChange('instructions', value)}
          refills={parseInt(formData.refills || '0')}
          onRefillsChange={(value) => handleChange('refills', value.toString())}
        />

        <PharmacySelect
          selectedPharmacyId={formData.pharmacyId || ''}
          onSelect={(id) => handleChange('pharmacyId', id)}
        />
      </div>

      {formData.product && formData.tier && (
        <DosageCalculator
          medication={formData.product}
          tier={formData.tier}
          onCalculated={(dosageData) => {
            handleChange('weeklyDosage', dosageData.weeklyDosage);
            handleChange('monthlyDosage', dosageData.monthlyDosage);
            handleChange('weeklyVolume', dosageData.weeklyVolume);
            handleChange('monthlyVolume', dosageData.monthlyVolume);
            handleChange('price', dosageData.cost.toString());
          }}
        />
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : prescription ? 'Update Prescription' : 'Create Prescription'}
        </button>
      </div>

      {showSuccess && (
        <SuccessModal onClose={() => {
          setShowSuccess(false);
          onCancel();
        }} />
      )}
    </form>
  );
}