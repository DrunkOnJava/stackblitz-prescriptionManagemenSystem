import React from 'react';
import { Building2 } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface PharmacySelectProps {
  selectedPharmacyId: string;
  onSelect: (pharmacyId: string) => void;
}

// Mock data - replace with actual pharmacy data from your backend
const PHARMACIES: Pharmacy[] = [
  {
    id: '1',
    name: 'City Pharmacy',
    address: '123 Main St, City, ST 12345',
    phone: '(555) 123-4567'
  },
  {
    id: '2',
    name: 'Downtown Drugs',
    address: '456 Center Ave, City, ST 12345',
    phone: '(555) 234-5678'
  }
];

export default function PharmacySelect({ selectedPharmacyId, onSelect }: PharmacySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Preferred Pharmacy
      </label>
      <div className="mt-1 space-y-2">
        {PHARMACIES.map((pharmacy) => (
          <label
            key={pharmacy.id}
            className={`relative block p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${
              selectedPharmacyId === pharmacy.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="pharmacy"
              value={pharmacy.id}
              checked={selectedPharmacyId === pharmacy.id}
              onChange={(e) => onSelect(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Building2 className={`h-6 w-6 ${
                  selectedPharmacyId === pharmacy.id ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="ml-3">
                <span className="block text-sm font-medium text-gray-900">
                  {pharmacy.name}
                </span>
                <span className="block text-sm text-gray-500">
                  {pharmacy.address}
                </span>
                <span className="block text-sm text-gray-500">
                  {pharmacy.phone}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}