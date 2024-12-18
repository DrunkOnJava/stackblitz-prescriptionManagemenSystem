import { Patient } from '../../types';
import { createPatient } from './createPatient';
import { getPatients, getPatient } from './queries';
import { updatePatient } from './updatePatient';
import { deletePatient } from './deletePatient';
import { initializePatients } from './initialize';

export {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  initializePatients
};

export type { Patient };