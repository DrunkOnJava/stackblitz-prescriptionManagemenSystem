import React from 'react';
import { AlertCircle } from 'lucide-react';
import { MEDICATIONS } from '../../../../types/medications';

interface MedicationSelectProps {
  value: string;
  onChange: (medication: string) => void;
  onTierChange: (tier: string) => void;
  selectedTier: string;
}

export default function MedicationSelect({ value, onChange, onTierChange, selectedTier }: MedicationSelectProps) {
  const selectedMedication = value ? MEDICATIONS[value.toLowerCase()] : null;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
          Select Medication
        </label>
        <select
          id="medication"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select a medication...</option>
          {Object.values(MEDICATIONS).map((medication) => (
            <option key={medication.name} value={medication.name}>
              {medication.name} ({medication.concentration})
            </option>
          ))}
        </select>
      </div>

      {selectedMedication && (
        <>
          <div>
            <label htmlFor="tier" className="block text-sm font-medium text-gray-700">
              Select Tier
            </label>
            <select
              id="tier"
              value={selectedTier}
              onChange={(e) => onTierChange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {Object.entries(selectedMedication.tiers).map(([tier, details]) => (
                <option key={tier} value={tier}>
                  Tier {tier} - {details.dosageMg}mg ({details.dosageMl}ml)
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Medication Details
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Concentration: {selectedMedication.concentration}</li>
                    <li>Weekly Dosage: {selectedMedication.tiers[parseInt(selectedTier)].dosageMg}mg</li>
                    <li>Weekly Volume: {selectedMedication.tiers[parseInt(selectedTier)].dosageMl}ml</li>
                    <li>Monthly Cost: ${selectedMedication.tiers[parseInt(selectedTier)].monthlyCost}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}