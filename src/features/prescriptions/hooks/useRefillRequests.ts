import { useState, useCallback } from 'react';
import { auth } from '../../../config/firebase';
import { logActivity } from '../../../services/activityService';
import { DiagnosticService } from '../../../services/diagnostics/DiagnosticService';

const diagnosticService = DiagnosticService.getInstance();

interface RefillRequest {
  patientId: string;
  patientName: string;
  prescriptionIds: string[];
  notes?: string;
}

export function useRefillRequests() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRefillRequest = useCallback(async (request: RefillRequest) => {
    diagnosticService.startCheckpoint('refillRequest:submit');
    try {
      setLoading(true);
      setError(null);

      // Log refill request activity
      await logActivity({
        type: 'refill_requested',
        description: `Refill requested for ${request.prescriptionIds.length} prescription(s)`,
        patientId: request.patientId,
        patientName: request.patientName,
        performedBy: auth.currentUser?.email || 'Unknown',
        timestamp: new Date().toISOString(),
        metadata: {
          prescriptionIds: request.prescriptionIds,
          notes: request.notes
        }
      });

      // Here you would typically also:
      // 1. Update prescription status
      // 2. Send notifications
      // 3. Create refill request record

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit refill request';
      setError(errorMessage);
      diagnosticService.trackError({
        type: 'prescription',
        code: 'refill-request-error',
        message: errorMessage,
        timestamp: new Date().toISOString(),
        context: { request }
      });
      throw err;
    } finally {
      setLoading(false);
      diagnosticService.endCheckpoint('refillRequest:submit');
    }
  }, []);

  return {
    loading,
    error,
    submitRefillRequest
  };
}