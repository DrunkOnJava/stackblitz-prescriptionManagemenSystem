import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';

export default function PatientsPage() {
  const navigate = useNavigate();
  const { patients, loading, error, addPatient, updatePatient, deletePatient } = usePatients();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </button>
      </div>

      {isFormOpen ? (
        <div className="bg-white shadow rounded-lg p-6">
          <PatientForm
            onSubmit={addPatient}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <PatientList
          patients={patients}
          loading={loading}
          error={error}
          onEdit={(patient) => navigate(`/patients/${patient.id}`)}
          onDelete={deletePatient}
        />
      )}
    </div>
  );
}