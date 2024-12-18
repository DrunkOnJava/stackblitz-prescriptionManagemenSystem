import { useState, useCallback } from 'react';
import { auth } from '../../../config/firebase';
import { logActivity } from '../../../services/activityService';

interface Message {
  id: string;
  type: 'refill_request' | 'message';
  patientId: string;
  patientName: string;
  content: string;
  status: 'new' | 'pending' | 'approved' | 'denied';
  timestamp: string;
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const approveRefill = useCallback(async (messageId: string) => {
    try {
      // Update message status
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'approved' } : msg
      ));

      // Log activity
      await logActivity({
        type: 'refill_approved',
        description: 'Refill request approved',
        patientId: messages.find(m => m.id === messageId)?.patientId || '',
        patientName: messages.find(m => m.id === messageId)?.patientName || '',
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError('Failed to approve refill');
      console.error('Error approving refill:', err);
    }
  }, [messages]);

  const denyRefill = useCallback(async (messageId: string) => {
    try {
      // Update message status
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'denied' } : msg
      ));

      // Log activity
      await logActivity({
        type: 'refill_denied',
        description: 'Refill request denied',
        patientId: messages.find(m => m.id === messageId)?.patientId || '',
        patientName: messages.find(m => m.id === messageId)?.patientName || '',
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError('Failed to deny refill');
      console.error('Error denying refill:', err);
    }
  }, [messages]);

  return {
    messages,
    loading,
    error,
    approveRefill,
    denyRefill
  };
}