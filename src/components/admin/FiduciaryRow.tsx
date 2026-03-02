import { Building2, Mail, Phone, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Fiduciary } from '../../types/admin.types';

interface FiduciaryRowProps {
  fiduciary: Fiduciary;
  onViewDetails: (fiduciary: Fiduciary) => void;
}

const FiduciaryRow = ({ fiduciary, onViewDetails }: FiduciaryRowProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: CheckCircle,
        };
      case 'Suspended':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-700',
          border: 'border-rose-200',
          icon: XCircle,
        };
      case 'Pending':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: Clock,
        };
      case 'Expired':
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-300',
          icon: XCircle,
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-300',
          icon: Building2,
        };
    }
  };

  const statusConfig = getStatusConfig(fiduciary.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      {/* Desktop Table Row */}
      <tr
        onClick={() => onViewDetails(fiduciary)}
        className="hidden md:table-row border-b-2 border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {fiduciary.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 font-medium">ID: {fiduciary.id}</span>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Mail className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="truncate max-w-[200px]">{fiduciary.email}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Phone className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="whitespace-nowrap">{fiduciary.mobile || 'N/A'}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            <StatusIcon className="w-3 h-3" />
            {fiduciary.status}
          </span>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(fiduciary);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all duration-200 text-xs font-bold shadow-md hover:shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
        </td>
      </tr>

      {/* Mobile Card */}
      <div
        onClick={() => onViewDetails(fiduciary)}
        className="md:hidden bg-white rounded-xl border-2 border-slate-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer group mb-3"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Building2 className="w-5 h-5" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {fiduciary.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">ID: {fiduciary.id}</p>
            </div>
          </div>

          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 shrink-0 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            {fiduciary.status}
          </span>
        </div>

        {/* Contact Details */}
        <div className="space-y-1.5 mb-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Mail className="w-3 h-3 text-indigo-500 shrink-0" />
            <span className="truncate">{fiduciary.email}</span>
          </div>
          {fiduciary.mobile && (
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Phone className="w-3 h-3 text-indigo-500 shrink-0" />
              <span>{fiduciary.mobile}</span>
            </div>
          )}
        </div>

        {/* Action Prompt */}
        <div className="pt-3 border-t-2 border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600">View Details</span>
            <span className="text-xs text-indigo-500 font-medium group-hover:text-indigo-700">Click to view →</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FiduciaryRow;
