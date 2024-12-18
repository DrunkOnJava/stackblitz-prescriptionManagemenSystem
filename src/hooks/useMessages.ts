import { useState, useEffect, useCallback } from 'react';
import { collection, query, orderBy, getDocs, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { COLLECTIONS } from '../services/constants';
import { DiagnosticService } from '../services/diagnostics/DiagnosticService';
import { logActivity } from '../services/activityService';

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

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    diagnosticService.startCheckpoint('messages:load');
    try {
      // Validate auth
      if (!auth.currentUser) {
        throw new Error('Authentication required');
      }

      // Use validated collection path
      const messagesRef = collection(db, COLLECTIONS.MESSAGES);
      
      // Build query with proper index
      const q = query(
        messagesRef,
        where('providerId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      // Execute query
      const snapshot = await getDocs(q);
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];

      setMessages(loadedMessages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load messages';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'load-error',
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
      diagnosticService.endCheckpoint('messages:load');
    }
  };

  const sendMessage = useCallback(async (content: string, patientId: string, patientName: string) => {
    diagnosticService.startCheckpoint('messages:send');
    try {
      if (!auth.currentUser) throw new Error('Authentication required');

      const messageData = {
        type: 'message',
        content,
        patientId,
        patientName,
        providerId: auth.currentUser.uid,
        status: 'sent',
        timestamp: new Date().toISOString()
      };

      await addDoc(collection(db, COLLECTIONS.MESSAGES), messageData);
      await loadMessages();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'send-error',
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      diagnosticService.endCheckpoint('messages:send');
    }
  }, []);

  const approveRefill = useCallback(async (messageId: string) => {
    diagnosticService.startCheckpoint('messages:approveRefill');
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message) throw new Error('Message not found');

      const messageRef = doc(db, COLLECTIONS.MESSAGES, messageId);
      await updateDoc(messageRef, { status: 'approved' });

      await logActivity({
        type: 'refill_approved',
        description: 'Refill request approved',
        patientId: message.patientId,
        patientName: message.patientName,
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: new Date().toISOString(),
        metadata: { messageId }
      });

      await loadMessages();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve refill';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'approve-error',
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      diagnosticService.endCheckpoint('messages:approveRefill');
    }
  }, [messages]);

  const denyRefill = useCallback(async (messageId: string) => {
    diagnosticService.startCheckpoint('messages:denyRefill');
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message) throw new Error('Message not found');

      const messageRef = doc(db, COLLECTIONS.MESSAGES, messageId);
      await updateDoc(messageRef, { status: 'denied' });

      await logActivity({
        type: 'refill_denied',
        description: 'Refill request denied',
        patientId: message.patientId,
        patientName: message.patientName,
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: new Date().toISOString(),
        metadata: { messageId }
      });

      await loadMessages();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deny refill';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'messaging',
        code: 'deny-error',
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
    } finally {
      diagnosticService.endCheckpoint('messages:denyRefill');
    }
  }, [messages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    approveRefill,
    denyRefill,
    refresh: loadMessages
  };
}