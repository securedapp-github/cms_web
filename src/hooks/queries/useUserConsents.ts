import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserConsents, updateUserConsentStatus } from '../../services/user.service';
import toast from 'react-hot-toast';
import type { GetConsentsParams, ConsentStatus } from '../../types/user.types';

export const useUserConsents = (filters?: GetConsentsParams) => {
  const queryClient = useQueryClient();

  // Fetch user consents
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['userConsents', filters],
    queryFn: () => getUserConsents(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Update consent status mutation
  const updateStatus = useMutation({
    mutationFn: ({ consentId, status }: { consentId: number; status: ConsentStatus }) =>
      updateUserConsentStatus(consentId, status),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['userConsents'] });
      toast.success(response.message || 'Consent status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update consent status');
    },
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const consents = responseData?.consents || [];
  const pagination = responseData?.pagination || data?.pagination;

  return {
    consents,
    pagination,
    isLoading,
    error,
    refetch,
    updateStatus: updateStatus.mutateAsync,
    isUpdating: updateStatus.isPending,
  };
};
