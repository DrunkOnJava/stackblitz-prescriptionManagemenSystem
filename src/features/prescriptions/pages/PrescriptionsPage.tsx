import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PrescriptionList from '../components/PrescriptionList';
import PrescriptionForm from '../components/PrescriptionForm';
import MedicationComparison from '../components/MedicationComparison';

export default function PrescriptionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowComparison(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Compare Medications
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Prescription
          </button>
        </div>
      </div>

      {showComparison && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <MedicationComparison onClose={() => setShowComparison(false)} />
          </div>
        </div>
      )}

      {showForm ? (
        <div className="bg-white shadow rounded-lg p-6">
          <PrescriptionForm onCancel={() => setShowForm(false)} />
        </div>
      ) : (
        <PrescriptionList />
      )}
    </div>
  );
}