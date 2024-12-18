import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import MessageList from '../features/prescriptions/components/MessagesTab/MessageList';
import MessageThread from '../features/prescriptions/components/MessagesTab/MessageThread';
import MessageComposer from '../features/prescriptions/components/MessagesTab/MessageComposer';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorAlert from '../components/shared/ErrorAlert';

export default function MessagesPage() {
  const { messages, loading, error, approveRefill, denyRefill } = useMessages();
  const [activeTab, setActiveTab] = React.useState('refills');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert error={error} />;

  const refillRequests = messages.filter(m => m.type === 'refill_request');
  const generalMessages = messages.filter(m => m.type === 'message');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Messages & Refill Requests</h1>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex flex-col h-full">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('refills')}
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'refills'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Refill Requests ({refillRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'messages'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Messages ({generalMessages.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'refills' && (
              <MessageList
                messages={refillRequests}
                onApprove={approveRefill}
                onDeny={denyRefill}
              />
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <MessageThread
                  messages={generalMessages}
                  patientName="Current Patient"
                />
                <MessageComposer
                  onSend={(content) => {
                    console.log('Sending message:', content);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}