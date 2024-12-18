import React from 'react';
import { Patient } from '../../../types';
import PatientCard from './PatientCard';

interface PatientGridProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

export default function PatientGrid({ patients, onEdit, onDelete, onSelect }: PatientGridProps) {
  if (!patients.length) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding a new patient.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onEdit={() => onEdit(patient)}
          onDelete={() => onDelete(patient.id)}
          onClick={() => onSelect(patient.id)}
        />
      ))}
    </div>
  );
}