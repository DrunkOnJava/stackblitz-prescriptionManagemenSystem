import React from 'react';
import { X } from 'lucide-react';
import { MEDICATIONS } from '../../types/medications';

interface MedicationComparisonProps {
  onClose: () => void;
}

export default function MedicationComparison({ onClose }: MedicationComparisonProps) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Medication Comparison</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Dosage Comparison */}
        <div>
          <h3 className="text-lg font-medium mb-4">Weekly Dosage (mg)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  {[1, 2, 3, 4, 5].map((tier) => (
                    <th key={tier} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(MEDICATIONS).map((medication) => (
                  <tr key={medication.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {medication.name}
                    </td>
                    {[1, 2, 3, 4, 5].map((tier) => (
                      <td key={tier} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medication.tiers[tier].dosageMg} mg
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volume Comparison */}
        <div>
          <h3 className="text-lg font-medium mb-4">Weekly Volume (ml)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  {[1, 2, 3, 4, 5].map((tier) => (
                    <th key={tier} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(MEDICATIONS).map((medication) => (
                  <tr key={medication.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {medication.name} ({medication.concentration})
                    </td>
                    {[1, 2, 3, 4, 5].map((tier) => (
                      <td key={tier} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medication.tiers[tier].dosageMl} ml
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Comparison */}
        <div>
          <h3 className="text-lg font-medium mb-4">Monthly Cost ($)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  {[1, 2, 3, 4, 5].map((tier) => (
                    <th key={tier} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(MEDICATIONS).map((medication) => (
                  <tr key={medication.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {medication.name}
                    </td>
                    {[1, 2, 3, 4, 5].map((tier) => (
                      <td key={tier} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${medication.tiers[tier].monthlyCost}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}