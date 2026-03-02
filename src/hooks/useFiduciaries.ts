import { useState, useEffect } from 'react';
import { getFiduciaries, updateFiduciaryStatus as updateStatusAPI } from '../services/admin.service';
import type { Fiduciary, Pagination } from '../types/admin.types';
import toast from 'react-hot-toast';

interface UseFiduciariesParams {
  page?: number;
  limit?: number;
  searchterm?: string;
}

export const useFiduciaries = (params?: UseFiduciariesParams) => {
  const [fiduciaries, setFiduciaries] = useState<Fiduciary[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFiduciaries = async (isRefresh = false) => {
    try {
      isRefresh ? setIsRefreshing(true) : setIsLoading(true);
      const response = await getFiduciaries(params);
      
      // Handle both paginated and legacy response formats
      const responseData = response?.data || response;
      const fiduciariesData = responseData?.fiduciaries || [];
      const paginationData = responseData?.pagination || null;
      
      setFiduciaries(fiduciariesData);
      setPagination(paginationData);
    } catch (error: any) {
      console.error('Failed to fetch fiduciaries:', error);
      toast.error('Failed to load fiduciaries');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await updateStatusAPI(id, status);
      toast.success(`Fiduciary ${status.toLowerCase()} successfully`);
      await fetchFiduciaries(true);
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to update status';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    fetchFiduciaries();
  }, [params?.page, params?.limit, params?.searchterm]);

  // Calculate statistics
  const stats = {
    total: fiduciaries.length,
    active: fiduciaries.filter(f => f.status === 'Active').length,
    suspended: fiduciaries.filter(f => f.status === 'Suspended').length,
    pending: fiduciaries.filter(f => f.status === 'Pending').length,
  };

  return { 
    fiduciaries,
    pagination,
    isLoading, 
    isRefreshing, 
    stats,
    refetch: fetchFiduciaries,
    updateStatus
  };
};
