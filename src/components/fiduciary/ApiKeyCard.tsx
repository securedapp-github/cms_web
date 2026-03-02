import { useState } from 'react';
import { Key, Copy, Trash2, BarChart3 } from 'lucide-react';
import type { ApiKey } from '../../types/fiduciary.types';
import { useApiKeys } from '../../hooks/queries/useApiKeys';
import toast from 'react-hot-toast';

interface ApiKeyCardProps {
  apiKey: ApiKey;
}

const ApiKeyCard = ({ apiKey }: ApiKeyCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { revokeKey, reactivateKey, deleteKey, isDeleting } = useApiKeys();

  const copyToClipboard = async () => {
    try {
      const fullKey = `${apiKey.key_prefix}${'x'.repeat(32)}`; // Can't copy actual key, show masked
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
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-5">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${isActive ? 'bg-teal-100' : 'bg-red-100'} flex items-center justify-center shrink-0`}>
                <Key className={`w-7 h-7 ${isActive ? 'text-teal-600' : 'text-red-600'}`} />
              </div>

              {/* Key Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {apiKey.key_name}
                </h3>
                <code className="text-sm font-mono text-gray-600">
                  {apiKey.key_prefix}...
                </code>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-11 h-11 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors shrink-0"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
            </button>
          </div>

          {/* Usage Stats */}
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900 font-semibold">{apiKey.usage_count}</strong> uses
            </span>
          </div>

          {/* Status Toggle and Copy */}
          <div className="flex items-center gap-3">
            {/* Toggle Switch */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <button
                onClick={handleToggleStatus}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isActive
                    ? 'bg-green-500 focus:ring-green-500'
                    : 'bg-red-400 focus:ring-red-400'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    isActive ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-semibold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="ml-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Copy className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete API Key?</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                ⚠️ Warning: This will permanently delete the API key. This action cannot be reversed, and you'll need to update any applications using this key.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiKeyCard;
