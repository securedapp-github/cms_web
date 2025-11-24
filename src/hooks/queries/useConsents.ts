import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyConsentRequests, updateConsentStatus } from '../../services/fiduciary.service';
import toast from 'react-hot-toast';

export const useConsents = (filters?: { 
  status?: string; 
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['consents', filters],
    queryFn: () => getMyConsentRequests(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const updateStatus = useMutation({
    mutationFn: ({ consentId, status }: { consentId: number; status: string }) =>
      updateConsentStatus({ consentId, status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['consents'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success(data.message || 'Consent status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update consent status');
    },
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const consents = responseData?.consents || responseData?.requests || [];
  const counts = responseData?.counts || responseData?.count || {
    total: 0,
    pending: 0,
    active: 0,
    suspended: 0,
    expired: 0,
  };
  const pagination = responseData?.pagination || data?.pagination;

  return {
    consents,
    counts,
    pagination,
    isLoading,
    error,
    refetch,
    updateStatus: updateStatus.mutateAsync,
    isUpdating: updateStatus.isPending,
  };
};
