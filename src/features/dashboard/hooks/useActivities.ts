import { useState, useEffect } from 'react';
import { Activity } from '../types';
import { getRecentActivities } from '../services/activityService';

export function useActivities(limit: number = 5) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    loadActivities();
  }, [limit]);

  return { activities, loading, error };
}