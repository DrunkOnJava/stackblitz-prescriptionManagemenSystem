import React from 'react';
import { DollarSign } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function RevenueChart() {
  return (
    <AnalyticsCard
      title="Revenue Overview"
      description="Monthly revenue trends and projections"
      icon={DollarSign}
    >
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">Revenue chart will be implemented here</p>
      </div>
    </AnalyticsCard>
  );
}