import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWebhooks,
  createWebhook,
  updateWebhookStatus,
  deleteWebhook as deleteWebhookApi,
} from '../../services/fiduciary.service';
import toast from 'react-hot-toast';

export const useWebhooks = (filters?: { page?: number; limit?: number }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['webhooks', filters],
    queryFn: () => getWebhooks(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const addWebhook = useMutation({
    mutationFn: (data: { url: string; events?: string[] }) => createWebhook(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success(data.message || 'Webhook added successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add webhook');
    },
  });

  const deleteWebhook = useMutation({
    mutationFn: (id: number) => deleteWebhookApi(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success(data.message || 'Webhook deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete webhook');
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateWebhookStatus({ id, status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['webhooks'] });
      toast.success(data.message || 'Webhook status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update webhook status');
    },
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const webhooks = responseData?.webhooks || [];
  const pagination = responseData?.pagination || data?.pagination;

  return {
    webhooks,
    pagination,
    isLoading,
    error,
    refetch,
    addWebhook: addWebhook.mutateAsync,
    deleteWebhook: deleteWebhook.mutateAsync,
    updateStatus: updateStatus.mutateAsync,
    isAdding: addWebhook.isPending,
    isDeleting: deleteWebhook.isPending,
    isUpdating: updateStatus.isPending,
  };
};
