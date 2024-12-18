import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed?: string;
}

export default function ApiKeySettings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_123456789',
      created: '2024-01-01T00:00:00Z',
      lastUsed: '2024-02-28T12:00:00Z'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'pk_test_987654321',
      created: '2024-02-01T00:00:00Z',
      lastUsed: '2024-02-28T11:30:00Z'
    }
  ]);

  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState('');

  const handleCreateKey = () => {
    if (!newKeyName) return;

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `pk_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString()
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  return (
    <SettingsCard
      title="API Keys"
      description="Manage API keys for external integrations"
      icon={Key}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="newKeyName" className="block text-sm font-medium text-gray-700">
            Create New API Key
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="newKeyName"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              onClick={handleCreateKey}
              disabled={!newKeyName}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Create Key
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{apiKey.name}</h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <code className="text-sm text-gray-600">
                      {showKey[apiKey.id] ? apiKey.key : '••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowKey({ ...showKey, [apiKey.id]: !showKey[apiKey.id] })}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showKey[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRevokeKey(apiKey.id)}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Revoke
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Created: {new Date(apiKey.created).toLocaleDateString()}
                {apiKey.lastUsed && (
                  <> · Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SettingsCard>
  );
}