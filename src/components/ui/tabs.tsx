import React from 'react';

interface TabsProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, onValueChange, children }: TabsProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  return (
    <button
      onClick={() => {}}
      className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        data-[state=active]:bg-white data-[state=active]:text-blue-700
        data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
      data-state="inactive"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  return (
    <div className="mt-4">
      {children}
    </div>
  );
}