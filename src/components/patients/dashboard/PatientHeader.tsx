import React, { useState } from 'react';
import { Patient } from '../../../types';
import { Edit } from 'lucide-react';
import EditPatientForm from './EditPatientForm';

interface PatientHeaderProps {
  patient: Patient;
  onUpdate: (updatedPatient: Partial<Patient>) => Promise<void>;
}

export default function PatientHeader({ patient, onUpdate }: PatientHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-500">Patient ID: {patient.id}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${patient.status === 'active' ? 'bg-green-100 text-green-800' :
              patient.status === 'inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <EditPatientForm
              patient={patient}
              onSubmit={async (data) => {
                await onUpdate(data);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}