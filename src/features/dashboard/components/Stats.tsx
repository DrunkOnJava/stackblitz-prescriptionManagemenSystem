import React from 'react';
import { Users, Pill, AlertCircle, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { useStats } from '../hooks/useStats';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import ErrorAlert from '../../../components/shared/ErrorAlert';

export default function Stats() {
  const { stats, loading, error } = useStats();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        icon={Users}
        title="Total Patients"
        value={stats.totalPatients.toString()}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <StatsCard
        icon={Pill}
        title="Active Prescriptions"
        value={stats.activePrescriptions.toString()}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatsCard
        icon={AlertCircle}
        title="Pending Refills"
        value={stats.pendingRefills.toString()}
        bgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
      <StatsCard
        icon={DollarSign}
        title="Monthly Revenue"
        value={`$${stats.monthlyRevenue.toLocaleString()}`}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
    </div>
  );
}