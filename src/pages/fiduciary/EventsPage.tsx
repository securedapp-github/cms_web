import { useState, useEffect } from 'react';
import { Activity, Calendar, Filter, Search, ChevronDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useEvents } from '../../hooks/queries/useEvents';
import ConsentDetailsModal from '../../components/fiduciary/ConsentDetailsModal';
import Pagination from '../../components/common/Pagination';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<any>(null);

  // Debounce search with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [eventTypeFilter]);

  const { events, pagination, isLoading, error } = useEvents({
    status: eventTypeFilter === 'all' ? undefined : eventTypeFilter,
    searchterm: debouncedSearch,
    page,
    limit: 10,
  });

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'pending', label: 'Pending Consents' },
    { value: 'active', label: 'Active Consents' },
    { value: 'suspended', label: 'Suspended Consents' },
    { value: 'expired', label: 'Expired Consents' },
  ];

  const getEventIcon = (status: string) => {
    if (status === 'active') {
      return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    } else if (status === 'suspended') {
      return <XCircle className="w-5 h-5 text-orange-600" />;
    } else if (status === 'expired') {
      return <AlertCircle className="w-5 h-5 text-rose-600" />;
    }
    return <Activity className="w-5 h-5 text-amber-600" />;
  };

  const getEventBadgeColor = (status: string) => {
    if (status === 'active') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (status === 'suspended') {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    } else if (status === 'expired') {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Events & Activity Log
              </h1>
              <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">
                Track all consent and data access events in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by purpose, user, or purpose code..."
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm md:text-base placeholder:text-slate-400"
              />
            </div>

            {/* Event Type Filter */}
            <div className="relative lg:w-72">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full px-4 py-2.5 md:py-3 bg-slate-50 border-2 border-slate-200 rounded-xl hover:bg-white hover:border-indigo-300 transition-all duration-300 flex items-center justify-between font-medium text-slate-700 text-sm md:text-base shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                  <span className="truncate">{eventTypes.find(t => t.value === eventTypeFilter)?.label}</span>
                </span>
                <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <>
                  {/* Mobile backdrop */}
                  <div
                    className="fixed inset-0 z-10 lg:hidden"
                    onClick={() => setShowFilters(false)}
                  ></div>
                  <div className="absolute top-full mt-2 w-full bg-white border-2 border-slate-200 rounded-xl shadow-2xl z-20 max-h-72 overflow-y-auto">
                    {eventTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setEventTypeFilter(type.value);
                          setShowFilters(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-indigo-50 transition-all duration-200 text-sm md:text-base first:rounded-t-xl last:rounded-b-xl ${
                          eventTypeFilter === type.value ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || eventTypeFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-600 font-semibold">Active Filters:</span>
              {searchQuery && (
                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200">
                  Search: "{searchQuery}"
                </span>
              )}
              {eventTypeFilter !== 'all' && (
                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200">
                  Type: {eventTypes.find(t => t.value === eventTypeFilter)?.label}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setEventTypeFilter('all');
                }}
                className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg font-semibold transition-all duration-200"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Events List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
              <span>Event Timeline</span>
              {events && events.length > 0 && (
                <span className="text-sm md:text-base font-normal text-slate-500">
                  ({events.length})
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
              <span className="text-slate-600 font-medium">Loading events...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-linear-to-br from-rose-50/30 to-pink-50/30 rounded-xl border-2 border-rose-100">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Failed to load events
              </h3>
              <p className="text-slate-600">
                Please try again later or contact support if the issue persists.
              </p>
            </div>
          ) : !events || events.length === 0 ? (
            <div className="text-center py-20 bg-linear-to-br from-slate-50/50 to-indigo-50/30 rounded-xl border-2 border-dashed border-slate-300">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {searchQuery || eventTypeFilter !== 'all' ? 'No matching events found' : 'No events yet'}
              </h3>
              <p className="text-slate-600">
                {searchQuery || eventTypeFilter !== 'all' 
                  ? 'Try adjusting your filters or search query'
                  : 'Consent events will appear here as they occur'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event, index) => {
                const eventTitle = event.granted_at 
                  ? `Consent Granted - #${event.consent_id}`
                  : event.suspended_at 
                  ? `Consent Suspended - #${event.consent_id}`
                  : event.expiry && new Date(event.expiry) < new Date()
                  ? `Consent Expired - #${event.consent_id}`
                  : `Consent Requested - #${event.consent_id}`;
                
                return (
                  <div
                    key={event.consent_id || index}
                    onClick={() => setSelectedConsent({
                      id: event.consent_id,
                      consent_id: event.consent_id,
                      user_name: event.user_name,
                      user_email: event.user_email,
                      user_mobile: event.user_mobile,
                      entity: event.entity,
                      data: event.data,
                      purpose: event.purpose_text,
                      purpose_text: event.purpose_text,
                      purpose_code: event.purpose_code,
                      time_and_date: event.time_and_date,
                      created_at: event.time_and_date,
                      requested_at: event.time_and_date,
                      granted_at: event.granted_at,
                      suspended_at: event.suspended_at,
                      expiry: event.expiry,
                      expires_at: event.expiry,
                      status: event.status || 'Pending'
                    })}
                    className="border-2 border-slate-200 rounded-xl p-4 md:p-5 hover:border-indigo-400 hover:shadow-lg hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer group animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      {/* Icon */}
                      <div className="mt-1 shrink-0 w-10 h-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-300 transition-all duration-300">
                        {getEventIcon(event.status)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 md:gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base">
                              {eventTitle}
                            </h3>
                            <div className="space-y-1.5">
                              <p className="text-xs md:text-sm text-slate-600 flex items-center gap-2">
                                <span className="font-semibold text-slate-700">User:</span>
                                <span className="font-medium">{event.user_name || 'N/A'}</span>
                                <span className="hidden md:inline text-slate-500">({event.user_email || 'N/A'})</span>
                              </p>
                              {(event.purpose || event.purpose_text) && (
                                <p className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                                  <span className="font-semibold text-slate-700 shrink-0">Purpose:</span>
                                  <span className="font-medium line-clamp-2">{event.purpose_text || event.purpose}</span>
                                </p>
                              )}
                              {event.purpose_code && (
                                <p className="text-xs md:text-sm text-slate-600 flex items-center gap-2">
                                  <span className="font-semibold text-slate-700">Code:</span>
                                  <code className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg font-mono text-xs font-semibold text-slate-700">{event.purpose_code}</code>
                                </p>
                              )}
                            </div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 whitespace-nowrap shrink-0 ${getEventBadgeColor(event.status)}`}>
                            {(event.status || 'pending').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Pagination
                pagination={pagination}
                onPageChange={(newPage) => setPage(newPage)}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>

      {/* Consent Details Modal */}
      {selectedConsent && (
        <ConsentDetailsModal
          consent={selectedConsent}
          onClose={() => setSelectedConsent(null)}
        />
      )}
    </div>
  );
};

export default EventsPage;
