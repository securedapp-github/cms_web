import { useState, useEffect, useCallback } from 'react';
import { getFeedbacks, sendFeedbackResponse as sendResponseAPI } from '../services/admin.service';
import type { Feedback, Pagination } from '../types/admin.types';
import toast from 'react-hot-toast';

interface UseFeedbacksParams {
  page?: number;
  limit?: number;
  searchterm?: string;
}

export const useFeedbacks = (params?: UseFeedbacksParams) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFeedbacks = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setIsRefreshing(true) : setIsLoading(true);
      const response = await getFeedbacks(params);
      
      // Handle both paginated and legacy response formats
      const responseData = response?.data || response;
      const feedbacksData = responseData?.feedbacks || [];
      const paginationData = responseData?.pagination || null;
      
      setFeedbacks(feedbacksData);
      setPagination(paginationData);
    } catch (error: any) {
      console.error('Failed to fetch feedbacks:', error);
      toast.error('Failed to load feedbacks');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [params]);

  const sendResponse = useCallback(async (feedbackId: number, response: string) => {
    try {
      await sendResponseAPI(feedbackId, response);
      toast.success('Response sent successfully');
      await fetchFeedbacks(true);
      return true;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to send response';
      toast.error(message);
      return false;
    }
  }, [fetchFeedbacks]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Separate pending and resolved
  const pendingFeedbacks = feedbacks.filter(f => !f.response);
  const resolvedFeedbacks = feedbacks.filter(f => f.response);

  return { 
    feedbacks,
    pagination,
    pendingFeedbacks,
    resolvedFeedbacks,
    isLoading, 
    isRefreshing, 
    refetch: fetchFeedbacks,
    sendResponse
  };
};
