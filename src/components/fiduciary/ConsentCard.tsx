import { useState } from 'react';
import { User, Calendar, FileText } from 'lucide-react';
import type { ConsentRequest } from '../../types/fiduciary.types';
import ConsentDetailsModal from './ConsentDetailsModal';

interface ConsentCardProps {
  consent: ConsentRequest;
}

const ConsentCard = ({ consent }: ConsentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

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
    // If already formatted like "19/11/2025 14:56", return shortened version
    if (dateString.includes('/')) {
      return dateString.split(' ')[0]; // Just the date part
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      >
        {/* Status Bar */}
        <div className={`px-4 py-2 border-b ${getStatusColor(consent.status || 'Pending')}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide">
              {consent.status || 'Pending'}
            </span>
            <span className="text-xs font-mono">
              ID: #{consent.consent_id || consent.id}
            </span>
          </div>
        </div>

        <div className="p-4">
          {/* User Info */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate text-lg">
                {consent.user_name || 'N/A'}
              </h3>
              <p className="text-sm text-gray-500 truncate">{consent.user_email || 'N/A'}</p>
            </div>
          </div>

          {/* Request Details Grid */}
          <div className="space-y-3">
            {/* Data Requested */}
            {(consent.data || consent.purpose) && (
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Data Requested</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {consent.data || consent.purpose || 'N/A'}
                  </p>
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Requested: <strong className="text-gray-900">
                  {formatDate(consent.time_and_date || consent.created_at || consent.requested_at)}
                </strong></span>
              </div>
              {(consent.expiry || consent.expires_at) && (
                <div className="text-xs text-orange-600 font-medium">
                  Expires: {consent.expiry || formatDate(consent.expires_at)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect Footer */}
        <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-200 group-hover:bg-blue-50 transition-colors">
          <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">
            Click to view full details →
          </span>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <ConsentDetailsModal
          consent={consent}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ConsentCard;
