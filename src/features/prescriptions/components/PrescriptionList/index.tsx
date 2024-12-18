import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';
import { usePrescriptionList } from '../../hooks/usePrescriptionList';
import { motion, AnimatePresence } from 'framer-motion';
import PrescriptionTable from './PrescriptionTable';
import PrescriptionForm from '../PrescriptionForm';
import MedicationComparison from '../MedicationComparison';
import LoadingSpinner from '../../../../components/shared/LoadingSpinner';
import ErrorAlert from '../../../../components/shared/ErrorAlert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';

export default function PrescriptionList() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    prescriptions,
    loading,
    error,
    selectedPrescription,
    showForm,
    showComparison,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleFormClose,
    setShowForm,
    setShowComparison
  } = usePrescriptionList();

  const filteredPrescriptions = prescriptions.filter(p => {
    // First filter by search term
    const matchesSearch = !searchTerm || 
      p.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.product?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Then filter by status tab
    if (activeTab === 'active') return p.status === 'active';
    if (activeTab === 'pending') return p.status === 'pending';
    if (activeTab === 'completed') return p.status === 'completed';
    return true;
  });

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Prescriptions</h1>
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-lg text-yellow-800">Authentication Required</p>
            <p className="text-sm text-yellow-600 mt-1">Please sign in to view prescriptions</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        </div>
        <ErrorAlert 
          error={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Prescriptions</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowComparison(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Compare Medications
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Prescription
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['all', 'active', 'pending', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== 'all' && (
                  <span className="ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium bg-gray-100">
                    {prescriptions.filter(p => p.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setShowComparison(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Compare Medications
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Prescription
          </button>
        </div>
      </div>

      {showComparison && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <MedicationComparison onClose={() => setShowComparison(false)} />
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white shadow rounded-lg p-6">
          <PrescriptionForm
            prescription={selectedPrescription}
            onSubmit={handleSubmit}
            onCancel={handleFormClose}
          />
        </div>
      )}

      <PrescriptionTable
        prescriptions={prescriptions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}