import { RefreshCw, Search, Building2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useFiduciaries } from '../../hooks/useFiduciaries';
import { useState, useEffect } from 'react';
import FiduciaryRow from '../../components/admin/FiduciaryRow';
import FiduciaryDetailsModal from '../../components/admin/FiduciaryDetailsModal';
import Pagination from '../../components/common/Pagination';
import type { Fiduciary } from '../../types/admin.types';

const FiduciariesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter] = useState<string>('all');
  const [selectedFiduciary, setSelectedFiduciary] = useState<Fiduciary | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [page, setPage] = useState(1);

  // Debounce search query with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { fiduciaries, pagination, isLoading, isRefreshing, stats, refetch, updateStatus } = useFiduciaries({
    page,
    limit: 10,
    searchterm: debouncedSearch,
  });

  // Client-side filtering for status (if API doesn't support it)
  const filteredFiduciaries = statusFilter === 'all' 
    ? fiduciaries 
    : fiduciaries.filter(f => f.status === statusFilter);

  const handleViewDetails = (fiduciary: Fiduciary) => {
    setSelectedFiduciary(fiduciary);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Fiduciary Management</h1>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium">
                Manage and monitor all registered fiduciaries
              </p>
            </div>
            <button
              onClick={() => refetch(true)}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-all shadow-md hover:shadow-lg text-sm font-bold text-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="mt-4 text-slate-600 font-medium">Loading fiduciaries...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-bold">Total</p>
                    <p className="text-xl font-bold text-slate-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-bold">Active</p>
                    <p className="text-xl font-bold text-slate-900">{stats.active}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 hover:shadow-xl hover:border-rose-300 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-bold">Suspended</p>
                    <p className="text-xl font-bold text-slate-900">{stats.suspended}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 hover:shadow-xl hover:border-amber-300 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-bold">Pending</p>
                    <p className="text-xl font-bold text-slate-900">{stats.pending}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, ID, or industry..."
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Status Filter */}
                {/* <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border-2 border-slate-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm font-bold text-slate-900"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Pending">Pending</option>
                  <option value="Expired">Expired</option>
                </select> */}
              </div>

              <div className="mt-3 text-xs text-slate-600 font-medium">
                Showing {filteredFiduciaries.length} of {fiduciaries.length} fiduciaries
              </div>
            </div>

            {/* Fiduciaries List */}
            {filteredFiduciaries.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No fiduciaries found matching your criteria' 
                    : 'No fiduciaries available'}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden">
                {/* Desktop Table */}
                <table className="hidden md:table w-full">
                  <thead className="bg-linear-to-r from-indigo-50 to-violet-50 border-b-2 border-indigo-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Fiduciary</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y-2 divide-slate-100">
                    {filteredFiduciaries.map((fiduciary) => (
                      <FiduciaryRow
                        key={fiduciary.id}
                        fiduciary={fiduciary}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden p-3">
                  {filteredFiduciaries.map((fiduciary) => (
                    <FiduciaryRow
                      key={fiduciary.id}
                      fiduciary={fiduciary}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <Pagination
                      pagination={pagination}
                      onPageChange={(newPage) => setPage(newPage)}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Details Modal */}
        <FiduciaryDetailsModal
          fiduciary={selectedFiduciary}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedFiduciary(null);
          }}
          onUpdateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default FiduciariesPage;
