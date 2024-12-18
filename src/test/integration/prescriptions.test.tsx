import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PrescriptionList, PrescriptionForm } from '../../components/prescriptions';
import { AuthProvider } from '../../contexts/AuthContext';

const mockPrescriptions = [
  {
    id: '1',
    patientId: '1',
    product: 'Semaglutide',
    weeklyDosage: '0.25mg',
    tier: 'Tier 1',
    price: '200.00',
    status: 'active'
  },
  {
    id: '2',
    patientId: '2',
    product: 'Tirzepatide',
    weeklyDosage: '5mg',
    tier: 'Tier 2',
    price: '175.00',
    status: 'active'
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

describe('Prescriptions Integration Tests', () => {
  describe('Prescription List', () => {
    beforeEach(() => {
      renderWithProviders(<PrescriptionList prescriptions={mockPrescriptions} />);
    });

    it('renders prescription list with all prescriptions', () => {
      mockPrescriptions.forEach(prescription => {
        expect(screen.getByText(prescription.product)).toBeInTheDocument();
        expect(screen.getByText(prescription.weeklyDosage)).toBeInTheDocument();
        expect(screen.getByText(prescription.tier)).toBeInTheDocument();
      });
    });

    it('shows correct status indicators', () => {
      mockPrescriptions.forEach(prescription => {
        const statusElement = screen.getByText(prescription.status);
        expect(statusElement).toHaveClass(
          prescription.status === 'active' ? 'text-green-800' : 'text-gray-800'
        );
      });
    });
  });

  describe('Prescription Form', () => {
    const mockSubmit = vi.fn();

    beforeEach(() => {
      renderWithProviders(
        <PrescriptionForm
          onSubmit={mockSubmit}
          onCancel={() => {}}
        />
      );
    });

    it('renders prescription form with all required fields', () => {
      expect(screen.getByLabelText(/medication/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/tier level/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/monthly cost/i)).toBeInTheDocument();
    });

    it('calculates dosage based on medication and tier selection', async () => {
      const medicationSelect = screen.getByLabelText(/medication/i);
      const tierSelect = screen.getByLabelText(/tier level/i);

      await userEvent.selectOptions(medicationSelect, 'Semaglutide');
      await userEvent.selectOptions(tierSelect, '1');

      await waitFor(() => {
        expect(screen.getByText(/0.25mg/i)).toBeInTheDocument();
        expect(screen.getByText(/0.1ml/i)).toBeInTheDocument();
      });
    });

    it('validates required fields', async () => {
      const submitButton = screen.getByRole('button', { name: /create prescription/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/medication type is required/i)).toBeInTheDocument();
        expect(screen.getByText(/tier level is required/i)).toBeInTheDocument();
      });
    });

    it('submits form with valid data', async () => {
      const medicationSelect = screen.getByLabelText(/medication/i);
      const tierSelect = screen.getByLabelText(/tier level/i);
      const priceInput = screen.getByLabelText(/monthly cost/i);

      await userEvent.selectOptions(medicationSelect, 'Semaglutide');
      await userEvent.selectOptions(tierSelect, '1');
      await userEvent.type(priceInput, '200.00');

      const submitButton = screen.getByRole('button', { name: /create prescription/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
          product: 'Semaglutide',
          tier: 'Tier 1',
          price: '200.00'
        }));
      });
    });
  });
});