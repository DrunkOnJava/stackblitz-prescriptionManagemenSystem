import React, { useState } from 'react';
import { PatientPrescription } from '../../../../types/patient';

interface RefillRequestFormProps {
  prescriptions: PatientPrescription[];
  onSubmit: (selectedPrescriptions: string[], notes: string) => void;
  onCancel: () => void;
}

export default function RefillRequestForm({ prescriptions, onSubmit, onCancel }: RefillRequestFormProps) {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedPrescriptions, notes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Request Medication Refill</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select the medications you need refilled
        </p>
      </div>

      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <label key={prescription.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedPrescriptions.includes(prescription.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedPrescriptions([...selectedPrescriptions, prescription.id]);
                } else {
                  setSelectedPrescriptions(selectedPrescriptions.filter(id => id !== prescription.id));
                }
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{prescription.product}</span>
              <span className="text-xs text-gray-500">{prescription.weeklyDosage}/week</span>
            </div>
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={250}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Any special instructions or concerns..."
        />
        <p className="mt-2 text-sm text-gray-500">
          {250 - notes.length} characters remaining
        </p>
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
          disabled={selectedPrescriptions.length === 0}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}