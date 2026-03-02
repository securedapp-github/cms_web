import { X } from 'lucide-react';
import type { UserWithRoles } from '../../types/admin.types';
import { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';

interface UserRoleCardProps {
  user: UserWithRoles;
  onRemoveRole: (email: string, role: string) => Promise<boolean>;
}

const UserRoleCard = ({ user, onRemoveRole }: UserRoleCardProps) => {
  const [removingRole, setRemovingRole] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roleToRemove, setRoleToRemove] = useState<string>('');

  const handleRemoveRole = async (role: string) => {
    setRoleToRemove(role);
    setShowConfirm(true);
  };

  const confirmRemoveRole = async () => {
    setShowConfirm(false);
    setRemovingRole(roleToRemove);
    await onRemoveRole(user.email, roleToRemove);
    setRemovingRole(null);
    setRoleToRemove('');
  };

  const getRoleBadgeColor = (role: string) => {
    if (!role) {
      return 'bg-slate-100 text-slate-600 border-slate-200';
    }
    
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'fiduciary':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'user':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group">
      {/* User Info - Compact Single Row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {user.name}
            </h3>
            {user.isSuperAdmin && (
              <span className="px-1.5 py-0.5 text-[10px] bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 rounded font-bold border border-amber-200 shrink-0">
                SUPER
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
              user.status === 'Active' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {user.status}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium truncate">{user.email}</p>
        </div>
      </div>
      
      {/* Roles Section - Compact Layout */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-600 font-bold shrink-0">Roles:</span>
        
        {/* Primary Role */}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getRoleBadgeColor(user.primaryRole)} shrink-0`}>
          {user.primaryRole}
          <span className="ml-1 text-[9px] opacity-60">(Primary)</span>
        </span>
        
        {/* Additional Roles */}
        {user.additionalRoles.length > 0 ? (
          user.additionalRoles.map((roleData, index) => {
            const role = typeof roleData === 'string' ? roleData : roleData.role;
            if (!role) return null;
            return (
              <span
                key={index}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border-2 ${getRoleBadgeColor(role)} hover:shadow-md transition-all duration-200`}
              >
                {role}
                <button
                  onClick={() => handleRemoveRole(role)}
                  disabled={removingRole === role}
                  className="w-4 h-4 rounded-full bg-linear-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 flex items-center justify-center transition-all duration-200 disabled:opacity-50 shadow-sm"
                  title="Remove role"
                >
                  {removingRole === role ? (
                    <div className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <X className="w-2.5 h-2.5 text-white" />
                  )}
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-slate-400 italic text-xs">No additional roles</span>
        )}
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmRemoveRole}
        title="Remove Role"
        message={`Are you sure you want to remove the "${roleToRemove}" role from ${user.name}? This action cannot be undone.`}
        confirmText="Remove Role"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default UserRoleCard;
