import { COLLECTIONS } from './constants';
import { collection, query, orderBy, limit, addDoc, getDocs, where, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Activity, ActivityFilters } from '../types/activity';
import { handleError } from './errorService';

export async function logActivity(activity: Omit<Activity, 'id'>): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTIONS.ACTIVITIES), {
      ...activity,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    throw handleError(error, { activity });
  }
}

export async function getRecentActivities(limitCount: number = 10): Promise<Activity[]> {
  try {
    const q = query(
      collection(db, COLLECTIONS.ACTIVITIES),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Activity));
  } catch (error) {
    throw handleError(error);
  }
}

export async function getFilteredActivities(filters: ActivityFilters): Promise<Activity[]> {
  try {
    let q = query(collection(db, COLLECTIONS.ACTIVITIES));

    if (filters.type?.length) {
      q = query(q, where('type', 'in', filters.type));
    }

    if (filters.patientId) {
      q = query(q, where('patientId', '==', filters.patientId));
    }

    if (filters.performedBy) {
      q = query(q, where('performedBy', '==', filters.performedBy));
    }

    if (filters.startDate) {
      q = query(q, where('timestamp', '>=', filters.startDate));
    }

    if (filters.endDate) {
      q = query(q, where('timestamp', '<=', filters.endDate));
    }

    q = query(q, orderBy('timestamp', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Activity));
  } catch (error) {
    throw handleError(error, { filters });
  }
}

export async function getActivityStats(): Promise<{
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}> {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString();
    const startOfMonth = new Date(now.setDate(1)).toISOString();

    const [totalSnapshot, todaySnapshot, weekSnapshot, monthSnapshot] = await Promise.all([
      getDocs(collection(db, COLLECTIONS.ACTIVITIES)),
      getDocs(query(collection(db, COLLECTIONS.ACTIVITIES), where('timestamp', '>=', startOfDay))),
      getDocs(query(collection(db, COLLECTIONS.ACTIVITIES), where('timestamp', '>=', startOfWeek))),
      getDocs(query(collection(db, COLLECTIONS.ACTIVITIES), where('timestamp', '>=', startOfMonth)))
    ]);

    return {
      total: totalSnapshot.size,
      today: todaySnapshot.size,
      thisWeek: weekSnapshot.size,
      thisMonth: monthSnapshot.size
    };
  } catch (error) {
    throw handleError(error);
  }
}