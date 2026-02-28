import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPurposeCodes,
  addPurposeCode,
  deletePurposeCode as deletePurposeCodeApi,
} from '../../services/fiduciary.service';
import toast from 'react-hot-toast';

export const usePurposeCodes = (filters?: { page?: number; limit?: number }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['purposeCodes', filters],
    queryFn: () => getPurposeCodes(filters),
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  const addCode = useMutation({
    mutationFn: (data: { purpose: string; code: number }) => addPurposeCode(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purposeCodes'] });
      toast.success(data.message || 'Purpose code added successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add purpose code');
    },
  });

  const deleteCode = useMutation({
    mutationFn: (id: number) => deletePurposeCodeApi(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['purposeCodes'] });
      toast.success(data.message || 'Purpose code deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete purpose code');
    },
  });

  // Handle both nested and legacy response formats
  const responseData = data?.data || data;
  const purposeCodes = responseData?.purposeCards || [];
  const pagination = responseData?.pagination || data?.pagination;

  return {
    purposeCodes,
    pagination,
    isLoading,
    error,
    refetch,
    addCode: addCode.mutateAsync,
    deleteCode: deleteCode.mutateAsync,
    isAdding: addCode.isPending,
    isDeleting: deleteCode.isPending,
  };
};
