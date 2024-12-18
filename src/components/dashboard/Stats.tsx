import React from 'react';
import { Users, Pill, AlertCircle, DollarSign } from 'lucide-react';
import StatsCard from './StatsCard';
import { useStats } from '../../hooks/useStats';

export default function Stats() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
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