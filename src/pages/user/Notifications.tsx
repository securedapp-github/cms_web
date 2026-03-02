import { useState } from 'react';
import { Bell, Calendar, User, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useNotifications } from '../../hooks/queries/useNotifications';
import { NotificationDetailsModal } from '../../components/user/NotificationDetailsModal';
import type { Notification } from '../../types/user.types';
import Loader from '../../components/common/Loader';

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [actingOnId, setActingOnId] = useState<number | null>(null);

  const { notifications, isLoading, performAction, isUpdating } = useNotifications();

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  };

  const handleQuickAction = async (notification: Notification, isRead: number) => {
    setActingOnId(notification.consent_id);
    try {
      await performAction({ consentId: notification.consent_id, isRead });
    } finally {
      setActingOnId(null);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || 'pending';
    switch (statusLower) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'suspended':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'revoked':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const unreadCount = notifications.filter(n => n.is_read === 0 && n.status.toLowerCase() === 'pending').length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Bell className="w-8 h-8 text-indigo-600" />
                Notifications
              </h1>
              <p className="text-slate-600 mt-2">
                All caught up! {unreadCount > 0 && `${unreadCount} pending ${unreadCount === 1 ? 'request' : 'requests'}`}
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                {unreadCount}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No Notifications</h3>
              <p className="text-slate-500">You're all caught up! No new consent requests.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-indigo-50 to-violet-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Fiduciary</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Entity</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Requested</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {notifications.map((notification, index) => (
                      <tr
                        key={notification.consent_id}
                        onClick={() => handleViewDetails(notification)}
                        className="group border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* ID */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-slate-600">
                            #{notification.consent_id}
                          </span>
                        </td>

                        {/* Fiduciary */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">
                                {notification.fiduciary_name || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Entity */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-700 truncate max-w-xs">
                            {notification.entity}
                          </p>
                        </td>

                        {/* Data */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-700 truncate max-w-xs">
                            {notification.data}
                          </p>
                        </td>

                        {/* Requested Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {formatDate(notification.time_and_date)}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            {notification.status.toLowerCase() === 'pending' ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction(notification, 1);
                                  }}
                                  disabled={actingOnId === notification.consent_id}
                                  className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                  title="Accept"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction(notification, 0);
                                  }}
                                  disabled={actingOnId === notification.consent_id}
                                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                  title="Decline"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(notification);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-slate-100">
                {notifications.map((notification, index) => (
                  <div
                    key={notification.consent_id}
                    onClick={() => handleViewDetails(notification)}
                    className="p-4 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-slate-500">
                        #{notification.consent_id}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>

                    {/* Fiduciary Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {notification.consent_id.toString().slice(-2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {notification.fiduciary_name || 'N/A'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {notification.entity}
                        </p>
                      </div>
                    </div>

                    {/* Data */}
                    <div className="mb-3">
                      <p className="text-xs text-slate-600 mb-1">Data Requested:</p>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {notification.data}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Requested: {formatDate(notification.time_and_date)}</span>
                    </div>

                    {/* Actions */}
                    {notification.status.toLowerCase() === 'pending' ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAction(notification, 1);
                          }}
                          disabled={actingOnId === notification.consent_id}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAction(notification, 0);
                          }}
                          disabled={actingOnId === notification.consent_id}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(notification);
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <NotificationDetailsModal
        notification={selectedNotification}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedNotification(null);
        }}
        onAction={async (consentId, isRead) => {
          await performAction({ consentId, isRead });
        }}
        isUpdating={isUpdating}
      />
    </div>
  );
};

export default Notifications;
