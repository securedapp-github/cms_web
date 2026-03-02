import { Building2, FileText, Calendar, Shield, Eye } from 'lucide-react';
import type { Consent } from '../../types/user.types';

interface ConsentCardProps {
  consent: Consent;
  onClick: () => void;
}

export const ConsentCard = ({ consent, onClick }: ConsentCardProps) => {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'active':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'suspended':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'expired':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'revoked':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
    >
      {/* Unread Indicator */}
      {consent.is_read === 0 && (
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-4 ring-indigo-100"></div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-lg">
              {consent.entity}
            </h3>
            {consent.fiduciary_name && (
              <p className="text-sm text-gray-500 truncate">{consent.fiduciary_name}</p>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(consent.status)}`}>
          {consent.status}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Purpose */}
        <div className="flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {consent.purpose}
            </p>
          </div>
        </div>

        {/* Data */}
        <div className="flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-1">
              {consent.data}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Expires: {formatDate(consent.expiry)}</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
