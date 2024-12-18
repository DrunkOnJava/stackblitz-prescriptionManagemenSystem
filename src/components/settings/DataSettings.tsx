import React, { useState } from 'react';
import { Database } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function DataSettings() {
  const [settings, setSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: '30',
    dataEncryption: true
  });

  const handleChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingsCard
      title="Data Management"
      description="Configure data backup and retention settings"
      icon={Database}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="autoBackup" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Automatic Backup</span>
            <span className="text-sm text-gray-500">Enable automatic data backups</span>
          </label>
          <button
            role="switch"
            aria-checked={settings.autoBackup}
            onClick={() => handleChange('autoBackup', !settings.autoBackup)}
            className={`${
              settings.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.autoBackup ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>

        <div>
          <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-900">
            Backup Frequency
          </label>
          <select
            id="backupFrequency"
            value={settings.backupFrequency}
            onChange={(e) => handleChange('backupFrequency', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="hourly">Every hour</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-900">
            Data Retention Period (days)
          </label>
          <select
            id="retentionPeriod"
            value={settings.retentionPeriod}
            onChange={(e) => handleChange('retentionPeriod', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="90">90 days</option>
            <option value="365">1 year</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="dataEncryption" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Data Encryption</span>
            <span className="text-sm text-gray-500">Enable end-to-end encryption</span>
          </label>
          <button
            role="switch"
            aria-checked={settings.dataEncryption}
            onClick={() => handleChange('dataEncryption', !settings.dataEncryption)}
            className={`${
              settings.dataEncryption ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.dataEncryption ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}