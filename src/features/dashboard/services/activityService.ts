import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Activity } from '../types';
import { handleError } from '../../../utils/error';

export async function getRecentActivities(limitCount: number = 5): Promise<Activity[]> {
  try {
    const q = query(
      collection(db, 'activities'),
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