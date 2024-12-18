import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';
import { Patient } from '../types';
import { 
  getPatients, 
  createPatient, 
  updatePatient, 
  deletePatient, 
  initializePatients 
} from '../services/patientService/index';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPatients();
  }, []);

  async function loadPatients() {
    try {
      setLoading(true);
      setError(null);
      await initializePatients();
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }

  const handleAddPatient = async (patientData: Omit<Patient, 'id' | 'prescriptions'>) => {
    try {
      setError(null);
      const newPatient = await createPatient({ ...patientData, prescriptions: [] });
      setPatients([...patients, newPatient]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding patient:', error);
      setError('Failed to add patient');
    }
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const handleUpdatePatient = async (patientData: Omit<Patient, 'id' | 'prescriptions'>) => {
    if (!selectedPatient) return;
    try {
      setError(null);
      await updatePatient(selectedPatient.id, patientData);
      setPatients(patients.map(p => 
        p.id === selectedPatient.id 
          ? { ...selectedPatient, ...patientData }
          : p
      ));
      setIsFormOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
      setError('Failed to update patient');
    }
  };

  const handleDeletePatient = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      setError(null);
      await deletePatient(id);
      setPatients(patients.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      setError('Failed to delete patient');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <button
          onClick={() => {
            setSelectedPatient(null);
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">
            {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <PatientForm
            patient={selectedPatient || undefined}
            onSubmit={selectedPatient ? handleUpdatePatient : handleAddPatient}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedPatient(null);
            }}
          />
        </div>
      ) : (
        <PatientList
          patients={patients}
          loading={loading}
          error={error}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />
      )}
    </div>
  );
}