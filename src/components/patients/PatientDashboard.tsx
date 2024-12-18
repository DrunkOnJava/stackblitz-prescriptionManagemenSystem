import React from 'react';
import { Patient, PatientPrescription } from '../../types';
import PatientHeader from './dashboard/PatientHeader';
import PatientStats from './dashboard/PatientStats';
import PrescriptionDetails from './dashboard/PrescriptionDetails';
import ContactInformation from './dashboard/ContactInformation';
import { AlertCircle } from 'lucide-react';

interface PatientDashboardProps {
  patient: Patient;
  onUpdate: (updatedPatient: Partial<Patient>) => Promise<void>;
  onUpdatePrescription: (prescriptionId: string, data: Partial<PatientPrescription>) => Promise<void>;
}

export default function PatientDashboard({ 
  patient, 
  onUpdate,
  onUpdatePrescription 
}: PatientDashboardProps) {
  if (!patient) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Patient data not available</h3>
      </div>
    );
  }

  const currentPrescription = patient.prescriptions?.[0];

  if (!currentPrescription) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No prescription data available</h3>
      </div>
    );
  }

  const handlePrescriptionUpdate = async (data: Partial<PatientPrescription>) => {
    if (currentPrescription.id) {
      await onUpdatePrescription(currentPrescription.id, data);
    }
  };

  return (
    <div className="space-y-6">
      <PatientHeader patient={patient} onUpdate={onUpdate} />
      <PatientStats prescription={currentPrescription} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PrescriptionDetails 
          prescription={currentPrescription} 
          onUpdate={handlePrescriptionUpdate}
        />
        <ContactInformation patient={patient} />
      </div>
    </div>
  );
}