import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    ipWhitelist: false
  });

  const handleChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingsCard
      title="Security"
      description="Configure security settings and preferences"
      icon={Shield}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="twoFactorAuth" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Two-Factor Authentication</span>
            <span className="text-sm text-gray-500">Add an extra layer of security</span>
          </label>
          <button
            role="switch"
            aria-checked={settings.twoFactorAuth}
            onClick={() => handleChange('twoFactorAuth', !settings.twoFactorAuth)}
            className={`${
              settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>

        <div>
          <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-900">
            Session Timeout (minutes)
          </label>
          <select
            id="sessionTimeout"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div>
          <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-900">
            Password Expiry (days)
          </label>
          <select
            id="passwordExpiry"
            value={settings.passwordExpiry}
            onChange={(e) => handleChange('passwordExpiry', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="ipWhitelist" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">IP Whitelist</span>
            <span className="text-sm text-gray-500">Restrict access to specific IP addresses</span>
          </label>
          <button
            role="switch"
            aria-checked={settings.ipWhitelist}
            onClick={() => handleChange('ipWhitelist', !settings.ipWhitelist)}
            className={`${
              settings.ipWhitelist ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.ipWhitelist ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}