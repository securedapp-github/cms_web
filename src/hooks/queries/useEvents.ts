import { useQuery } from '@tanstack/react-query';
import { getFiduciaryEvents } from '../../services/fiduciary.service';

export const useEvents = (filters?: {
  status?: string;
  searchterm?: string;
  page?: number;
  limit?: number;
}) => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['events', filters],
    queryFn: () => getFiduciaryEvents(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const events = responseData?.events || [];
  const counts = responseData?.counts || responseData?.count || {
    total: 0,
    pending: 0,
    active: 0,
    suspended: 0,
    expired: 0,
  };
  const pagination = responseData?.pagination || data?.pagination;

  return {
    events,
    counts,
    pagination,
    isLoading,
    error,
    refetch,
  };
};
