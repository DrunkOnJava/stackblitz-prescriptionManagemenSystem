import React, { useState } from 'react';
import { Users } from 'lucide-react';
import SettingsCard from './SettingsCard';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function TeamSettings() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'provider' }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'provider'
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([
        ...teamMembers,
        {
          id: Date.now().toString(),
          ...newMember
        }
      ]);
      setNewMember({ name: '', email: '', role: 'provider' });
    }
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <SettingsCard
      title="Team Management"
      description="Manage team members and their roles"
      icon={Users}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Add Team Member</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <select
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="admin">Admin</option>
            <option value="provider">Provider</option>
            <option value="viewer">Viewer</option>
          </select>
          <button
            onClick={handleAddMember}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Member
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Team Members</h3>
          <div className="mt-2 divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {member.role}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-sm text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}