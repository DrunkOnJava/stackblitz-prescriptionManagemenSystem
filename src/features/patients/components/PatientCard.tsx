import React from 'react';
import { Patient } from '../../../types';
import { User, Phone, Mail, Calendar } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
}

export default function PatientCard({ patient, onEdit, onDelete, onClick }: PatientCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
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
              onEdit();
            }}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
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
        {patient.dateOfBirth && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {patient.dateOfBirth}
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {patient.prescriptions?.length || 0} Active Prescriptions
        </span>
      </div>
    </div>
  );
}