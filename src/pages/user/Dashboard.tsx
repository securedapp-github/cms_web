import { useState, useEffect } from 'react';
import { Shield, Search, Filter, Loader2, User, Calendar, Eye } from 'lucide-react';
import { useUserConsents } from '../../hooks/queries/useUserConsents';
import { ConsentDetailsModal } from '../../components/user/ConsentDetailsModal';
import { ConsentFilterModal } from '../../components/user/ConsentFilterModal';
import Pagination from '../../components/common/Pagination';
import type { GetConsentsParams } from '../../types/user.types';

const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState<GetConsentsParams>({
    page: 1,
    limit: 10,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedConsent, setSelectedConsent] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Debounce search query with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleApplyFilters = (newFilters: GetConsentsParams) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  // Count active filters
  const activeFiltersCount =
    (filters.status ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0) +
    (filters.fiduciaryId ? 1 : 0);

  const { consents, pagination, isLoading, updateStatus, refetch } = useUserConsents({
    searchterm: debouncedSearch || undefined,
    status: filters.status || undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    fiduciaryId: filters.fiduciaryId,
    page,
    limit: 10,
  });

  const handleViewDetails = (consent: any) => {
    setSelectedConsent(consent);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || 'pending';
    switch (statusLower) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
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

  const getDisplayStatus = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'active') return 'Accepted';
    if (normalizedStatus === 'suspended') return 'Rejected';
    return status;
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                My Consents
              </h1>
              <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">
                Manage your consent preferences and data access
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {/* {pagination && (
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Consents</p>
                <p className="text-2xl md:text-3xl font-bold text-indigo-900">
                  {pagination.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Showing {consents.length} of {pagination.total} consents
            </p>
          </div>
        )} */}

        {/* Consents Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          {/* Search and Filter */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 bg-linear-to-r from-indigo-50/50 to-violet-50/50">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search consents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-2.5 rounded-xl border-2 border-slate-200 text-xs md:text-sm font-medium text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                onClick={() => setShowFilterModal(true)}
                className="relative flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-xl border-2 border-slate-200 text-xs md:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
            {pagination && (
            <p className="text-xs text-slate-500 mt-2">
              Showing {consents.length} of {pagination.total} consents
            </p>
            )}

          </div>

          {/* Content Area */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="ml-3 text-slate-600 font-medium">Loading consents...</span>
              </div>
            ) : consents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No consents found
                </h3>
                <p className="text-slate-600">
                  {searchQuery || activeFiltersCount > 0
                    ? 'No consents match your filters.'
                    : 'You have no consent records yet.'}
                </p>
              </div>
            ) : (
              <>
                {/* Consent Table */}
                <table className="w-full">
                  <thead className="hidden md:table-header-group bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Fiduciary</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Data Items</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Expires</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {consents.map((consent, index) => (
                      <tr
                        key={consent.consent_id}
                        onClick={() => handleViewDetails(consent)}
                        className="hidden md:table-row group border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* ID */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-slate-600">
                            #{consent.consent_id}
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
                                {consent.fiduciary_name || consent.entity || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Purpose */}
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm text-slate-700 truncate">
                            {consent.purpose_code || consent.purpose || 'N/A'}
                          </p>
                        </td>

                        {/* Data Items */}
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm text-slate-700 truncate">
                            {consent.data || 'N/A'}
                          </p>
                        </td>

                        {/* Created Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {formatDate(consent.time_and_date)}
                          </div>
                        </td>

                        {/* Expiry Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {formatDate(consent.expiry)}
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(consent.status)}`}>
                            {getDisplayStatus(consent.status)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(consent);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* Mobile Card View */}
                    {consents.map((consent, index) => (
                      <tr key={`mobile-${consent.consent_id}`} className="md:hidden">
                        <td colSpan={8} className="p-0">
                          <div
                            onClick={() => handleViewDetails(consent)}
                            className="p-4 border-b border-slate-100 hover:bg-linear-to-r hover:from-indigo-50/30 hover:to-violet-50/30 transition-all duration-300 animate-fade-in cursor-pointer"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {/* Header Row */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono text-slate-500">
                                #{consent.consent_id}
                              </span>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(consent.status)}`}>
                                {getDisplayStatus(consent.status)}
                              </span>
                            </div>

                            {/* Fiduciary Info */}
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                {consent.consent_id.toString().slice(-2)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                  {consent.fiduciary_name || consent.entity || 'N/A'}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {consent.purpose_code || consent.purpose || 'N/A'}
                                </p>
                              </div>
                            </div>

                            {/* Data Items */}
                            <div className="mb-3">
                              <p className="text-xs text-slate-600 mb-1">Data Items:</p>
                              <p className="text-sm text-slate-700 line-clamp-2">
                                {consent.data || 'N/A'}
                              </p>
                            </div>

                            {/* Dates */}
                            <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Created: {formatDate(consent.time_and_date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>Expires: {formatDate(consent.expiry)}</span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(consent);
                              }}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
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
      </div>

      {/* Modals */}
      {showFilterModal && (
        <ConsentFilterModal
          isOpen={showFilterModal}
          currentFilters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {showDetailsModal && selectedConsent && (
        <ConsentDetailsModal
          consent={selectedConsent}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          onUpdateStatus={async (consentId, status) => {
            await updateStatus({ consentId, status });
            await refetch();
          }}
          isUpdating={false}
        />
      )}
    </div>
  );
};

export default UserDashboard;
