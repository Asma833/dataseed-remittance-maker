import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useQueryInvalidator } from '@/hooks/useQueryInvalidator';
import { CompleteDealRequest, CompleteDealResponse } from '../types/deal-booking.types';
import { updateTransactionApi } from '../api/update-transaction.api';
// import { transactionData } from '../api/update-transaction.api';

export const useUpdateTransaction = () => {
  const { invalidateMultipleQueries } = useQueryInvalidator();
  const { mutateAsync, isPending, error } = useMutation<
    CompleteDealResponse,
    Error,
    { id: string; data?: CompleteDealRequest }
  >({
    mutationFn: async ({ id, data }) => {
      return await updateTransactionApi.updateTransaction(id, data);
    },
    onSuccess: (data) => {
      toast.success('Transaction updated successfully');
      // Invalidate relevant queries if needed
      const queriesToInvalidate = [['transactions'], ['deals']];
      invalidateMultipleQueries(queriesToInvalidate, { exact: false, refetchType: 'all' });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update transaction');
    },
  });

  return { mutateAsync, isCompleteTransactionLoading: isPending, error };
};
