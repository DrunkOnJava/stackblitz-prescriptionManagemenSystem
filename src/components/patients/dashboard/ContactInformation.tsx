import React from 'react';
import { Patient } from '../../../types';

interface ContactInformationProps {
  patient: Patient;
}

export default function ContactInformation({ patient }: ContactInformationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
        <DetailItem label="Primary Contact" value={patient.contactInfo} />
        {patient.email && <DetailItem label="Email" value={patient.email} />}
        {patient.phoneNumber && <DetailItem label="Phone" value={patient.phoneNumber} />}
        {patient.address && <DetailItem label="Address" value={patient.address} />}
      </dl>
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