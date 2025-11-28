import { X, Filter, Calendar, Building2, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { GetConsentsParams } from '../../types/user.types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: GetConsentsParams) => void;
  currentFilters: GetConsentsParams;
}

export const ConsentFilterModal = ({
  isOpen,
  onClose,
  onApply,
  currentFilters,
}: FilterModalProps) => {
  const [filters, setFilters] = useState<GetConsentsParams>(currentFilters);

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: GetConsentsParams = { page: 1, limit: 10 };
    setFilters(resetFilters);
    onApply(resetFilters);
    onClose();
  };

  const setToPresentDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setFilters({ ...filters, dateTo: today });
  };

  const activeFiltersCount = 
    (filters.status && filters.status !== 'all' ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0) +
    (filters.fiduciaryId ? 1 : 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-white" />
            <h2 className="text-xl font-bold text-white">Filter Consents</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status || 'all'}
              onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? '' : e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Expired">Expired</option>
              <option value="Revoked">Revoked</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date From
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                max={filters.dateTo || undefined}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
              <span>Date To</span>
              <button
                type="button"
                onClick={setToPresentDate}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Set to present date
              </button>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                min={filters.dateFrom || undefined}
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Fiduciary ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fiduciary ID (Optional)
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={filters.fiduciaryId || ''}
                onChange={(e) => setFilters({ ...filters, fiduciaryId: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Enter fiduciary ID"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-700 mb-2">
                Active Filters ({activeFiltersCount})
              </p>
              <div className="flex flex-wrap gap-2">
                {filters.status && filters.status !== 'all' && (
                  <span className="px-2 py-1 bg-white text-indigo-700 rounded text-xs font-medium">
                    Status: {filters.status}
                  </span>
                )}
                {filters.dateFrom && (
                  <span className="px-2 py-1 bg-white text-indigo-700 rounded text-xs font-medium">
                    From: {filters.dateFrom}
                  </span>
                )}
                {filters.dateTo && (
                  <span className="px-2 py-1 bg-white text-indigo-700 rounded text-xs font-medium">
                    To: {filters.dateTo}
                  </span>
                )}
                {filters.fiduciaryId && (
                  <span className="px-2 py-1 bg-white text-indigo-700 rounded text-xs font-medium">
                    Fiduciary: {filters.fiduciaryId}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
