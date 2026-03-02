const ConsentCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-200 px-4 py-3 h-14" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
      </div>
      <div className="pt-3">
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const WebhookCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-200 px-4 py-3 h-14" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="flex flex-wrap gap-2">
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-6 bg-gray-200 rounded w-20" />
      </div>
      <div className="pt-2 flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>
    </div>
  </div>
);

const ApiKeyCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-200 px-4 py-3 h-14" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-3 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded" />
      </div>
      <div className="pt-2 grid grid-cols-2 gap-2">
        <div className="h-9 bg-gray-200 rounded" />
        <div className="h-9 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const PurposeCodeCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-200 px-4 py-3 h-14" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="pt-2">
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const EventCardSkeleton = () => (
  <div className="border-2 border-gray-200 rounded-xl p-4 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0 mt-1" />
      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16 ml-auto" />
        </div>
      </div>
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl" />
    </div>
    <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-32" />
  </div>
);

const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Header Skeleton */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>
      </div>
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Content Section Skeleton */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-48" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <ConsentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export {
  ConsentCardSkeleton,
  WebhookCardSkeleton,
  ApiKeyCardSkeleton,
  PurposeCodeCardSkeleton,
  EventCardSkeleton,
  StatCardSkeleton,
  DashboardSkeleton,
};
