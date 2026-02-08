import { X, User, Mail, Phone, Building2, FileText, Flag, Calendar, Clock, Shield } from 'lucide-react';
import type { ConsentRequest } from '../../types/fiduciary.types';

interface ConsentDetailsModalProps {
  consent: ConsentRequest;
  onClose: () => void;
}

const ConsentDetailsModal = ({ consent, onClose }: ConsentDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || 'pending';
    switch (statusLower) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'pending':
      case 'requested':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'inactive':
      case 'suspended':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'revoked':
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    // If already formatted like "19/11/2025 14:56", return as is
    if (dateString.includes('/')) return dateString;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Consent Request</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Status Banner */}
          <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 ${getStatusColor(consent.status || 'Pending')}`}>
            <Clock className="w-5 h-5" />
            <span className="font-bold text-lg">{consent.status || 'Pending'}</span>
          </div>

          {/* User Information */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              User Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Name</span>
                </div>
                <span className="font-semibold text-gray-900">{consent.user_name || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </div>
                <span className="font-semibold text-gray-900 text-right break-all">{consent.user_email || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Mobile</span>
                </div>
                <span className="font-semibold text-gray-900">{consent.user_mobile || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Request Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">Entity</span>
                </div>
                <span className="font-semibold text-gray-900 text-right">{consent.entity || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Data Requested</span>
                </div>
                <span className="font-semibold text-gray-900 text-right">{consent.data || consent.purpose || 'N/A'}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">Purpose</span>
                </div>
                <span className="font-semibold text-gray-900 text-right">
                  {consent.purpose_text || consent.purpose || 'N/A'} 
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Request Date</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatDate(consent.time_and_date || consent.created_at || consent.requested_at)}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Expiry Date</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {consent.expiry || formatDate(consent.expires_at) || 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Consent ID</span>
                </div>
                <span className="font-bold text-gray-900">#{consent.consent_id || consent.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentDetailsModal;
