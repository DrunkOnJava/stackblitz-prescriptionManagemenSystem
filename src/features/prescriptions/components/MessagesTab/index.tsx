import React from 'react';
import { MessageSquare, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useMessages } from '../../hooks/useMessages';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner';
import ErrorAlert from '../../../../components/shared/ErrorAlert';

export default function MessagesTab() {
  const { messages, loading, error, approveRefill, denyRefill } = useMessages();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert error={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Messages & Refill Requests</h2>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {message.type === 'refill_request' ? (
                  <RefreshCw className="h-5 w-5 text-blue-500" />
                ) : (
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {message.patientName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {message.type === 'refill_request' ? 'Refill Request' : 'Message'}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                message.status === 'new' ? 'bg-red-100 text-red-800' :
                message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {message.status}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">{message.content}</p>
            </div>

            {message.type === 'refill_request' && message.status === 'new' && (
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => denyRefill(message.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Deny
                </button>
                <button
                  onClick={() => approveRefill(message.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </button>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}