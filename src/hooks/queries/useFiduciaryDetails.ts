import { useQuery } from '@tanstack/react-query';
import { getFiduciaryDetails } from '../../services/user.service';

export const useFiduciaryDetails = (fiduciaryId: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fiduciaryDetails', fiduciaryId],
    queryFn: () => getFiduciaryDetails(fiduciaryId!),
    enabled: !!fiduciaryId && fiduciaryId > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    fiduciary: data?.fiduciary || null,
    isLoading,
    error,
  };
};
