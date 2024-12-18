import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { DashboardStats } from '../types';
import { handleError } from '../../../utils/error';

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [patientsSnapshot, prescriptionsSnapshot] = await Promise.all([
      getDocs(collection(db, 'patients')),
      getDocs(collection(db, 'prescriptions'))
    ]);

    const prescriptions = prescriptionsSnapshot.docs.map(doc => doc.data());
    const activeCount = prescriptions.filter(p => p.status === 'active').length;
    const pendingRefills = prescriptions.filter(p => p.daysUntilFill <= 7).length;
    const monthlyRevenue = prescriptions.reduce((sum, p) => {
      return sum + (p.status === 'active' ? parseFloat(p.price) || 0 : 0);
    }, 0);

    return {
      totalPatients: patientsSnapshot.size,
      activePrescriptions: activeCount,
      pendingRefills,
      monthlyRevenue
    };
  } catch (error) {
    throw handleError(error);
  }
}