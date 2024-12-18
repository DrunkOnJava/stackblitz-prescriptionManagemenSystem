import React from 'react';
import { Users } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { usePatients } from '../../hooks/usePatients';

export default function PatientMetrics() {
  const { patients, loading } = usePatients();

  if (loading) {
    return (
      <AnalyticsCard
        title="Patient Metrics"
        description="Patient growth and engagement"
        icon={Users}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </AnalyticsCard>
    );
  }

  const activePatients = patients.filter(p => p.status === 'active').length;
  const growthRate = ((activePatients / patients.length) * 100).toFixed(1);

  return (
    <AnalyticsCard
      title="Patient Metrics"
      description="Patient growth and engagement"
      icon={Users}
    >
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-semibold text-gray-900">{patients.length}</p>
          <p className="text-sm text-gray-500">Total Patients</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">{activePatients}</p>
          <p className="text-sm text-gray-500">Active Patients</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-green-600">{growthRate}%</p>
          <p className="text-sm text-gray-500">Active Patient Rate</p>
        </div>
      </div>
    </AnalyticsCard>
  );
}