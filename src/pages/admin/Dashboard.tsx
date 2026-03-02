import { RefreshCw, Users, Shield, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePlatformMetrics } from '../../hooks/usePlatformMetrics';
import { useUsersWithRoles } from '../../hooks/useUsersWithRoles';
import MetricCard from '../../components/admin/MetricCard';
import AssignRoleModal from '../../components/admin/AssignRoleModal';
import UserRoleCard from '../../components/admin/UserRoleCard';
import Pagination from '../../components/common/Pagination';
import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { metrics, isLoading, isRefreshing, refetch } = usePlatformMetrics();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Debounce search query with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { users, pagination, isLoading: usersLoading, assignRole, removeRole } = useUsersWithRoles({
    page,
    limit: 10,
    searchterm: debouncedSearch,
  });

  const isSuperAdmin = user?.isSuperAdmin === true;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">
                  Welcome back, {user?.name}! {isSuperAdmin && <span className="text-indigo-600 font-bold">(Super Admin)</span>}
                </p>
              </div>
            </div>
            <button
              onClick={() => refetch(true)}
              disabled={isRefreshing}
              className="px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-all duration-300 shadow-sm text-sm font-semibold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <span className="text-slate-600 font-medium">Loading dashboard...</span>
          </div>
        ) : (
          <>
            {/* Platform Metrics */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                  Platform Metrics
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <MetricCard
                  title="Total Users"
                  total={metrics?.User.total || 0}
                  active={metrics?.User.active || 0}
                  pending={metrics?.User.pending || 0}
                  icon="users"
                  color="blue"
                />
                <MetricCard
                  title="Total Fiduciaries"
                  total={metrics?.Fiduciary.total || 0}
                  active={metrics?.Fiduciary.active || 0}
                  pending={metrics?.Fiduciary.pending || 0}
                  icon="trending"
                  color="purple"
                />
                <MetricCard
                  title="Total Admins"
                  total={metrics?.Admin.total || 0}
                  active={metrics?.Admin.active || 0}
                  pending={metrics?.Admin.pending || 0}
                  icon="check"
                  color="green"
                />
              </div>
            </div>

            {/* User Role Management (Super Admin Only) */}
            {isSuperAdmin && (
              <div>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                      User Role Management
                      <span className="px-2.5 py-1 text-xs bg-linear-to-r from-indigo-100 to-violet-100 text-indigo-700 rounded-lg font-bold border border-indigo-200">
                        Super Admin
                      </span>
                    </h2>
                    <button 
                      onClick={() => setShowAssignModal(true)}
                      className="px-4 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl"
                    >
                      Assign Role
                    </button>
                  </div>

                  {usersLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                      <span className="text-slate-600 font-medium">Loading users...</span>
                    </div>
                  ) : (
                    <>
                      {/* Search Bar */}
                      <div className="mb-6">
                        <div className="relative">
                          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or ID..."
                            className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm md:text-base placeholder:text-slate-400 shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                        <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border-2 border-slate-200 hover:shadow-md transition-all duration-300">
                          <p className="text-xs font-semibold text-slate-600 mb-1">Total Users</p>
                          <p className="text-2xl font-bold text-slate-900">{users.length}</p>
                        </div>
                        <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200 hover:shadow-md transition-all duration-300">
                          <p className="text-xs font-semibold text-emerald-700 mb-1">Active</p>
                          <p className="text-2xl font-bold text-emerald-700">{users.filter(u => u.status === 'Active').length}</p>
                        </div>
                        <div className="bg-linear-to-br from-violet-50 to-purple-50 rounded-xl p-4 border-2 border-violet-200 hover:shadow-md transition-all duration-300">
                          <p className="text-xs font-semibold text-violet-700 mb-1">With Extra Roles</p>
                          <p className="text-2xl font-bold text-violet-700">{users.filter(u => u.additionalRoles.length > 0).length}</p>
                        </div>
                        <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200 hover:shadow-md transition-all duration-300">
                          <p className="text-xs font-semibold text-amber-700 mb-1">Super Admins</p>
                          <p className="text-2xl font-bold text-amber-700">{users.filter(u => u.isSuperAdmin).length}</p>
                        </div>
                      </div>

                      {/* User List */}
                      {users.length === 0 ? (
                        <div className="text-center py-20 bg-linear-to-br from-slate-50/50 to-indigo-50/30 rounded-xl border-2 border-dashed border-slate-300">
                          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-indigo-600" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {searchQuery ? 'No users found' : 'No users available'}
                          </h3>
                          <p className="text-slate-600">
                            {searchQuery ? 'Try adjusting your search query' : 'Users will appear here once added'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                          {users.map((userItem, index) => (
                            <div
                              key={userItem.id}
                              className="animate-fade-in"
                              style={{ animationDelay: `${index * 30}ms` }}
                            >
                              <UserRoleCard
                                user={userItem}
                                onRemoveRole={removeRole}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pagination */}
                      {pagination && pagination.totalPages > 1 && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <Pagination
                            pagination={pagination}
                            onPageChange={(newPage) => setPage(newPage)}
                            isLoading={usersLoading}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Assign Role Modal */}
                <AssignRoleModal
                  isOpen={showAssignModal}
                  onClose={() => setShowAssignModal(false)}
                  onAssign={assignRole}
                />
              </div>
            )}

            {/* Quick Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="text-xl font-bold text-gray-900">{metrics?.User.active || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Fiduciaries</p>
                    <p className="text-xl font-bold text-gray-900">{metrics?.Fiduciary.active || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pending Approvals</p>
                    <p className="text-xl font-bold text-gray-900">
                      {(metrics?.User.pending || 0) + (metrics?.Fiduciary.pending || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Admins</p>
                    <p className="text-xl font-bold text-gray-900">{metrics?.Admin.total || 0}</p>
                  </div>
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
