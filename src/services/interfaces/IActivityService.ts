import { Activity } from '../../types/activity';

export interface IActivityService {
  getRecentActivities(limit?: number): Promise<Activity[]>;
  logActivity(activity: Omit<Activity, 'id'>): Promise<void>;
  getActivityStats(): Promise<{
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  }>;
}