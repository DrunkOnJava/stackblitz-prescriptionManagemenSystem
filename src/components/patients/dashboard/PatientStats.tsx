import React from 'react';
import { PatientPrescription } from '../../../types/patient';
import { formatCurrency } from '../../../utils/prescriptionUtils';
import { Pill, Calendar, DollarSign, Activity } from 'lucide-react';

interface PatientStatsProps {
  prescription: PatientPrescription;
}

export default function PatientStats({ prescription }: PatientStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Pill}
        title="Current Medication"
        value={prescription.product || 'N/A'}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />
      <StatCard
        icon={Activity}
        title="Weekly Dosage"
        value={prescription.weeklyDosage || 'N/A'}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatCard
        icon={DollarSign}
        title="Monthly Cost"
        value={formatCurrency(prescription.price)}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <StatCard
        icon={Calendar}
        title="Next Refill"
        value={prescription.refillDue || 'N/A'}
        bgColor="bg-yellow-100"
        iconColor="text-yellow-600"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

function StatCard({ icon: Icon, title, value, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-2 ${bgColor} rounded`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}