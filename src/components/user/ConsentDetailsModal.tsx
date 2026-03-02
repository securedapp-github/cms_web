import { X, Building2, FileText, Calendar, Shield, Clock, Mail, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Consent, ConsentStatus } from '../../types/user.types';
import toast from 'react-hot-toast';

interface ConsentDetailsModalProps {
  consent: Consent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (consentId: number, status: ConsentStatus) => Promise<void>;
  isUpdating: boolean;
}

export const ConsentDetailsModal = ({
  consent,
  isOpen,
  onClose,
  onUpdateStatus,
  isUpdating,
}: ConsentDetailsModalProps) => {
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);
  const canBeAccepted = consent?.status?.toLowerCase() !== 'suspended' && 
                        consent?.status?.toLowerCase() !== 'revoked' &&
                        consent?.status?.toLowerCase() !== 'active';

  if (!isOpen || !consent) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDisplayStatus = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'active') return 'Accepted';
    if (normalizedStatus === 'suspended') return 'Rejected';
    return status;
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'expired':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'revoked':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const handleStatusChange = async (newStatus: 'Active' | 'Suspended') => {
    setIsChanging(true);
    
    try {
      await onUpdateStatus(consent.consent_id, newStatus);
      toast.success(`Consent ${newStatus === 'Active' ? 'accepted' : 'rejected'} successfully`);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update consent status');
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Consent Details</h2>
          <button
            onClick={onClose}
            disabled={isChanging}
            className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Consent ID & Status Badge */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
              Consent ID: <span className="font-mono font-bold text-indigo-600">#{consent.consent_id}</span>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(consent.status)}`}>
              {getDisplayStatus(consent.status)}
            </span>
          </div>

          {/* Entity */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Entity</p>
                <p className="font-semibold text-gray-900">{consent.entity}</p>
              </div>
            </div>

            {/* Fiduciary Name */}
            {consent.fiduciary_name && (
              <button
                onClick={() => {
                  if (consent.fiduciary_id) {
                    onClose();
                    navigate(`/user/fiduciary/${consent.fiduciary_id}`, {
                      state: { fiduciaryId: consent.fiduciary_id }
                    });
                  }
                }}
                className="flex items-start gap-3 w-full text-left hover:bg-blue-50/50 p-3 -m-3 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Fiduciary Name</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{consent.fiduciary_name}</p>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  {/* <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to view fiduciary details</p> */}
                </div>
              </button>
            )}

            {/* Fiduciary Email */}
            <div className="flex items-start gap-3 mt-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Fiduciary Email</p>
                <p className="font-medium text-gray-900 break-all">fiduciary@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Purpose Data */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Purpose Data</p>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {consent.purpose_code || consent.purpose || consent.data}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Created At</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(consent.time_and_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(consent.expiry)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {canBeAccepted ? (
            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
              {/* Accept Button */}
              <button
                onClick={() => handleStatusChange('Active')}
                disabled={isChanging || isUpdating}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isChanging ? 'Accepting...' : 'Accept'}</span>
              </button>

              {/* Reject Button */}
              <button
                onClick={() => handleStatusChange('Suspended')}
                disabled={isChanging || isUpdating}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <XCircle className="w-5 h-5" />
                <span>{isChanging ? 'Rejecting...' : 'Reject'}</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <div className={`px-4 py-3 rounded-lg border ${
                consent.status.toLowerCase() === 'active' 
                  ? 'bg-emerald-50 border-emerald-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm text-center font-medium ${
                  consent.status.toLowerCase() === 'active'
                    ? 'text-emerald-700'
                    : 'text-red-700'
                }`}>
                  This consent has been {getDisplayStatus(consent.status).toLowerCase()} and cannot be modified again.
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={isChanging}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
