import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './routes';
import { initializeFirestore } from './services/initializeFirestore';

export default function App() {
  useEffect(() => {
    initializeFirestore().catch(console.error);
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}