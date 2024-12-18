import { useState, useEffect } from 'react';
import { Activity } from '../types/activity';
import { getRecentActivities } from '../services/activityService';

export function useActivities(limit: number = 10) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActivities();
  }, [limit]);

  async function loadActivities() {
    try {
      setLoading(true);
      const data = await getRecentActivities(limit);
      setActivities(data);
    } catch (err) {
      setError('Failed to load activities');
      console.error('Error loading activities:', err);
    } finally {
      setLoading(false);
    }
  }

  return {
    activities,
    loading,
    error,
    refresh: loadActivities
  };
}