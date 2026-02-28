import { useMutation } from '@tanstack/react-query';
import { submitFeedback as submitFeedbackApi } from '../../services/fiduciary.service';
import toast from 'react-hot-toast';
import type { FeedbackRequest } from '../../types/fiduciary.types';

export const useFeedback = () => {
  const feedback = useMutation({
    mutationFn: (data: FeedbackRequest) => submitFeedbackApi(data),
    onSuccess: (data) => {
      toast.success(data.message || 'Feedback submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit feedback');
    },
  });

  return {
    submitFeedback: feedback.mutateAsync,
    isSubmitting: feedback.isPending,
  };
};
