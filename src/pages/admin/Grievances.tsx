import { useState, useRef, useMemo } from 'react';
import { Search, Filter, RefreshCw, CheckCircle2, MessageSquare } from 'lucide-react';
import { useFeedbacks } from '../../hooks/useFeedbacks';
import FeedbackRow from '../../components/admin/FeedbackRow';
import FeedbackResponseModal from '../../components/admin/FeedbackResponseModal';
import Pagination from '../../components/common/Pagination';
import type { Feedback } from '../../types/admin.types';

type CategoryFilter = 'All' | 'Technical' | 'General' | 'Complaint' | 'Suggestion';

export default function GrievancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Memoize params to prevent unnecessary re-renders
  const feedbackParams = useMemo(() => ({
    page,
    limit: 10,
    searchterm: activeSearch,
  }), [page, activeSearch]);

  const { feedbacks, pagination, isLoading, refetch, sendResponse } = useFeedbacks(feedbackParams);

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setPage(1);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleOpenModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  const handleSendResponse = async (feedbackId: number, response: string) => {
    const success = await sendResponse(feedbackId, response);
    if (success) {
      handleCloseModal();
    }
    return success;
  };

  // Client-side category filtering (if API doesn't support it)
  const filteredFeedbacks = categoryFilter === 'All'
    ? feedbacks
    : feedbacks.filter(f => f.category === categoryFilter);

  const filteredPending = filteredFeedbacks.filter(f => !f.response);
  const filteredResolved = filteredFeedbacks.filter(f => f.response);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Grievance Management
                </h1>
              </div>
              <p className="text-slate-600 font-medium">
                View and respond to user feedbacks and complaints
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-4 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-bold whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none appearance-none bg-white font-bold text-slate-900"
              >
                <option value="All">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="General">General</option>
                <option value="Complaint">Complaint</option>
                <option value="Suggestion">Suggestion</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-xl font-bold"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

      {/* Pending Feedbacks Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pending Response</h2>
          <span className="px-3 py-1.5 bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 rounded-lg text-sm font-bold border-2 border-amber-200">
            {filteredPending.length}
          </span>
        </div>

        <div className="bg-white rounded-xl border-2 border-amber-200 shadow-lg overflow-hidden">
          {filteredPending.length === 0 ? (
            <div className="text-center py-12 bg-linear-to-br from-amber-50 to-orange-50">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                All Caught Up!
              </h3>
              <p className="text-slate-600 font-medium">
                {searchQuery || categoryFilter !== 'All'
                  ? 'No pending feedbacks match your filters'
                  : 'No pending feedbacks at the moment'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <table className="hidden md:table w-full">
                <thead className="bg-linear-to-r from-amber-50 to-orange-50 border-b-2 border-amber-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y-2 divide-slate-100">
                  {filteredPending.map((feedback) => (
                    <FeedbackRow
                      key={feedback.id}
                      feedback={feedback}
                      onRespond={handleOpenModal}
                    />
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="md:hidden p-3">
                {filteredPending.map((feedback) => (
                  <FeedbackRow
                    key={feedback.id}
                    feedback={feedback}
                    onRespond={handleOpenModal}
                    isMobile={true}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Resolved Feedbacks Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Resolved</h2>
          <span className="px-3 py-1.5 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-lg text-sm font-bold border-2 border-emerald-200">
            {filteredResolved.length}
          </span>
        </div>

        <div className="bg-white rounded-xl border-2 border-slate-200 shadow-lg overflow-hidden">
          {filteredResolved.length === 0 ? (
            <div className="text-center py-12 bg-linear-to-br from-slate-50 to-slate-100">
              <div className="w-16 h-16 bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No Resolved Feedbacks
              </h3>
              <p className="text-slate-600 font-medium">
                {searchQuery || categoryFilter !== 'All'
                  ? 'No resolved feedbacks match your filters'
                  : 'Resolved feedbacks will appear here'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <table className="hidden md:table w-full">
                <thead className="bg-linear-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y-2 divide-slate-100">
                  {filteredResolved.map((feedback) => (
                    <FeedbackRow
                      key={feedback.id}
                      feedback={feedback}
                      onRespond={handleOpenModal}
                    />
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="md:hidden p-3">
                {filteredResolved.map((feedback) => (
                  <FeedbackRow
                    key={feedback.id}
                    feedback={feedback}
                    onRespond={handleOpenModal}
                    isMobile={true}
                  />
                ))}
              </div>
            </>
          )}

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

      {/* Feedback Response Modal */}
      <FeedbackResponseModal
        feedback={selectedFeedback}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSendResponse={handleSendResponse}
      />
      </div>
    </div>
  );
}
