import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import SettingsCard from './SettingsCard';

export default function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    density: 'comfortable',
    animations: true
  });

  const handleChange = (key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingsCard
      title="Appearance"
      description="Customize the look and feel of the application"
      icon={Palette}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-900">
            Theme
          </label>
          <select
            id="theme"
            value={settings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-900">
            Font Size
          </label>
          <select
            id="fontSize"
            value={settings.fontSize}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label htmlFor="density" className="block text-sm font-medium text-gray-900">
            Layout Density
          </label>
          <select
            id="density"
            value={settings.density}
            onChange={(e) => handleChange('density', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="animations" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Animations</span>
            <span className="text-sm text-gray-500">Enable interface animations</span>
          </label>
          <button
            role="switch"
            aria-checked={settings.animations}
            onClick={() => handleChange('animations', !settings.animations)}
            className={`${
              settings.animations ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              aria-hidden="true"
              className={`${
                settings.animations ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>
      </div>
    </SettingsCard>
  );
}