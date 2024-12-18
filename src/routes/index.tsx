import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import { FallbackUI } from '../components/shared/FallbackUI';
import DashboardPage from '../pages/DashboardPage';
import PatientsPage from '../pages/PatientsPage';
import PatientDashboardPage from '../pages/PatientDashboardPage';
import PrescriptionsPage from '../pages/PrescriptionsPage';
import MessagesPage from '../pages/MessagesPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <FallbackUI message="Navigation error occurred" />,
    children: [
      {
        index: true,
        element: <ErrorBoundary><DashboardPage /></ErrorBoundary>
      },
      {
        path: 'patients',
        element: <ErrorBoundary><PatientsPage /></ErrorBoundary>
      },
      {
        path: 'patients/:id',
        element: <ErrorBoundary><PatientDashboardPage /></ErrorBoundary>
      },
      {
        path: 'prescriptions',
        element: <ErrorBoundary><PrescriptionsPage /></ErrorBoundary>
      },
      {
        path: 'messages',
        element: <ErrorBoundary>
          <React.Suspense fallback={<LoadingSpinner />}>
            <MessagesPage />
          </React.Suspense>
        </ErrorBoundary>
      },
      {
        path: 'analytics',
        element: <ErrorBoundary><AnalyticsPage /></ErrorBoundary>
      },
      {
        path: 'settings',
        element: <ErrorBoundary><SettingsPage /></ErrorBoundary>
      }
    ]
  }
]);