import React from 'react';
import { MoreVertical } from 'lucide-react';
import { PatientPrescription } from '../../../../types/patient';
import { formatCurrency, getRefillStatus } from '../../../../utils/prescriptionUtils';
import PrescriptionStatusBadge from '../shared/PrescriptionStatusBadge';

interface PrescriptionTableProps {
  prescriptions: PatientPrescription[];
  onEdit: (prescription: PatientPrescription) => void;
  onDelete: (id: string) => void;
}

export default function PrescriptionTable({ prescriptions, onEdit, onDelete }: PrescriptionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Medication
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dosage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Refill
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prescriptions.map((prescription) => {
            const refillStatus = getRefillStatus(prescription.daysUntilFill);
            return (
              <tr key={prescription.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {prescription.clientName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {prescription.contactInfo}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{prescription.product}</div>
                  <div className="text-sm text-gray-500">Tier {prescription.tier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {prescription.weeklyDosage}/week
                  </div>
                  <div className="text-sm text-gray-500">
                    {prescription.weeklyVolume} ml
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${refillStatus.color}`}>
                    {prescription.refillDue}
                  </div>
                  <div className="text-sm text-gray-500">
                    {prescription.daysUntilFill} days
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatCurrency(prescription.price)}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PrescriptionStatusBadge status={prescription.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onEdit(prescription)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(prescription.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}