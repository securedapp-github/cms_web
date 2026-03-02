import { useState } from 'react';
import { Link2, Copy, Trash2, MoreVertical, CheckCircle2 } from 'lucide-react';
import type { Webhook } from '../../types/fiduciary.types';
import { useWebhooks } from '../../hooks/queries/useWebhooks';
import toast from 'react-hot-toast';

interface WebhookCardProps {
  webhook: Webhook;
  onEdit: () => void;
}

const WebhookCard = ({ webhook, onEdit }: WebhookCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { updateStatus, deleteWebhook, isUpdating, isDeleting } = useWebhooks();

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url;
    const start = url.substring(0, 20);
    const end = url.substring(url.length - 17);
    return `${start}...${end}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhook.url);
      toast.success('Webhook URL copied to clipboard!');
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = webhook.status === 'Active' ? 'Inactive' : 'Active';
    await updateStatus({ id: webhook.id, status: newStatus });
  };

  const handleDelete = async () => {
    await deleteWebhook(webhook.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
        {/* Header with gradient accent */}
        <div className="h-1 bg-linear-to-r from-blue-600 to-indigo-600"></div>

        <div className="p-5">
          {/* Top row: Icon and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              {/* Webhook Icon */}
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
                <Link2 className="w-5 h-5" />
              </div>

              {/* Webhook URL */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {truncateUrl(webhook.url, 35)}
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-gray-100 transition-colors shrink-0"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 break-all">{webhook.url}</p>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>

              {showActions && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowActions(false)}
                  ></div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => {
                        onEdit();
                        setShowActions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit Events
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setShowActions(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete Webhook
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Events Section */}
          {webhook.events && webhook.events.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Subscribed Events</p>
              <div className="flex flex-wrap gap-2">
                {webhook.events.map((event, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status Toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">Status</span>
            <button
              onClick={handleToggleStatus}
              disabled={isUpdating}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                webhook.status === 'Active'
                  ? 'bg-green-600'
                  : 'bg-gray-300'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  webhook.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Status Badge */}
          <div className="mt-3 flex items-center justify-center">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                webhook.status === 'Active'
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {webhook.status === 'Active' && (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {webhook.status}
            </span>
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
                <h3 className="text-lg font-bold text-gray-900">Delete Webhook?</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                Are you sure you want to delete this webhook? You will stop receiving events at this URL.
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

export default WebhookCard;
