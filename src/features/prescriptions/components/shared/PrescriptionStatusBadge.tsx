import React from 'react';

interface PrescriptionStatusBadgeProps {
  status: 'active' | 'pending' | 'completed';
}

export default function PrescriptionStatusBadge({ status }: PrescriptionStatusBadgeProps) {
  const statusStyles = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}