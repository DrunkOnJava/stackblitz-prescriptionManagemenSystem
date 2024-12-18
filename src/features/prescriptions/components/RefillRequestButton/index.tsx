import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import RefillRequestForm from '../PrescriptionForm/RefillRequestForm';
import { useRefillRequests } from '../../hooks/useRefillRequests';
import { PatientPrescription } from '../../../../types/patient';

interface RefillRequestButtonProps {
  prescriptions: PatientPrescription[];
  patientId: string;
  patientName: string;
}

export default function RefillRequestButton({ prescriptions, patientId, patientName }: RefillRequestButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const { submitRefillRequest } = useRefillRequests();

  const handleSubmit = async (selectedPrescriptions: string[], notes: string) => {
    try {
      await submitRefillRequest({
        patientId,
        patientName,
        prescriptionIds: selectedPrescriptions,
        notes
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error submitting refill request:', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Request Refill
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="p-6">
              <RefillRequestForm
                prescriptions={prescriptions}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}