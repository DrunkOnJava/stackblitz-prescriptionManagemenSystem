import React from 'react';
import { Patient } from '../../../../types';
import { User, Calendar, Phone, Mail, Building } from 'lucide-react';

interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">ID: {patient.id}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          patient.status === 'active' ? 'bg-green-100 text-green-800' : 
          patient.status === 'inactive' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {patient.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>DOB: {patient.dateOfBirth || 'Not provided'}</span>
        </div>
        {patient.phoneNumber && (
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-4 w-4 mr-2" />
            <span>{patient.phoneNumber}</span>
          </div>
        )}
        {patient.email && (
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-2" />
            <span>{patient.email}</span>
          </div>
        )}
        {patient.address && (
          <div className="flex items-center text-sm text-gray-500">
            <Building className="h-4 w-4 mr-2" />
            <span>{patient.address}</span>
          </div>
        )}
      </div>

      {patient.prescriptions && patient.prescriptions.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Medications</h4>
          <div className="space-y-2">
            {patient.prescriptions.map((prescription, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{prescription.product}</span>
                <span className="text-gray-500">{prescription.weeklyDosage}/week</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}