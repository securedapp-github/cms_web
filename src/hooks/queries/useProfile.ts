import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '../../services/profile.service';
import toast from 'react-hot-toast';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
    staleTime: 0, // Always consider data stale
    refetchOnMount: 'always', // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  const updateProfile = useMutation({
    mutationFn: (profileData: any) => updateUserProfile(profileData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(response.message || 'Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });

  return {
    profile: data?.profile || null,
    isLoading,
    error,
    refetch,
    updateProfile: updateProfile.mutateAsync,
    isUpdating: updateProfile.isPending,
  };
};
