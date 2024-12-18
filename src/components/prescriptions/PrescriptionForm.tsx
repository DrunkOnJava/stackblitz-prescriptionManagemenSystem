import React, { useState, useEffect } from 'react';
import { usePrescription } from '../../hooks/usePrescription';
import { MEDICATIONS } from '../../types/medications';
import { PatientPrescription } from '../../types/patient';
import ErrorAlert from '../shared/ErrorAlert';

interface PrescriptionFormProps {
  patientId?: string;
  initialData?: Partial<PatientPrescription>;
  onSubmit?: (prescription: PatientPrescription) => void;
  onCancel: () => void;
}

export default function PrescriptionForm({ 
  patientId,
  initialData,
  onSubmit,
  onCancel 
}: PrescriptionFormProps) {
  const { createPrescription, calculateDosage, error } = usePrescription(patientId);
  const [formData, setFormData] = useState({
    medicationName: initialData?.product || '',
    tier: initialData?.tier?.replace('Tier ', '') || '1',
    startDate: initialData?.lastFillDate || '',
    duration: '30',
    notes: ''
  });
  const [dosageInfo, setDosageInfo] = useState<any>(null);

  useEffect(() => {
    if (formData.medicationName && formData.tier) {
      calculateDosage(formData.medicationName, parseInt(formData.tier))
        .then(info => setDosageInfo(info));
    }
  }, [formData.medicationName, formData.tier, calculateDosage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dosageInfo) return;

    const prescriptionData = {
      patientId: patientId || '',
      product: formData.medicationName,
      tier: `Tier ${formData.tier}`,
      weeklyDosage: dosageInfo.weeklyDosage,
      monthlyDosage: dosageInfo.monthlyDosage,
      weeklyVolume: dosageInfo.weeklyVolume,
      monthlyVolume: dosageInfo.monthlyVolume,
      price: dosageInfo.cost.toString(),
      lastFillDate: formData.startDate,
      status: 'active' as const,
      notes: formData.notes
    };

    await createPrescription(prescriptionData);
    if (onSubmit) {
      onSubmit(prescriptionData as PatientPrescription);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorAlert error={error} />}
      
      {/* Form fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
            Medication
          </label>
          <select
            id="medication"
            value={formData.medicationName}
            onChange={(e) => setFormData({ ...formData, medicationName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select medication</option>
            {Object.values(MEDICATIONS).map((medication) => (
              <option key={medication.name} value={medication.name}>
                {medication.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add other form fields */}
      </div>

      {/* Dosage information display */}
      {dosageInfo && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Prescription Details</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Weekly Dosage</dt>
              <dd className="mt-1 text-sm text-gray-900">{dosageInfo.weeklyDosage}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Weekly Volume</dt>
              <dd className="mt-1 text-sm text-gray-900">{dosageInfo.weeklyVolume}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Monthly Cost</dt>
              <dd className="mt-1 text-sm text-gray-900">${dosageInfo.cost}</dd>
            </div>
          </dl>
        </div>
      )}

      {/* Form actions */}
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
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Create Prescription
        </button>
      </div>
    </form>
  );
}