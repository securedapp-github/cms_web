import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserNotifications, updateNotificationAction } from '../../services/user.service';
import toast from 'react-hot-toast';

export const useNotifications = () => {
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: getUserNotifications,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Update notification action (accept/decline)
  const actionMutation = useMutation({
    mutationFn: ({ consentId, isRead }: { consentId: number; isRead: number }) =>
      updateNotificationAction(consentId, isRead),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['userConsents'] });
      const action = variables.isRead === 1 ? 'accepted' : 'declined';
      toast.success(response.message || `Consent ${action} successfully`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to perform action');
    },
  });

  const notifications = data?.notifications || [];

  return {
    notifications,
    isLoading,
    error,
    refetch,
    performAction: actionMutation.mutateAsync,
    isUpdating: actionMutation.isPending,
  };
};
