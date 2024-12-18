import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    refillReminders: true,
    patientUpdates: true,
    systemAlerts: true,
    dailyDigest: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SettingsCard
      title="Notifications"
      description="Manage how you receive notifications and alerts"
      icon={Bell}
    >
      <div className="space-y-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label htmlFor={key} className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              <span className="text-sm text-gray-500">
                Receive notifications for {key.toLowerCase()}
              </span>
            </label>
            <button
              role="switch"
              aria-checked={value}
              onClick={() => handleToggle(key as keyof typeof settings)}
              className={`${
                value ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                aria-hidden="true"
                className={`${
                  value ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}