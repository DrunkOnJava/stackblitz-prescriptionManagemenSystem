import React from 'react';
import { MessageSquare, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  type: 'refill_request' | 'message';
  patientName: string;
  content: string;
  status: 'new' | 'pending' | 'approved' | 'denied';
  timestamp: string;
}

interface MessageListProps {
  messages: Message[];
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export default function MessageList({ messages, onApprove, onDeny }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-4"
        >
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
              message.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
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
                onClick={() => onDeny(message.id)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
              >
                <XCircle className="h-4 w-4 mr-1" />
                Deny
              </button>
              <button
                onClick={() => onApprove(message.id)}
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
        </motion.div>
      ))}
    </div>
  );
}