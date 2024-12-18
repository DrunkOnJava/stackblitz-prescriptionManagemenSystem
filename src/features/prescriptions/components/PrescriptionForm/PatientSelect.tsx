import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { usePatients } from '../../../../hooks/usePatients';
import { Patient } from '../../../../types';

interface PatientSelectProps {
  onSelect: (patient: Patient) => void;
}

export default function PatientSelect({ onSelect }: PatientSelectProps) {
  const { patients, loading } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    if (!patients) return;
    
    const filtered = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  return (
    <div className="relative">
      <label htmlFor="patient-search" className="block text-sm font-medium text-gray-700 mb-1">
        Select Patient
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="patient-search"
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Loading patients...</div>
          ) : filteredPatients.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No patients found</div>
          ) : (
            filteredPatients.map(patient => (
              <button
                key={patient.id}
                onClick={() => onSelect(patient)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{patient.name}</span>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>DOB: {patient.dateOfBirth || 'N/A'}</span>
                    <span>•</span>
                    <span>ID: {patient.id}</span>
                  </div>
                  {patient.prescriptions && patient.prescriptions.length > 0 && (
                    <span className="text-xs text-blue-600 mt-1">
                      {patient.prescriptions.length} active prescription(s)
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}