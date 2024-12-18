import React from 'react';
import { Pill } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { usePrescriptions } from '../../hooks/usePrescriptions';

export default function PrescriptionMetrics() {
  const { prescriptions, stats, loading } = usePrescriptions();

  if (loading) {
    return (
      <AnalyticsCard
        title="Prescription Analytics"
        description="Prescription trends and insights"
        icon={Pill}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </AnalyticsCard>
    );
  }

  return (
    <AnalyticsCard
      title="Prescription Analytics"
      description="Prescription trends and insights"
      icon={Pill}
    >
      <div className="space-y-4">
        <div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats?.activePrescriptions || 0}
          </p>
          <p className="text-sm text-gray-500">Active Prescriptions</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-yellow-600">
            {stats?.pendingRefills || 0}
          </p>
          <p className="text-sm text-gray-500">Pending Refills</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-blue-600">
            ${stats?.monthlyRevenue?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-gray-500">Monthly Revenue</p>
        </div>
      </div>
    </AnalyticsCard>
  );
}