import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function AnalyticsCard({ title, description, icon: Icon, children }: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-6 relative">{children}</div>
    </div>
  );
}