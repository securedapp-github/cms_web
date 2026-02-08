import { useState } from 'react';
import { Link2, Copy, Trash2, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import type { Webhook } from '../../types/fiduciary.types';
import { useWebhooks } from '../../hooks/queries/useWebhooks';
import toast from 'react-hot-toast';

interface WebhookRowProps {
  webhook: Webhook;
  onEdit: () => void;
  index: number;
}

const WebhookRow = ({ webhook, onEdit, index }: WebhookRowProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { updateStatus, deleteWebhook, isUpdating, isDeleting } = useWebhooks();

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    const start = url.substring(0, 25);
    const end = url.substring(url.length - 22);
    return `${start}...${end}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhook.url);
      toast.success('Webhook URL copied!');
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

  const isActive = webhook.status === 'Active';

  return (
    <>
      {/* Mobile Card View */}
      <tr className="md:hidden">
        <td colSpan={4} className="p-0">
          <div
            className="p-4 border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header with icon and status */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm">
                  <Link2 className="w-5 h-5" />
                </div>
                <button
                  onClick={handleToggleStatus}
                  disabled={isUpdating}
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
            </div>

            {/* URL */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-1">Webhook URL</p>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {webhook.url}
              </p>
            </div>

            {/* Events */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-1">Events</p>
              <div className="flex flex-wrap gap-1">
                {webhook.events?.slice(0, 2).map((event, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {event}
                  </span>
                ))}
                {webhook.events?.length > 2 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-50 text-slate-700 border border-slate-100">
                    +{webhook.events.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Copy URL"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
              <button
                onClick={onEdit}
                className="flex-1 p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors duration-300 flex items-center justify-center gap-2"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors duration-300"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
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
        {/* Icon & URL */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {truncateUrl(webhook.url, 40)}
              </p>
              <p className="text-xs text-slate-500 font-mono truncate">
                {webhook.url}
              </p>
            </div>
          </div>
        </td>

        {/* Events */}
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-1">
            {webhook.events?.slice(0, 2).map((event, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
              >
                {event}
              </span>
            ))}
            {webhook.events?.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-700 border border-slate-100">
                +{webhook.events.length - 2} more
              </span>
            )}
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleToggleStatus}
            disabled={isUpdating}
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
              title="Copy URL"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition-colors duration-300"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
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
          <td colSpan={4}>
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Delete Webhook</h3>
                    <p className="text-sm text-slate-600">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">
                  Are you sure you want to delete this webhook? You'll stop receiving notifications for all configured events.
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

export default WebhookRow;
