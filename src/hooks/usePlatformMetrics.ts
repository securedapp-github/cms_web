import { useState, useEffect } from 'react';
import { getPlatformMetrics } from '../services/admin.service';
import type { PlatformMetrics } from '../types/admin.types';
import toast from 'react-hot-toast';

export const usePlatformMetrics = () => {
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMetrics = async (isRefresh = false) => {
    try {
      isRefresh ? setIsRefreshing(true) : setIsLoading(true);
      const response = await getPlatformMetrics();
      setMetrics(response.metrics);
    } catch (error: any) {
      console.error('Failed to fetch platform metrics:', error);
      toast.error('Failed to load platform metrics');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return { 
    metrics, 
    isLoading, 
    isRefreshing, 
    refetch: fetchMetrics 
  };
};
