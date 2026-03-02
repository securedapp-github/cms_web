import { X, Filter, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ConsentFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  currentFilters: FilterValues;
}

export interface FilterValues {
  status: string;
  dateFrom: string;
  dateTo: string;
}

const ConsentFilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters }: ConsentFilterModalProps) => {
  const [filters, setFilters] = useState<FilterValues>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterValues = {
      status: 'all',
      dateFrom: '',
      dateTo: '',
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const setDateToPresent = () => {
    const today = new Date().toISOString().split('T')[0];
    setFilters({ ...filters, dateTo: today });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Filter Consents</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">
              Date Range
            </label>
            
            {/* Date From */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                From Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  max={filters.dateTo || undefined}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Date To */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                To Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  min={filters.dateFrom || undefined}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="button"
                onClick={setDateToPresent}
                className="mt-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
              >
                Set to present date
              </button>
            </div>
          </div>

          {/* Active Filters Info */}
          {(filters.status !== 'all' || filters.dateFrom || filters.dateTo) && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
              <p className="text-xs font-semibold text-indigo-900 mb-1">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.status !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700">
                    Status: {filters.status}
                  </span>
                )}
                {filters.dateFrom && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700">
                    From: {filters.dateFrom}
                  </span>
                )}
                {filters.dateTo && (
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700">
                    To: {filters.dateTo}
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
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Reset
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsentFilterModal;
