import { http, HttpResponse } from 'msw';
import { mockPatients } from './data/patients';
import { mockPrescriptions } from './data/prescriptions';

export const handlers = [
  // Auth handlers
  http.post('/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    if (email === 'test@example.com' && password === 'Password123!') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'provider'
        },
        token: 'mock-jwt-token'
      });
    }
    return new HttpResponse(null, { status: 401 });
  }),

  // Patient handlers
  http.get('/api/patients', () => {
    return HttpResponse.json(mockPatients);
  }),

  http.get('/api/patients/:id', ({ params }) => {
    const patient = mockPatients.find(p => p.id === params.id);
    if (!patient) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(patient);
  }),

  // Prescription handlers
  http.get('/api/prescriptions', () => {
    return HttpResponse.json(mockPrescriptions);
  }),

  http.get('/api/prescriptions/:id', ({ params }) => {
    const prescription = mockPrescriptions.find(p => p.id === params.id);
    if (!prescription) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(prescription);
  })
];