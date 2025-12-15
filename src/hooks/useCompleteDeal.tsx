import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { completeDealApi } from '@/api/complete-deal.api';
import { CompleteDealRequest, CompleteDealResponse } from '@/types/common/complete-deal.types';
import { useQueryInvalidator } from '@/hooks/useQueryInvalidator';

export const useCompleteDeal = () => {
  const { invalidateMultipleQueries } = useQueryInvalidator();
  const { mutate, isPending, error } = useMutation<CompleteDealResponse, Error, CompleteDealRequest>({
    mutationFn: async (dealData: CompleteDealRequest) => {
      return await completeDealApi.completeDeal(dealData);
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Deal completed successfully');
      // Invalidate relevant queries if needed
      const queriesToInvalidate = [['transactions'], ['deals']];
      invalidateMultipleQueries(queriesToInvalidate, { exact: false, refetchType: 'all' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to complete deal');
    },
  });

  return { mutate, isCompleteDealLoading: isPending, error };
};