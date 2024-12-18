import React from 'react';
import { Activity } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { useActivity } from '../../hooks/useActivity';

export default function ActivityMetrics() {
  const { activities, loading } = useActivity();

  if (loading) {
    return (
      <AnalyticsCard
        title="Recent Activity"
        description="System activity and trends"
        icon={Activity}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </AnalyticsCard>
    );
  }

  const recentActivities = activities.slice(0, 5);

  return (
    <AnalyticsCard
      title="Recent Activity"
      description="System activity and trends"
      icon={Activity}
    >
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-sm text-gray-600">{activity.description}</p>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}