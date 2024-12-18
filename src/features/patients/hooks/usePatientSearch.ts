import { useState, useMemo } from 'react';
import { Patient } from '../../../types';

export function usePatientSearch(patients: Patient[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;

    const searchLower = searchTerm.toLowerCase();
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email?.toLowerCase().includes(searchLower) ||
      patient.phoneNumber?.includes(searchTerm)
    );
  }, [patients, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredPatients
  };
}