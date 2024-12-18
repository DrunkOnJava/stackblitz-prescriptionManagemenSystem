import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import FallbackUI from '../components/shared/FallbackUI';
import RevenueChart from '../components/analytics/RevenueChart';
import PatientMetrics from '../components/analytics/PatientMetrics';
import PrescriptionMetrics from '../components/analytics/PrescriptionMetrics';
import ActivityMetrics from '../components/analytics/ActivityMetrics';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6 text-gray-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary fallback={<FallbackUI message="Failed to load revenue chart" />}>
            <RevenueChart />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load patient metrics" />}>
            <PatientMetrics />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load prescription metrics" />}>
            <PrescriptionMetrics />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load activity metrics" />}>
            <ActivityMetrics />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}