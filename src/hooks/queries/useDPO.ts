import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyDPOs, addDPO, updateDPO, deleteDPO } from '../../services/fiduciary.service';
import toast from 'react-hot-toast';
import type { AddDPORequest, UpdateDPORequest } from '../../types/fiduciary.types';

export const useDPO = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  // Fetch all DPOs for authenticated fiduciary
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['dpos'],
    queryFn: getMyDPOs,
    enabled,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  // Add DPO mutation
  const addDPOMutation = useMutation({
    mutationFn: (data: AddDPORequest) => addDPO(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['dpos'] });
      toast.success(response.message || 'DPO added successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add DPO');
    },
  });

  // Update DPO mutation
  const updateDPOMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDPORequest }) => updateDPO(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['dpos'] });
      toast.success(response.message || 'DPO updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update DPO');
    },
  });

  // Delete DPO mutation
  const deleteDPOMutation = useMutation({
    mutationFn: (id: number) => deleteDPO(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['dpos'] });
      toast.success(response.message || 'DPO deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete DPO');
    },
  });

  const dpos = data?.dataProtectionOfficers || [];

  return {
    dpos,
    isLoading,
    error,
    refetch,
    addDPO: addDPOMutation.mutateAsync,
    updateDPO: updateDPOMutation.mutateAsync,
    deleteDPO: deleteDPOMutation.mutateAsync,
    isSubmitting: addDPOMutation.isPending || updateDPOMutation.isPending || deleteDPOMutation.isPending,
  };
};
