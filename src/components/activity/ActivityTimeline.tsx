import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../../types/activity';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { 
  Pill, 
  UserPlus, 
  RefreshCw, 
  CheckCircle, 
  FileEdit, 
  AlertCircle,
  XCircle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const activityIcons: Record<string, React.ElementType> = {
  patient_created: UserPlus,
  patient_updated: FileEdit,
  patient_deleted: XCircle,
  prescription_created: Pill,
  prescription_updated: FileEdit,
  prescription_deleted: XCircle,
  refill_requested: RefreshCw,
  refill_approved: CheckCircle,
  refill_denied: XCircle,
  dosage_changed: ArrowUpRight,
  price_changed: DollarSign
};

const activityColors: Record<string, string> = {
  patient_created: 'bg-green-500',
  patient_updated: 'bg-blue-500',
  patient_deleted: 'bg-red-500',
  prescription_created: 'bg-purple-500',
  prescription_updated: 'bg-yellow-500',
  prescription_deleted: 'bg-red-500',
  refill_requested: 'bg-orange-500',
  refill_approved: 'bg-green-500',
  refill_denied: 'bg-red-500',
  dosage_changed: 'bg-blue-500',
  price_changed: 'bg-yellow-500'
};

interface ActivityTimelineProps {
  activities: Activity[];
  loading?: boolean;
  error?: string | null;
}

export default function ActivityTimeline({ activities, loading, error }: ActivityTimelineProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading activities</h3>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] || AlertCircle;
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
  );
}