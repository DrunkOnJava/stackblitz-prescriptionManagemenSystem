import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Palette, Users } from 'lucide-react';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import FallbackUI from '../components/shared/FallbackUI';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import DataSettings from '../components/settings/DataSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import TeamSettings from '../components/settings/TeamSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import AuditLogSettings from '../components/settings/AuditLogSettings';
import ApiKeySettings from '../components/settings/ApiKeySettings';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="h-6 w-6 text-gray-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ErrorBoundary fallback={<FallbackUI message="Failed to load notification settings" />}>
            <NotificationSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load security settings" />}>
            <SecuritySettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load data settings" />}>
            <DataSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load appearance settings" />}>
            <AppearanceSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load team settings" />}>
            <TeamSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load integration settings" />}>
            <IntegrationSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load audit log settings" />}>
            <AuditLogSettings />
          </ErrorBoundary>
          <ErrorBoundary fallback={<FallbackUI message="Failed to load API key settings" />}>
            <ApiKeySettings />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}