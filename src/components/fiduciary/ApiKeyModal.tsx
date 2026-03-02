import { useState } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';
import { useApiKeys } from '../../hooks/queries/useApiKeys';

interface ApiKeyModalProps {
  onClose: () => void;
  onSuccess: (apiKey: string, keyName: string, environment: 'live' | 'test') => void;
}

const ApiKeyModal = ({ onClose, onSuccess }: ApiKeyModalProps) => {
  const { createKey, isCreating } = useApiKeys();
  const [keyName, setKeyName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateName = (value: string): boolean => {
    setNameError('');
    
    if (!value.trim()) {
      setNameError('Key name is required');
      return false;
    }

    if (value.trim().length < 3) {
      setNameError('Key name must be at least 3 characters');
      return false;
    }

    if (value.trim().length > 50) {
      setNameError('Key name must not exceed 50 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateName(keyName)) {
      return;
    }

    try {
      const result = await createKey({
        keyName: keyName.trim(),
        environment: 'live',
      });

      // Pass the full API key to the success modal
      onSuccess(result.apiKey, result.keyName, result.environment);
    } catch (error) {
      // Error is already handled by the hook with toast
      console.error('Failed to create API key:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Create New API Key</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Key Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Key Name *
            </label>
            <input
              type="text"
              value={keyName}
              onChange={(e) => {
                setKeyName(e.target.value);
                if (nameError) validateName(e.target.value);
              }}
              onBlur={() => validateName(keyName)}
              placeholder="e.g., Production API Key, Development Key"
              className={`w-full px-4 py-3 rounded-lg border ${
                nameError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2`}
            />
            {nameError && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{nameError}</p>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Choose a descriptive name to identify this key later
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-900 mb-1">
                  Important Security Notice
                </h4>
                <p className="text-xs text-amber-800">
                  Your API key will be shown only once after creation. Make sure to copy and store it securely. 
                  You won't be able to see the full key again.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="flex-1 px-5 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !!nameError}
              className="flex-1 px-5 py-3 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>Create API Key</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
