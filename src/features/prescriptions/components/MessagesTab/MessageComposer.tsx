import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageComposerProps {
  onSend: (content: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function MessageComposer({ 
  onSend, 
  placeholder = 'Type a message...', 
  maxLength = 500 
}: MessageComposerProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSend(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <div className="relative">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={maxLength}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={placeholder}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {content.length}/{maxLength}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            type="submit"
            disabled={!content.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </div>
    </form>
  );
}