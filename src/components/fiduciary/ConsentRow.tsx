import { useState } from 'react';
import { User, Calendar, FileText, Eye } from 'lucide-react';
import type { ConsentRequest } from '../../types/fiduciary.types';
import ConsentDetailsModal from './ConsentDetailsModal';

interface ConsentRowProps {
  consent: ConsentRequest;
  index: number;
}

const ConsentRow = ({ consent, index }: ConsentRowProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || 'pending';
    switch (statusLower) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
      case 'requested':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'inactive':
      case 'suspended':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'revoked':
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    if (dateString.includes('/')) {
      return dateString.split(' ')[0];
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      {/* Mobile Card View */}
      <tr className="md:hidden">
        <td colSpan={7} className="p-0">
          <div
            onClick={() => setShowDetails(true)}
            className="p-4 border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(consent.status || 'Pending')} transition-colors duration-300`}>
                {consent.status || 'Pending'}
              </span>
              <span className="text-xs font-mono text-slate-500">
                #{consent.consent_id || consent.id}
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {consent.consent_id?.toString().slice(-3) || consent.id?.toString().slice(-3) || '---'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {consent.user_name || 'N/A'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {consent.user_email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Data/Purpose */}
            <div className="flex items-start gap-2 mb-3">
              <FileText className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-700 line-clamp-2">
                {consent.data || consent.purpose || 'N/A'}
              </p>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(consent.time_and_date || consent.created_at || consent.requested_at)}</span>
              </div>
              {(consent.expiry || consent.expires_at) && (
                <span className="text-amber-600">
                  Exp: {consent.expiry || formatDate(consent.expires_at)}
                </span>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </td>
      </tr>

      {/* Desktop Table Row */}
      <tr
        className="hidden md:table-row group border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 cursor-pointer animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
        onClick={() => setShowDetails(true)}
      >
        {/* ID */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
              {consent.consent_id?.toString().slice(-3) || consent.id?.toString().slice(-3) || '---'}
            </div>
            <span className="text-sm font-mono text-slate-600">
              #{consent.consent_id || consent.id}
            </span>
          </div>
        </td>

        {/* User Info */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {consent.user_name || 'N/A'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {consent.user_email || 'N/A'}
              </p>
            </div>
          </div>
        </td>

        {/* Data/Purpose */}
        <td className="px-6 py-4 max-w-xs">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-700 line-clamp-2">
              {consent.data || consent.purpose || 'N/A'}
            </p>
          </div>
        </td>

        {/* Requested Date */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{formatDate(consent.time_and_date || consent.created_at || consent.requested_at)}</span>
          </div>
        </td>

        {/* Expiry */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-slate-600">
            {consent.expiry || formatDate(consent.expires_at) || 'N/A'}
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(consent.status || 'Pending')} transition-colors duration-300`}>
            {consent.status || 'Pending'}
          </span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
        </td>
      </tr>

      {showDetails && (
        <ConsentDetailsModal
          consent={consent}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ConsentRow;
