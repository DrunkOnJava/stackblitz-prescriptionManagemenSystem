import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface Integration {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

export default function IntegrationSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { 
      id: 'ehr',
      name: 'Electronic Health Records',
      status: 'disconnected'
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy System',
      status: 'connected',
      lastSync: '2024-02-28T10:00:00Z'
    },
    {
      id: 'billing',
      name: 'Billing System',
      status: 'connected',
      lastSync: '2024-02-28T09:30:00Z'
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) {
        return {
          ...integration,
          status: integration.status === 'connected' ? 'disconnected' : 'connected',
          lastSync: integration.status === 'disconnected' ? new Date().toISOString() : undefined
        };
      }
      return integration;
    }));
  };

  return (
    <SettingsCard
      title="Integrations"
      description="Manage external system integrations"
      icon={Link2}
    >
      <div className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{integration.name}</p>
              <p className="text-sm text-gray-500">
                {integration.status === 'connected' ? (
                  <>
                    Connected · Last sync:{' '}
                    {new Date(integration.lastSync!).toLocaleString()}
                  </>
                ) : (
                  'Not connected'
                )}
              </p>
            </div>
            <button
              onClick={() => toggleIntegration(integration.id)}
              className={`${
                integration.status === 'connected'
                  ? 'bg-green-600'
                  : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  integration.status === 'connected' ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}