import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  isLoading = false
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: 'from-rose-500 to-red-600',
      button: 'from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700',
      border: 'border-rose-200'
    },
    warning: {
      icon: 'from-amber-500 to-orange-600',
      button: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
      border: 'border-amber-200'
    },
    info: {
      icon: 'from-indigo-500 to-violet-600',
      button: 'from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700',
      border: 'border-indigo-200'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-slate-200 animate-scale-in">
        {/* Header */}
        <div className="px-6 py-5 border-b-2 border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${styles.icon} flex items-center justify-center`}>
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 transition-all duration-200 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed font-medium">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 hover:shadow-md transition-all duration-200 disabled:opacity-50 border-2 border-slate-200"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-6 py-3 bg-linear-to-r ${styles.button} text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 border-2 ${styles.border}`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
