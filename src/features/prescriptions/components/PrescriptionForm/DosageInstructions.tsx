import React from 'react';

interface DosageInstructionsProps {
  value: string;
  onChange: (value: string) => void;
  refills: number;
  onRefillsChange: (value: number) => void;
}

export default function DosageInstructions({ value, onChange, refills, onRefillsChange }: DosageInstructionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Usage Instructions
        </label>
        <textarea
          id="instructions"
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter detailed instructions for medication usage..."
        />
      </div>

      <div>
        <label htmlFor="refills" className="block text-sm font-medium text-gray-700">
          Number of Refills
        </label>
        <input
          type="number"
          id="refills"
          min={0}
          max={12}
          value={refills}
          onChange={(e) => onRefillsChange(parseInt(e.target.value))}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500">
          Maximum 12 refills allowed
        </p>
      </div>
    </div>
  );
}