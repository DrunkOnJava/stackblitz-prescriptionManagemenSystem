import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PatientList, PatientForm } from '../../components/patients';
import { AuthProvider } from '../../contexts/AuthContext';

const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    prescriptions: []
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '098-765-4321',
    prescriptions: []
  }
];

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('Patients Integration Tests', () => {
  describe('Patient List', () => {
    beforeEach(() => {
      renderWithProviders(
        <PatientList
          patients={mockPatients}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      );
    });

    it('renders patient list with all patients', () => {
      mockPatients.forEach(patient => {
        expect(screen.getByText(patient.name)).toBeInTheDocument();
        expect(screen.getByText(patient.email)).toBeInTheDocument();
        expect(screen.getByText(patient.phoneNumber)).toBeInTheDocument();
      });
    });

    it('filters patients by search term', async () => {
      const searchInput = screen.getByPlaceholderText(/search patients/i);
      await userEvent.type(searchInput, 'John');

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('shows edit and delete buttons for each patient', () => {
      mockPatients.forEach(() => {
        expect(screen.getAllByText('Edit')).toHaveLength(mockPatients.length);
        expect(screen.getAllByText('Delete')).toHaveLength(mockPatients.length);
      });
    });
  });

  describe('Patient Form', () => {
    const mockSubmit = vi.fn();

    beforeEach(() => {
      renderWithProviders(
        <PatientForm
          onSubmit={mockSubmit}
          onCancel={() => {}}
        />
      );
    });

    it('renders patient form with all required fields', () => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    });

    it('validates required fields', async () => {
      const submitButton = screen.getByRole('button', { name: /add patient/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('submits form with valid data', async () => {
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const phoneInput = screen.getByLabelText(/phone/i);

      await userEvent.type(nameInput, 'Test Patient');
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(phoneInput, '123-456-7890');

      const submitButton = screen.getByRole('button', { name: /add patient/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          name: 'Test Patient',
          email: 'test@example.com',
          phoneNumber: '123-456-7890'
        });
      });
    });
  });
});