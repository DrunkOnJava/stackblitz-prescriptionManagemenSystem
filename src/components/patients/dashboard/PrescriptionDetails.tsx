import React, { useState } from 'react';
import { PatientPrescription } from '../../../types/patient';
import { Edit } from 'lucide-react';
import EditPrescriptionForm from './EditPrescriptionForm';

interface PrescriptionDetailsProps {
  prescription: PatientPrescription;
  onUpdate?: (updatedPrescription: Partial<PatientPrescription>) => Promise<void>;
}

export default function PrescriptionDetails({ prescription, onUpdate }: PrescriptionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!prescription) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">No prescription details available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Prescription Details</h2>
        {onUpdate && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <Edit className="h-5 w-5" />
          </button>
        )}
      </div>

      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <DetailItem label="Medication Type" value={prescription.product || 'N/A'} />
        <DetailItem label="Tier Level" value={prescription.tier || 'N/A'} />
        <DetailItem label="Weekly Volume" value={prescription.weeklyVolume || 'N/A'} />
        <DetailItem label="Monthly Volume" value={prescription.monthlyVolume || 'N/A'} />
        <DetailItem label="Last Fill Date" value={prescription.lastFillDate || 'N/A'} />
        <DetailItem label="Days Until Fill" value={prescription.daysUntilFill?.toString() || 'N/A'} />
      </dl>

      {isEditing && onUpdate && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <EditPrescriptionForm
              prescription={prescription}
              onSubmit={async (data) => {
                await onUpdate(data);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}