import { PatientPrescription } from '../../types/patient';
import { calculateDosage } from './calculateDosage';
import { getPrescriptions, getPrescriptionsByPatient, getPrescriptionStats } from './queries';
import { updatePrescription } from './updatePrescription';
import { createPrescription } from './createPrescription';
import { deletePrescription } from './deletePrescription';

export {
  calculateDosage,
  getPrescriptions,
  getPrescriptionsByPatient,
  getPrescriptionStats,
  updatePrescription,
  createPrescription,
  deletePrescription
};

export type { PatientPrescription };