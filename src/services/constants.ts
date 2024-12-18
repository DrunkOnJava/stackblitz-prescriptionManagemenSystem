export const COLLECTIONS = {
  PATIENTS: 'patients',
  PRESCRIPTIONS: 'prescriptions', 
  ACTIVITIES: 'activities',
  USERS: 'users',
  SYSTEM: 'system',
  DIAGNOSTICS: 'diagnostics',
  MESSAGES: 'messages',
  REFILL_REQUESTS: 'refill_requests'
} as const;

// Validate collection paths
export function validateCollectionPath(path: string): boolean {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    throw new Error('Collection path cannot be empty');
  }
  if (!Object.values(COLLECTIONS).includes(path as any)) {
    throw new Error(`Invalid collection path: ${path}`);
  }
  return true;
}