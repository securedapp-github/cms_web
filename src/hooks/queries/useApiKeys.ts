import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getApiKeys,
  createApiKey,
  revokeApiKey,
  reactivateApiKey,
  deleteApiKey as deleteApiKeyApi,
} from '../../services/fiduciary.service';
import toast from 'react-hot-toast';

export const useApiKeys = (filters?: { page?: number; limit?: number }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['apiKeys', filters],
    queryFn: () => getApiKeys(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const createKey = useMutation({
    mutationFn: (data: { keyName: string; environment: 'live' | 'test' }) =>
      createApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      // Note: Don't show toast here as we'll show the API key modal
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create API key');
    },
  });

  const revokeKey = useMutation({
    mutationFn: (id: number) => revokeApiKey(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success(data.message || 'API key revoked successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to revoke API key');
    },
  });

  const reactivateKey = useMutation({
    mutationFn: (id: number) => reactivateApiKey(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success(data.message || 'API key reactivated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to reactivate API key');
    },
  });

  const deleteKey = useMutation({
    mutationFn: (id: number) => deleteApiKeyApi(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] });
      toast.success(data.message || 'API key deleted permanently');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete API key');
    },
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const apiKeys = responseData?.keys || [];
  const total = data?.total || apiKeys.length;
  const pagination = responseData?.pagination || data?.pagination;

  return {
    apiKeys,
    total,
    pagination,
    isLoading,
    error,
    refetch,
    createKey: createKey.mutateAsync,
    revokeKey: revokeKey.mutateAsync,
    reactivateKey: reactivateKey.mutateAsync,
    deleteKey: deleteKey.mutateAsync,
    isCreating: createKey.isPending,
    isRevoking: revokeKey.isPending,
    isReactivating: reactivateKey.isPending,
    isDeleting: deleteKey.isPending,
  };
};
