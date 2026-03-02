import { X, Building2, FileText, Calendar, Clock, Mail, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { Notification } from '../../types/user.types';
import toast from 'react-hot-toast';

interface NotificationDetailsModalProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (consentId: number, isRead: number) => Promise<void>;
  isUpdating: boolean;
}

export const NotificationDetailsModal = ({
  notification,
  isOpen,
  onClose,
  onAction,
  isUpdating,
}: NotificationDetailsModalProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const isPending = notification?.status?.toLowerCase() === 'pending';

  if (!isOpen || !notification) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAction = async (isRead: number) => {
    setIsChanging(true);
    
    try {
      await onAction(notification.consent_id, isRead);
      toast.success(`Consent ${isRead === 1 ? 'accepted' : 'declined'} successfully`);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to perform action');
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Notification Details</h2>
          <button
            onClick={onClose}
            disabled={isChanging}
            className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Consent ID */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
              Consent ID: <span className="font-mono font-bold text-indigo-600">#{notification.consent_id}</span>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
              notification.status.toLowerCase() === 'pending' 
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-gray-50 text-gray-700 border-gray-200'
            }`}>
              {notification.status}
            </span>
          </div>

          {/* Entity */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Entity</p>
                <p className="font-semibold text-gray-900">{notification.entity}</p>
              </div>
            </div>

            {/* Fiduciary Name */}
            {notification.fiduciary_name && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Fiduciary Name</p>
                  <p className="font-semibold text-gray-900">{notification.fiduciary_name}</p>
                </div>
              </div>
            )}

            {/* Fiduciary Email */}
            {notification.fiduciary_email && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Fiduciary Email</p>
                  <p className="font-medium text-gray-900 break-all">{notification.fiduciary_email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Purpose */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Purpose</p>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {notification.purpose_text || 'N/A'}
            </p>
          </div>

          {/* Data */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Data Requested</p>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {notification.data}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Requested At</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(notification.time_and_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Expires On</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(notification.expiry)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isPending ? (
            <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
              {/* Accept Button */}
              <button
                onClick={() => handleAction(1)}
                disabled={isChanging || isUpdating}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isChanging ? 'Accepting...' : 'Accept'}</span>
              </button>

              {/* Decline Button */}
              <button
                onClick={() => handleAction(0)}
                disabled={isChanging || isUpdating}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                <XCircle className="w-5 h-5" />
                <span>{isChanging ? 'Declining...' : 'Decline'}</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200">
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 text-center font-medium">
                  This notification has already been processed.
                </p>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={isChanging}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
