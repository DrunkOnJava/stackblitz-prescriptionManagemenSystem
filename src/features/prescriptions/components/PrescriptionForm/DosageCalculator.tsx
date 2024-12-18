import React from 'react';
import { MEDICATIONS } from '../../../../types/medications';

interface DosageCalculatorProps {
  medication: string;
  tier: string;
  onCalculated: (data: {
    weeklyDosage: string;
    monthlyDosage: string;
    weeklyVolume: string;
    monthlyVolume: string;
    cost: number;
  }) => void;
}

export default function DosageCalculator({ medication, tier, onCalculated }: DosageCalculatorProps) {
  const selectedMedication = MEDICATIONS[medication.toLowerCase()];
  const selectedTier = selectedMedication?.tiers[parseInt(tier)];

  React.useEffect(() => {
    if (selectedTier) {
      onCalculated({
        weeklyDosage: `${selectedTier.dosageMg}mg`,
        monthlyDosage: `${selectedTier.dosageMg * 4}mg`,
        weeklyVolume: `${selectedTier.dosageMl}ml`,
        monthlyVolume: `${selectedTier.dosageMl * 4}ml`,
        cost: selectedTier.monthlyCost
      });
    }
  }, [medication, tier, selectedTier, onCalculated]);

  if (!selectedTier) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Calculated Dosage</h3>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-medium text-gray-500">Weekly Dosage</dt>
          <dd className="mt-1 text-sm text-gray-900">{selectedTier.dosageMg} mg</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Weekly Volume</dt>
          <dd className="mt-1 text-sm text-gray-900">{selectedTier.dosageMl} ml</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Monthly Cost</dt>
          <dd className="mt-1 text-sm text-gray-900">${selectedTier.monthlyCost}</dd>
        </div>
      </dl>
    </div>
  );
}