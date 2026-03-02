import { X, UserPlus, Mail, Shield } from 'lucide-react';
import { useState } from 'react';

interface AssignRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (email: string, role: string) => Promise<boolean>;
}

const AssignRoleModal = ({ isOpen, onClose, onAssign }: AssignRoleModalProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    setIsSubmitting(true);
    const success = await onAssign(email.trim(), role);
    
    if (success) {
      setEmail('');
      setRole('User');
      onClose();
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-slate-200 animate-scale-in">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Assign Role</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                User Email <span className="text-rose-500">*</span>
              </div>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
              placeholder="user@example.com"
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Enter the email address of the user you want to assign a role to
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                Select Role <span className="text-rose-500">*</span>
              </div>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-bold text-slate-900"
              disabled={isSubmitting}
            >
              <option value="User">User</option>
              <option value="Fiduciary">Fiduciary</option>
              <option value="Admin">Admin</option>
            </select>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              The user will receive this role in addition to their primary role
            </p>
          </div>

          {/* Info Notice */}
          <div className="bg-linear-to-r from-indigo-50 to-violet-50 border-2 border-indigo-200 rounded-xl p-4">
            <p className="text-xs text-indigo-800 font-medium">
              ℹ️ This action will assign the selected role to the user. They will have access to all features associated with this role.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 hover:shadow-md transition-all duration-200 disabled:opacity-50 border-2 border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Assign Role</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignRoleModal;
