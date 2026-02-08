import { useState, useEffect } from 'react';
import { Shield, ChevronDown, ChevronUp, Loader2, Link2, Plus, Key, Code2, Search, Filter } from 'lucide-react';
import { useConsents } from '../../hooks/queries/useConsents';
import { useWebhooks } from '../../hooks/queries/useWebhooks';
import { useApiKeys } from '../../hooks/queries/useApiKeys';
import { usePurposeCodes } from '../../hooks/queries/usePurposeCodes';
import ConsentRow from '../../components/fiduciary/ConsentRow';
import WebhookRow from '../../components/fiduciary/WebhookRow';
import WebhookModal from '../../components/fiduciary/WebhookModal';
import ApiKeyRow from '../../components/fiduciary/ApiKeyRow';
import ApiKeyModal from '../../components/fiduciary/ApiKeyModal';
import ApiKeySuccessModal from '../../components/fiduciary/ApiKeySuccessModal';
import PurposeCodeRow from '../../components/fiduciary/PurposeCodeRow';
import PurposeCodeModal from '../../components/fiduciary/PurposeCodeModal';
import ConsentFilterModal, { type FilterValues } from '../../components/fiduciary/ConsentFilterModal';
import Pagination from '../../components/common/Pagination';

const FiduciaryDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState<FilterValues>({
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [consentsPage, setConsentsPage] = useState(1);
  const [webhooksPage, setWebhooksPage] = useState(1);
  const [apiKeysPage, setApiKeysPage] = useState(1);
  const [purposeCodesPage, setPurposeCodesPage] = useState(1);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<any>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [createdApiKey, setCreatedApiKey] = useState<{key: string; name: string; environment: 'live' | 'test'} | null>(null);
  const [showPurposeCodeModal, setShowPurposeCodeModal] = useState(false);
  
  // Collapsible section states
  const [isConsentsExpanded, setIsConsentsExpanded] = useState(true);
  const [isWebhooksExpanded, setIsWebhooksExpanded] = useState(true);
  const [isApiKeysExpanded, setIsApiKeysExpanded] = useState(true);
  const [isPurposeCodesExpanded, setIsPurposeCodesExpanded] = useState(true);

  // Debounce search query with 500ms timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setConsentsPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setConsentsPage(1);
  }, [filters]);

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Count active filters
  const activeFiltersCount = 
    (filters.status !== 'all' ? 1 : 0) + 
    (filters.dateFrom ? 1 : 0) + 
    (filters.dateTo ? 1 : 0);
  
  const { consents, counts, pagination: consentsPagination, isLoading, error } = useConsents({
    status: filters.status === 'all' ? undefined : filters.status,
    searchterm: debouncedSearch,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    page: consentsPage,
    limit: 10,
  });

  const { webhooks, pagination: webhooksPagination, isLoading: isLoadingWebhooks, error: webhooksError } = useWebhooks({
    page: webhooksPage,
    limit: 10,
  });
  
  const { apiKeys, pagination: apiKeysPagination, isLoading: isLoadingApiKeys, error: apiKeysError } = useApiKeys({
    page: apiKeysPage,
    limit: 10,
  });

  const { purposeCodes, pagination: purposeCodesPagination, isLoading: isLoadingPurposeCodes, error: purposeCodesError } = usePurposeCodes({
    page: purposeCodesPage,
    limit: 10,
  });

  const isError = error !== null;

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
                Fiduciary Dashboard
              </h1>
              <p className="text-slate-600 text-xs md:text-sm mt-0.5 md:mt-1">
                Manage consent requests and monitor data access
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {counts && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {/* Total */}
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-3">
                <p className="text-xs md:text-sm font-medium text-slate-600 mb-2 md:mb-0">Total Consents</p>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-linear-to-br from-indigo-100 to-violet-100 flex items-center justify-center transition-all duration-300">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{counts.total}</p>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl shadow-md border border-amber-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-3">
                <p className="text-xs md:text-sm font-medium text-amber-700 mb-2 md:mb-0">Pending</p>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center transition-all duration-300">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-amber-900">{counts.pending}</p>
            </div>

            {/* Active */}
            <div className="bg-white rounded-xl shadow-md border border-emerald-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-3">
                <p className="text-xs md:text-sm font-medium text-emerald-700 mb-2 md:mb-0">Active</p>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center transition-all duration-300">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-emerald-900">{counts.active}</p>
            </div>

            {/* Suspended */}
            <div className="bg-white rounded-xl shadow-md border border-orange-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-3">
                <p className="text-xs md:text-sm font-medium text-orange-700 mb-2 md:mb-0">Suspended</p>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-linear-to-br from-orange-100 to-red-100 flex items-center justify-center transition-all duration-300">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-orange-900">{counts.suspended}</p>
            </div>

            {/* Expired */}
            <div className="bg-white rounded-xl shadow-md border border-rose-200 p-4 md:p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 md:mb-3">
                <p className="text-xs md:text-sm font-medium text-rose-700 mb-2 md:mb-0">Expired</p>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-linear-to-br from-rose-100 to-pink-100 flex items-center justify-center transition-all duration-300">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-rose-900">{counts.expired}</p>
            </div>
          </div>
        )}

        {/* Consent Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 bg-linear-to-r from-indigo-50/50 to-violet-50/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsConsentsExpanded(!isConsentsExpanded)}
                  className="p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
                  aria-label={isConsentsExpanded ? "Collapse section" : "Expand section"}
                >
                  {isConsentsExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Consent Requests
                </h2>
              </div>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search consents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 md:py-2.5 rounded-xl border-2 border-slate-200 text-xs md:text-sm font-medium text-slate-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                {/* Filter Button */}
                <button
                  onClick={() => setShowFilterModal(true)}
                  className="relative flex items-center gap-2 px-4 py-2 md:py-2.5 rounded-xl border-2 border-slate-200 text-xs md:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 cursor-pointer"
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
            </div>
          </div>

          {/* Content Area */}
          {isConsentsExpanded && (
            <div className="overflow-x-auto animate-slide-down">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="ml-3 text-slate-600 font-medium">Loading consents...</span>
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Failed to load consents
                </h3>
                <p className="text-slate-600">
                  Please try again later or contact support if the issue persists.
                </p>
              </div>
            ) : consents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No consent requests
                </h3>
                <p className="text-slate-600">
                  {searchQuery || activeFiltersCount > 0
                    ? 'No consent requests match your filters.'
                    : 'You have no consent requests yet.'}
                </p>
              </div>
            ) : (
              <>
                {/* Consent Table */}
                <table className="w-full">
                  <thead className="hidden md:table-header-group bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Data/Purpose</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Requested</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {consents.map((consent, index) => (
                      <ConsentRow key={consent.consent_id || consent.id} consent={consent} index={index} />
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {consentsPagination && consentsPagination.totalPages > 1 && (
                  <div className="p-6 bg-slate-50 border-t border-slate-200">
                    <Pagination
                      pagination={consentsPagination}
                      onPageChange={(page) => setConsentsPage(page)}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </>
            )}
            </div>
          )}
        </div>

        {/* Webhook Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 bg-linear-to-r from-indigo-50/50 to-violet-50/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsWebhooksExpanded(!isWebhooksExpanded)}
                  className="p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
                  aria-label={isWebhooksExpanded ? "Collapse section" : "Expand section"}
                >
                  {isWebhooksExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">
                  Webhook Management
                </h2>
              </div>
              
              {/* Add Webhook Button */}
              <button
                onClick={() => setShowWebhookModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Webhook</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          {isWebhooksExpanded && (
            <div className="overflow-x-auto animate-slide-down">
            {isLoadingWebhooks ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <span className="ml-3 text-slate-600 font-medium">Loading webhooks...</span>
              </div>
            ) : webhooksError ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Failed to load webhooks
                </h3>
                <p className="text-slate-600">
                  Please try again later or contact support if the issue persists.
                </p>
              </div>
            ) : webhooks.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No webhooks configured
                </h3>
                <p className="text-slate-600 mb-6">
                  Add a webhook to receive real-time notifications about consent events
                </p>
                <button
                  onClick={() => setShowWebhookModal(true)}
                  className="px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Webhook
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="hidden md:table-header-group bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Webhook URL</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Events</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {webhooks.map((webhook, index) => (
                    <WebhookRow
                      key={webhook.id}
                      webhook={webhook}
                      index={index}
                      onEdit={() => {
                        setEditingWebhook(webhook);
                        setShowWebhookModal(true);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            {webhooksPagination && webhooksPagination.totalPages > 1 && (
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <Pagination
                  pagination={webhooksPagination}
                  onPageChange={(page) => setWebhooksPage(page)}
                  isLoading={isLoadingWebhooks}
                />
              </div>
            )}
            </div>
          )}
        </div>

        {/* API Key Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 bg-linear-to-r from-indigo-50/50 to-violet-50/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsApiKeysExpanded(!isApiKeysExpanded)}
                  className="p-2 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
                  aria-label={isApiKeysExpanded ? "Collapse section" : "Expand section"}
                >
                  {isApiKeysExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">
                    API Key Management
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-0.5 hidden sm:block">
                    Manage your API keys for programmatic access
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-xl text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create API Key</span>
              </button>
            </div>
          </div>

          {/* API Keys List */}
          {isApiKeysExpanded && (
            <div className="overflow-x-auto animate-slide-down">
            {isLoadingApiKeys ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                <span className="ml-3 text-slate-600 font-medium">Loading API keys...</span>
              </div>
            ) : apiKeysError ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Error loading API keys
                </h3>
                <p className="text-slate-600">
                  Please try again later or contact support if the issue persists.
                </p>
              </div>
            ) : !apiKeys || apiKeys.length === 0 ? (
              <div className="text-center py-20 bg-linear-to-br from-indigo-50/30 to-violet-50/30">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No API keys created
                </h3>
                <p className="text-slate-600 mb-6">
                  Create an API key to access our services programmatically
                </p>
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First API Key
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="hidden md:table-header-group bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Key Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Environment</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {apiKeys.map((apiKey, index) => (
                    <ApiKeyRow key={apiKey.id} apiKey={apiKey} index={index} />
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            {apiKeysPagination && apiKeysPagination.totalPages > 1 && (
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <Pagination
                  pagination={apiKeysPagination}
                  onPageChange={(page) => setApiKeysPage(page)}
                  isLoading={isLoadingApiKeys}
                />
              </div>
            )}
            </div>
          )}
        </div>

        {/* Purpose Code Management Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 bg-linear-to-r from-indigo-50/50 to-violet-50/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPurposeCodesExpanded(!isPurposeCodesExpanded)}
                  className="p-2 rounded-lg hover:bg-emerald-100 transition-colors duration-300"
                  aria-label={isPurposeCodesExpanded ? "Collapse section" : "Expand section"}
                >
                  {isPurposeCodesExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">
                    Purpose Code Management
                  </h2>
                  <p className="text-slate-600 text-xs md:text-sm mt-0.5 hidden sm:block">
                    Define purpose codes for consent requests
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPurposeCodeModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-xl text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Purpose Code</span>
              </button>
            </div>
          </div>

          {/* Purpose Codes List */}
          {isPurposeCodesExpanded && (
            <div className="overflow-x-auto animate-slide-down">
            {isLoadingPurposeCodes ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
                <span className="ml-3 text-slate-600 font-medium">Loading purpose codes...</span>
              </div>
            ) : purposeCodesError ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Error loading purpose codes
                </h3>
                <p className="text-slate-600">
                  Please try again later or contact support if the issue persists.
                </p>
              </div>
            ) : !purposeCodes || purposeCodes.length === 0 ? (
              <div className="text-center py-20 bg-linear-to-br from-emerald-50/30 to-teal-50/30">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No purpose codes defined
                </h3>
                <p className="text-slate-600 mb-6">
                  Add purpose codes to categorize and describe data usage
                </p>
                <button
                  onClick={() => setShowPurposeCodeModal(true)}
                  className="px-6 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 inline-flex items-center gap-2 shadow-md hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Purpose Code
                </button>
              </div>
            ) : (
              <table className="w-full">
                <thead className="hidden md:table-header-group bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Purpose Code</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {purposeCodes.map((purposeCode, index) => (
                    <PurposeCodeRow key={purposeCode.id} purposeCode={purposeCode} index={index} />
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            {purposeCodesPagination && purposeCodesPagination.totalPages > 1 && (
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <Pagination
                  pagination={purposeCodesPagination}
                  onPageChange={(page) => setPurposeCodesPage(page)}
                  isLoading={isLoadingPurposeCodes}
                />
              </div>
            )}
            </div>
          )}
        </div>
      </div>

      {/* Webhook Modal */}
      {showWebhookModal && (
        <WebhookModal
          webhook={editingWebhook}
          onClose={() => {
            setShowWebhookModal(false);
            setEditingWebhook(null);
          }}
        />
      )}

      {/* API Key Creation Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          onClose={() => setShowApiKeyModal(false)}
          onSuccess={(key, name, environment) => {
            setCreatedApiKey({ key, name, environment });
            setShowApiKeyModal(false);
          }}
        />
      )}

      {/* API Key Success Modal */}
      {createdApiKey && (
        <ApiKeySuccessModal
          apiKey={createdApiKey.key}
          keyName={createdApiKey.name}
          environment={createdApiKey.environment}
          onClose={() => setCreatedApiKey(null)}
        />
      )}

      {/* Purpose Code Modal */}
      {showPurposeCodeModal && (
        <PurposeCodeModal
          onClose={() => setShowPurposeCodeModal(false)}
        />
      )}

      {/* Consent Filter Modal */}
      <ConsentFilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
};

export default FiduciaryDashboard;
