import { useState, useCallback } from 'react';
import { Activity, ActivityFilters } from '../types/activity';
import * as activityService from '../services/activityService';
import { useError } from './useError';

export function useActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useError();

  const loadActivities = useCallback(async (limit?: number) => {
    try {
      setLoading(true);
      clearError();
      const data = await activityService.getRecentActivities(limit);
      setActivities(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const filterActivities = useCallback(async (filters: ActivityFilters) => {
    try {
      setLoading(true);
      clearError();
      const data = await activityService.getFilteredActivities(filters);
      setActivities(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [clearError, handleError]);

  const logActivity = useCallback(async (activity: Omit<Activity, 'id'>) => {
    try {
      clearError();
      await activityService.logActivity(activity);
      await loadActivities(); // Refresh the activity list
    } catch (err) {
      handleError(err);
    }
  }, [clearError, handleError, loadActivities]);

  return {
    activities,
    loading,
    error,
    loadActivities,
    filterActivities,
    logActivity
  };
}