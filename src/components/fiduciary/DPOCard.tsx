import { User, Mail, Phone, Star, Edit2, Trash2 } from 'lucide-react';
import type { DPO } from '../../types/fiduciary.types';

interface DPOCardProps {
  dpo: DPO;
  onEdit?: (dpo: DPO) => void;
  onDelete?: (dpo: DPO) => void;
  showActions?: boolean;
}

export const DPOCard = ({ dpo, onEdit, onDelete, showActions = true }: DPOCardProps) => {
  if (!dpo || typeof dpo !== 'object' || !dpo.id) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      {/* Header with name and actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-800">{dpo.name || 'N/A'}</h3>
              {dpo.is_primary && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold border border-amber-300">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  Primary
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center gap-2 ml-2">
            {onEdit && (
              <button
                onClick={() => onEdit(dpo)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit DPO"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(dpo)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete DPO"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-medium break-all">{dpo.email || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-sm font-medium">{dpo.phone || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};
