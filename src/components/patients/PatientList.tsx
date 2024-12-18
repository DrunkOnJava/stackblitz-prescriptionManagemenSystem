import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../../types';
import { User, Phone, Mail, Calendar } from 'lucide-react';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorAlert from '../shared/ErrorAlert';

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export default function PatientList({ 
  patients = [], 
  loading, 
  error,
  onEdit, 
  onDelete 
}: PatientListProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phoneNumber?.includes(searchTerm)
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!patients.length) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No patients</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding a new patient.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">ID: {patient.id}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(patient);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(patient.id);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {patient.email && (
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {patient.email}
                </div>
              )}
              {patient.phoneNumber && (
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {patient.phoneNumber}
                </div>
              )}
            </div>

            <div className="mt-4">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${patient.status === 'active' ? 'bg-green-100 text-green-800' :
                  patient.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                {patient.status}
              </span>
              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {patient.prescriptions?.length || 0} Prescriptions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}