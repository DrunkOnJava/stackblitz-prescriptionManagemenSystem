import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../types';
import { formatDistanceToNow } from '../../../utils/dateUtils';
import { Pill, UserPlus, RefreshCw, CheckCircle, FileEdit, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import ErrorAlert from '../../../components/shared/ErrorAlert';

interface ActivityTimelineProps {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const activityIcons = {
  prescription_created: Pill,
  prescription_updated: FileEdit,
  patient_created: UserPlus,
  patient_updated: FileEdit,
  refill_requested: RefreshCw,
  refill_approved: CheckCircle
};

const activityColors = {
  prescription_created: 'bg-blue-500',
  prescription_updated: 'bg-yellow-500',
  patient_created: 'bg-green-500',
  patient_updated: 'bg-purple-500',
  refill_requested: 'bg-orange-500',
  refill_approved: 'bg-teal-500'
};

export default function ActivityTimeline({ activities, loading, error }: ActivityTimelineProps) {
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (!activities.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4">
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, index) => {
                const Icon = activityIcons[activity.type] || Pill;
                const bgColor = activityColors[activity.type] || 'bg-gray-500';

                return (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center ring-8 ring-white`}>
                            <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {activity.description}{' '}
                              <button
                                onClick={() => navigate(`/patients/${activity.patientId}`)}
                                className="font-medium text-gray-900 hover:text-blue-600"
                              >
                                {activity.patientName}
                              </button>
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              by {activity.performedBy}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={activity.timestamp}>
                              {formatDistanceToNow(new Date(activity.timestamp))}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}