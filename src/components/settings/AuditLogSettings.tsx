import React, { useState } from 'react';
import { History } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export default function AuditLogSettings() {
  const [logs] = useState<AuditLog[]>([
    {
      id: '1',
      action: 'Patient Created',
      user: 'Dr. Smith',
      timestamp: '2024-02-28T11:00:00Z',
      details: 'Created new patient record: John Doe'
    },
    {
      id: '2',
      action: 'Prescription Updated',
      user: 'Dr. Johnson',
      timestamp: '2024-02-28T10:45:00Z',
      details: 'Updated dosage for patient: Jane Smith'
    },
    {
      id: '3',
      action: 'Security Settings Changed',
      user: 'Admin',
      timestamp: '2024-02-28T10:30:00Z',
      details: 'Enabled two-factor authentication'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.action.toLowerCase().includes(filter);
  });

  return (
    <SettingsCard
      title="Audit Log"
      description="View system activity and security events"
      icon={History}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Events</option>
            <option value="patient">Patient Events</option>
            <option value="prescription">Prescription Events</option>
            <option value="security">Security Events</option>
          </select>

          <button className="text-sm text-blue-600 hover:text-blue-500">
            Export Logs
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-500">{log.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{log.user}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SettingsCard>
  );
}