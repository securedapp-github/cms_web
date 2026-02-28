import { useState } from 'react';
import { X, Link2, AlertCircle } from 'lucide-react';
import { useWebhooks } from '../../hooks/queries/useWebhooks';

interface WebhookModalProps {
  onClose: () => void;
  webhook?: {
    id: number;
    url: string;
    events: string[];
  } | null;
}

const WebhookModal = ({ onClose, webhook }: WebhookModalProps) => {
  const { addWebhook, isAdding } = useWebhooks();
  const [url, setUrl] = useState(webhook?.url || '');
  const [urlError, setUrlError] = useState('');

  const isEditing = !!webhook;

  const validateUrl = (value: string): boolean => {
    setUrlError('');
    
    if (!value.trim()) {
      setUrlError('URL is required');
      return false;
    }

    try {
      const urlObj = new URL(value);
      if (urlObj.protocol !== 'https:') {
        setUrlError('URL must use HTTPS protocol for security');
        return false;
      }
      return true;
    } catch {
      setUrlError('Please enter a valid URL');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      return;
    }

    await addWebhook({ url: url.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? 'Edit Webhook Events' : 'Add New Webhook'}
            </h2>
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
          {/* URL Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Webhook URL *
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) validateUrl(e.target.value);
              }}
              onBlur={() => validateUrl(url)}
              disabled={isEditing}
              placeholder="https://your-domain.com/webhook"
              className={`w-full px-4 py-3 rounded-lg border ${
                urlError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            {urlError && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{urlError}</p>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              🔒 For security, only HTTPS URLs are accepted
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Webhook Information
                </h4>
                <p className="text-xs text-blue-800">
                  Your webhook will receive POST requests with event data when consent events occur.
                  Ensure your endpoint can handle JSON payloads and responds with a 2xx status code.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isAdding}
              className="flex-1 px-5 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding || !!urlError}
              className="flex-1 px-5 py-3 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>Add Webhook</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebhookModal;
