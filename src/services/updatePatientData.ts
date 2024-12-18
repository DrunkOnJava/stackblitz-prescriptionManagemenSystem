import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const patientUpdates = [
  {
    id: 'zach-bligh',
    medication: 'Semaglutide',
    dosage: '0.5mg'
  },
  {
    id: 'jodi',
    medication: 'Tirzepatide',
    dosage: '5mg'
  },
  {
    id: 'michael',
    medication: 'Retatrutide',
    dosage: '10mg'
  },
  {
    id: 'maria',
    medication: 'Retatrutide',
    dosage: '4mg'
  },
  {
    id: 'david',
    medication: 'Semaglutide',
    dosage: '0.5mg'
  },
  {
    id: 'angela',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'ye',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'allison',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'mackenzie',
    medication: 'Semaglutide',
    dosage: '0.5mg'
  },
  {
    id: 'andres',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'griffin',
    medication: 'Retatrutide',
    dosage: '4mg'
  },
  {
    id: 'gino',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'nate',
    medication: 'Semaglutide',
    dosage: '2.7mg'
  },
  {
    id: 'nestors-brother',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'nestor',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  },
  {
    id: 'zachs-mom',
    medication: 'Semaglutide',
    dosage: '0.25mg'
  }
];

export async function updatePatientProfiles() {
  try {
    for (const update of patientUpdates) {
      const patientRef = doc(db, 'patients', update.id);
      await updateDoc(patientRef, {
        'prescriptions.0.product': update.medication,
        'prescriptions.0.weeklyDosage': update.dosage,
        updatedAt: new Date().toISOString()
      });
    }
    console.log('Patient profiles updated successfully');
  } catch (error) {
    console.error('Error updating patient profiles:', error);
    throw error;
  }
}