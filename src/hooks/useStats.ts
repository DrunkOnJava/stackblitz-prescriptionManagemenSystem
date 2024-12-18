import { useState, useEffect } from 'react';
import { usePatients } from './usePatients';
import { Patient } from '../types';

interface DashboardStats {
  totalPatients: number;
  activePrescriptions: number;
  pendingRefills: number;
  monthlyRevenue: number;
}

export function useStats() {
  const { patients, loading: patientsLoading } = usePatients();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!patients) return;

    const activePrescriptions = patients.reduce((count, patient) => {
      return count + (Array.isArray(patient.prescriptions) 
        ? patient.prescriptions.filter(p => p.status === 'active').length 
        : 0);
    }, 0);

    const pendingRefills = patients.reduce((count, patient) => {
      if (!Array.isArray(patient.prescriptions)) return count;
      return count + patient.prescriptions.filter(p => 
        p.status === 'active' && 
        p.daysUntilFill <= 7 && 
        p.daysUntilFill > 0
      ).length;
    }, 0);

    const monthlyRevenue = patients.reduce((total, patient) => {
      if (!Array.isArray(patient.prescriptions)) return total;
      return total + patient.prescriptions.reduce((subtotal, p) => {
        if (p.status !== 'active') return subtotal;
        const price = parseFloat(p.price || '0');
        return subtotal + (isNaN(price) ? 0 : price);
      }, 0);
    }, 0);

    setStats({
      totalPatients: patients.length,
      activePrescriptions,
      pendingRefills,
      monthlyRevenue
    });
  }, [patients]);

  return {
    stats,
    loading: patientsLoading || !stats
  };
}