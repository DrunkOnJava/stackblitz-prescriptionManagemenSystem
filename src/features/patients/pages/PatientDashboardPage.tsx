import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePatient } from '../hooks/usePatient';
import PatientDashboard from '../components/PatientDashboard';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import ErrorAlert from '../../../components/shared/ErrorAlert';

export default function PatientDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patient, loading, error, updatePatient, updatePrescription } = usePatient(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Patient not found</p>
        <button
          onClick={() => navigate('/patients')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to Patients List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/patients')}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Patients
      </button>
      <PatientDashboard
        patient={patient}
        onUpdate={updatePatient}
        onUpdatePrescription={updatePrescription}
      />
    </div>
  );
}