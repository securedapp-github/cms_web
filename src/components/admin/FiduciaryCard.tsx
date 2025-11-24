import { Building2, Mail, Phone } from 'lucide-react';
import type { Fiduciary } from '../../types/admin.types';

interface FiduciaryCardProps {
  fiduciary: Fiduciary;
  onViewDetails: (fiduciary: Fiduciary) => void;
}

const FiduciaryCard = ({ fiduciary, onViewDetails }: FiduciaryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Suspended':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Expired':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(fiduciary)}
      className="bg-white rounded-xl border-2 border-slate-200 p-4 sm:p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-indigo-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shrink-0 transition-all duration-200">
            <Building2 className="w-6 h-6" />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{fiduciary.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">ID: {fiduciary.id}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 shrink-0 ${getStatusColor(fiduciary.status)}`}>
          {fiduciary.status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="truncate">{fiduciary.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>{fiduciary.mobile}</span>
        </div>
      </div>
    </div>
  );
};

export default FiduciaryCard;
