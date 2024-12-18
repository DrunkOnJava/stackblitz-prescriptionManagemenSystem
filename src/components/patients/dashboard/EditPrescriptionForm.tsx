import React, { useState } from 'react';
import { PatientPrescription } from '../../../types/patient';
import { MEDICATIONS } from '../../../types/medications';
import { X } from 'lucide-react';

interface EditPrescriptionFormProps {
  prescription: PatientPrescription;
  onSubmit: (data: Partial<PatientPrescription>) => Promise<void>;
  onCancel: () => void;
}

export default function EditPrescriptionForm({ prescription, onSubmit, onCancel }: EditPrescriptionFormProps) {
  // Extract numeric values from strings, defaulting to 0 if invalid
  const extractNumericValue = (value: string | undefined) => {
    if (!value) return '0';
    const numeric = value.replace(/[^0-9.]/g, '');
    return numeric || '0';
  };

  // Initialize form data with proper type checking
  const [formData, setFormData] = useState({
    product: prescription.product || 'Semaglutide',
    weeklyDosage: extractNumericValue(prescription.weeklyDosage),
    weeklyVolume: extractNumericValue(prescription.weeklyVolume),
    tier: (prescription.tier?.replace('Tier ', '') || '1'),
    price: extractNumericValue(prescription.price),
    status: prescription.status || 'active',
    refillDue: prescription.refillDue || '',
    lastFillDate: prescription.lastFillDate || ''
  });

  const selectedMedication = MEDICATIONS[formData.product.toLowerCase()];
  const selectedTier = selectedMedication?.tiers[parseInt(formData.tier)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct updated prescription with proper formatting
    const updatedPrescription: Partial<PatientPrescription> = {
      product: formData.product,
      weeklyDosage: `${formData.weeklyDosage}mg`,
      weeklyVolume: `${formData.weeklyVolume}ml`,
      monthlyDosage: `${(parseFloat(formData.weeklyDosage) * 4).toFixed(2)}mg`,
      monthlyVolume: `${(parseFloat(formData.weeklyVolume) * 4).toFixed(2)}ml`,
      tier: `Tier ${formData.tier}`,
      price: formData.price,
      status: formData.status as PatientPrescription['status'],
      refillDue: formData.refillDue,
      lastFillDate: formData.lastFillDate,
      // Calculate days until fill
      daysUntilFill: formData.refillDue ? 
        Math.ceil((new Date(formData.refillDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
        prescription.daysUntilFill
    };

    await onSubmit(updatedPrescription);
  };

  const handleTierChange = (tier: string) => {
    const numericTier = parseInt(tier);
    const medication = MEDICATIONS[formData.product.toLowerCase()];
    const tierData = medication.tiers[numericTier];

    setFormData({
      ...formData,
      tier,
      weeklyDosage: tierData.dosageMg.toString(),
      weeklyVolume: tierData.dosageMl.toString(),
      price: tierData.monthlyCost.toString()
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Prescription</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
            Medication
          </label>
          <select
            id="medication"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.values(MEDICATIONS).map((medication) => (
              <option key={medication.name} value={medication.name}>
                {medication.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tier" className="block text-sm font-medium text-gray-700">
            Tier Level
          </label>
          <select
            id="tier"
            value={formData.tier}
            onChange={(e) => handleTierChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map((tier) => (
              <option key={tier} value={tier}>
                Tier {tier}
              </option>
            ))}
          </select>
        </div>

        {selectedTier && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tier Details</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Weekly Dosage</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedTier.dosageMg} mg</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Weekly Volume</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedTier.dosageMl} ml</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Monthly Cost</dt>
                <dd className="mt-1 text-sm text-gray-900">${selectedTier.monthlyCost}</dd>
              </div>
            </dl>
          </div>
        )}

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Monthly Cost ($)
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="lastFillDate" className="block text-sm font-medium text-gray-700">
              Last Fill Date
            </label>
            <input
              type="date"
              id="lastFillDate"
              value={formData.lastFillDate}
              onChange={(e) => setFormData({ ...formData, lastFillDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="refillDue" className="block text-sm font-medium text-gray-700">
              Next Refill Date
            </label>
            <input
              type="date"
              id="refillDue"
              value={formData.refillDue}
              onChange={(e) => setFormData({ ...formData, refillDue: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientPrescription['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}