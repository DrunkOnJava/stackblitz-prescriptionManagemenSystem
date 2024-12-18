import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from '../../../../utils/dateUtils';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  isOutgoing: boolean;
}

interface MessageThreadProps {
  messages: Message[];
  patientName: string;
}

export default function MessageThread({ messages, patientName }: MessageThreadProps) {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-lg rounded-lg px-4 py-2 ${
              message.isOutgoing
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <div className="text-sm">{message.content}</div>
            <div className={`text-xs mt-1 ${
              message.isOutgoing ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {formatDistanceToNow(new Date(message.timestamp))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}