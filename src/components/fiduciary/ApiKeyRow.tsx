import { useState } from 'react';
import { Key, Copy, Trash2, BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import type { ApiKey } from '../../types/fiduciary.types';
import { useApiKeys } from '../../hooks/queries/useApiKeys';
import toast from 'react-hot-toast';

interface ApiKeyRowProps {
  apiKey: ApiKey;
  index: number;
}

const ApiKeyRow = ({ apiKey, index }: ApiKeyRowProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { revokeKey, reactivateKey, deleteKey, isDeleting } = useApiKeys();

  const copyToClipboard = async () => {
    try {
      const fullKey = `${apiKey.key_prefix}${'x'.repeat(32)}`;
      await navigator.clipboard.writeText(fullKey);
      toast.success('API key prefix copied!');
    } catch {
      toast.error('Failed to copy API key');
    }
  };

  const handleToggleStatus = async () => {
    if (apiKey.status === 'active') {
      await revokeKey(apiKey.id);
    } else {
      await reactivateKey(apiKey.id);
    }
  };

  const handleDelete = async () => {
    await deleteKey(apiKey.id);
    setShowDeleteConfirm(false);
  };

  const isActive = apiKey.status === 'active';

  return (
    <>
      {/* Mobile Card View */}
      <tr className="md:hidden">
        <td colSpan={5} className="p-0">
          <div
            className="p-4 border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header with icon and name */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                isActive 
                  ? 'bg-linear-to-br from-emerald-500 to-teal-600' 
                  : 'bg-linear-to-br from-slate-400 to-slate-500'
              }`}>
                <Key className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {apiKey.key_name}
                </p>
                <code className="text-xs text-slate-500 font-mono">
                  {apiKey.key_prefix}...
                </code>
              </div>
            </div>

            {/* Environment & Status */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                apiKey.environment === 'live'
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {apiKey.environment === 'live' ? '🟢 Live' : '🟡 Test'}
              </span>
              <button
                onClick={handleToggleStatus}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {isActive ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                <span>{isActive ? 'Active' : 'Inactive'}</span>
              </button>
            </div>

            {/* Usage */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-slate-50 rounded-lg">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-slate-900">
                {apiKey.usage_count.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">requests</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Copy key prefix"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        </td>
      </tr>

      {/* Desktop Table Row */}
      <tr
        className="hidden md:table-row group border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Icon & Name */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300 ${
              isActive 
                ? 'bg-linear-to-br from-emerald-500 to-teal-600' 
                : 'bg-linear-to-br from-slate-400 to-slate-500'
            }`}>
              <Key className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {apiKey.key_name}
              </p>
              <code className="text-xs text-slate-500 font-mono">
                {apiKey.key_prefix}...
              </code>
            </div>
          </div>
        </td>

        {/* Environment */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            apiKey.environment === 'live'
              ? 'bg-violet-50 text-violet-700 border border-violet-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {apiKey.environment === 'live' ? '🟢 Live' : '🟡 Test'}
          </span>
        </td>

        {/* Usage Count */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-900">
              {apiKey.usage_count.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">requests</span>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleToggleStatus}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              isActive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isActive ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <XCircle className="w-3.5 h-3.5" />
            )}
            <span>{isActive ? 'Active' : 'Inactive'}</span>
          </button>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2 transition-opacity duration-300">
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-300"
              title="Copy key prefix"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors duration-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <tr>
          <td colSpan={5}>
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Delete API Key</h3>
                    <p className="text-sm text-slate-600">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-2">
                  Are you sure you want to delete <strong>{apiKey.key_name}</strong>?
                </p>
                <p className="text-sm text-slate-600 mb-6">
                  All applications using this API key will immediately lose access.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-linear-to-r from-rose-600 to-pink-600 text-white font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ApiKeyRow;
