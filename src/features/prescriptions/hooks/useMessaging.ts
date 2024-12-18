import { useState, useCallback } from 'react';
import { auth } from '../../../config/firebase';
import { DiagnosticService } from '../../../services/diagnostics/DiagnosticService';
import { logActivity } from '../../../services/activityService';

const diagnosticService = DiagnosticService.getInstance();

interface Message {
  id: string;
  type: 'refill_request' | 'message';
  patientId: string;
  patientName: string;
  content: string;
  status: 'new' | 'pending' | 'approved' | 'denied';
  timestamp: string;
  metadata?: Record<string, any>;
}

export function useMessaging() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (data: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
    diagnosticService.startCheckpoint('messaging:send');
    try {
      setLoading(true);
      setError(null);

      // Create message record
      const message = {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: 'new'
      };

      // Log message activity
      await logActivity({
        type: data.type === 'refill_request' ? 'refill_requested' : 'message_sent',
        description: data.content,
        patientId: data.patientId,
        patientName: data.patientName,
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: message.timestamp,
        metadata: data.metadata
      });

      setMessages(prev => [message, ...prev]);
      return message;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'send-error',
        message: errorMessage,
        timestamp: new Date().toISOString(),
        context: { messageData: data }
      });
      throw err;
    } finally {
      setLoading(false);
      diagnosticService.endCheckpoint('messaging:send');
    }
  }, []);

  const updateMessageStatus = useCallback(async (messageId: string, status: Message['status']) => {
    diagnosticService.startCheckpoint('messaging:updateStatus');
    try {
      setLoading(true);
      setError(null);

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      ));

      // Log status update activity
      const message = messages.find(m => m.id === messageId);
      if (message) {
        await logActivity({
          type: message.type === 'refill_request' ? 'refill_status_updated' : 'message_status_updated',
          description: `Status updated to ${status}`,
          patientId: message.patientId,
          patientName: message.patientName,
          performedBy: auth.currentUser?.email || 'Unknown',
          timestamp: new Date().toISOString(),
          metadata: { messageId, oldStatus: message.status, newStatus: status }
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update message status';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'status-update-error',
        message: errorMessage,
        timestamp: new Date().toISOString(),
        context: { messageId, status }
      });
      throw err;
    } finally {
      setLoading(false);
      diagnosticService.endCheckpoint('messaging:updateStatus');
    }
  }, [messages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    updateMessageStatus
  };
}