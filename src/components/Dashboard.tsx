import React from 'react';
import Stats from './dashboard/Stats';
import ActivityTimeline from './dashboard/ActivityTimeline';
import { useActivities } from '../hooks/useActivities';

export default function Dashboard() {
  const { activities, loading, error } = useActivities(5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Provider Dashboard</h1>
      <Stats />
      <ActivityTimeline activities={activities} loading={loading} error={error} />
    </div>
  );
}