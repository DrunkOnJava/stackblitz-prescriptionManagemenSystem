import { IAuthService } from './interfaces/IAuthService';
import { IPatientService } from './interfaces/IPatientService';
import { IPrescriptionService } from './interfaces/IPrescriptionService';
import { IActivityService } from './interfaces/IActivityService';
import { IErrorService } from './interfaces/IErrorService';
import { FirebaseAuthService } from './implementations/FirebaseAuthService';

class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerDefaults();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  private registerDefaults() {
    this.register<IAuthService>('authService', new FirebaseAuthService());
    // Register other service implementations
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service as T;
  }
}

export const serviceContainer = ServiceContainer.getInstance();