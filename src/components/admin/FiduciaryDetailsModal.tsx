import { X, Building2, Mail, Phone, CheckCircle } from 'lucide-react';
import type { Fiduciary } from '../../types/admin.types';
import { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

interface FiduciaryDetailsModalProps {
  fiduciary: Fiduciary | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => Promise<boolean>;
}

const FiduciaryDetailsModal = ({ fiduciary, isOpen, onClose, onUpdateStatus }: FiduciaryDetailsModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen || !fiduciary) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Suspended':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Pending':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Expired':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const statusOptions = [
    { value: 'Active', label: 'Active', color: 'text-green-700' },
    { value: 'Pending', label: 'Pending', color: 'text-orange-700' },
    { value: 'Suspended', label: 'Suspended', color: 'text-red-700' },
    { value: 'Expired', label: 'Expired', color: 'text-gray-700' },
  ];

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === fiduciary.status) {
      return;
    }

    setShowConfirm(true);
  };

  const confirmStatusUpdate = async () => {
    setShowConfirm(false);
    setIsUpdating(true);
    const success = await onUpdateStatus(fiduciary.id, selectedStatus);
    setIsUpdating(false);
    
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-5 flex items-center justify-between rounded-t-2xl sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{fiduciary.name}</h2>
              <p className="text-xs text-white/80">Fiduciary ID: {fiduciary.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(fiduciary.status)}`}>
              {fiduciary.status}
            </span>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-gray-900 font-medium break-all">{fiduciary.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Mobile</p>
                  <p className="text-sm text-gray-900 font-medium">{fiduciary.mobile}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Status Change Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Change Status
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={selectedStatus || fiduciary.status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm font-medium"
                  >
                    {statusOptions.map((option) => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        className={option.color}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating || !selectedStatus || selectedStatus === fiduciary.status}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Update Status</span>
                      </>
                    )}
                  </button>
                </div>
                {selectedStatus && selectedStatus !== fiduciary.status && (
                  <p className="mt-2 text-xs text-gray-500">
                    Status will be changed from <span className="font-semibold">{fiduciary.status}</span> to <span className="font-semibold">{selectedStatus}</span>
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmStatusUpdate}
        title="Update Status"
        message={`Are you sure you want to change the status of ${fiduciary.name} to ${selectedStatus}? This will affect their access to the platform.`}
        confirmText="Update Status"
        cancelText="Cancel"
        variant="warning"
        isLoading={isUpdating}
      />
    </div>
  );
};

export default FiduciaryDetailsModal;
