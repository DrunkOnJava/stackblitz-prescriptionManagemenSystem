import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, User, Pill, FileText, BarChart3, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const { signOut } = useAuth();
  const mainContentClass = "min-h-screen bg-gray-50";

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Menu },
    { name: 'Patients', href: '/patients', icon: User },
    { name: 'Prescriptions', href: '/prescriptions', icon: FileText },
    { name: 'Messages & Refills', href: '/messages', icon: MessageSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="flex items-center mb-5 p-2">
            <Pill className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-semibold">MedManager</span>
          </div>
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                      location.pathname === item.href ? 'bg-gray-100' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="absolute bottom-0 left-0 w-full p-4">
            <button 
              onClick={signOut}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`${mainContentClass} ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="p-4 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}