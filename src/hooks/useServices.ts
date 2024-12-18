import { useContext } from 'react';
import { ServiceContext } from '../contexts/ServiceContext';
import { IAuthService } from '../services/interfaces/IAuthService';
import { IPatientService } from '../services/interfaces/IPatientService';
import { IPrescriptionService } from '../services/interfaces/IPrescriptionService';
import { IActivityService } from '../services/interfaces/IActivityService';
import { IErrorService } from '../services/interfaces/IErrorService';

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}

export function useAuthService(): IAuthService {
  const { authService } = useServices();
  return authService;
}

export function usePatientService(): IPatientService {
  const { patientService } = useServices();
  return patientService;
}

export function usePrescriptionService(): IPrescriptionService {
  const { prescriptionService } = useServices();
  return prescriptionService;
}

export function useActivityService(): IActivityService {
  const { activityService } = useServices();
  return activityService;
}

export function useErrorService(): IErrorService {
  const { errorService } = useServices();
  return errorService;
}