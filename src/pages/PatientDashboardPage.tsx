import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PatientDashboard from '../components/patients/PatientDashboard';
import { Patient, PatientPrescription } from '../types';
import * as patientService from '../services/patientService';
import * as prescriptionService from '../services/prescriptionService';

export default function PatientDashboardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatient();
  }, [id]);

  async function loadPatient() {
    try {
      if (!id) return;
      const data = await patientService.getPatient(id);
      if (data) {
        setPatient(data);
      } else {
        setError('Patient not found');
      }
    } catch (err) {
      setError('Error loading patient data');
      console.error('Error loading patient:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdatePatient = async (updatedData: Partial<Patient>) => {
    try {
      if (!id) return;
      await patientService.updatePatient(id, updatedData);
      await loadPatient();
    } catch (err) {
      console.error('Error updating patient:', err);
      setError('Failed to update patient information');
    }
  };

  const handleUpdatePrescription = async (prescriptionId: string, data: Partial<PatientPrescription>) => {
    try {
      await prescriptionService.updatePrescription(prescriptionId, data);
      await loadPatient();
    } catch (err) {
      console.error('Error updating prescription:', err);
      setError('Failed to update prescription');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Patient not found'}</p>
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
        onUpdate={handleUpdatePatient}
        onUpdatePrescription={handleUpdatePrescription}
      />
    </div>
  );
}