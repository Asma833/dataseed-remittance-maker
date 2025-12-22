import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { completeTransactionApi } from '@/api/complete-transaction.api';
import { useQueryInvalidator } from '@/hooks/useQueryInvalidator';
import { CompleteTransactionRequest, CompleteTransactionResponse } from '../tabs/create-transactions-tab/create-transaction-form/types/transaction.types';

export const useCompleteTransaction = () => {
  const { invalidateMultipleQueries } = useQueryInvalidator();
  const { mutateAsync, isPending, error } = useMutation<CompleteTransactionResponse, Error, CompleteTransactionRequest>(
    {
      mutationFn: async (transactionData: CompleteTransactionRequest) => {
        return await completeTransactionApi.createTransaction(transactionData);
      },
      onSuccess: (data) => {
        toast.success('Transaction created successfully');
        // Invalidate relevant queries if needed
        const queriesToInvalidate = [['transactions'], ['deals']];
        invalidateMultipleQueries(queriesToInvalidate, { exact: false, refetchType: 'all' });
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to complete transaction');
      },
    }
  );

  return { mutateAsync, isCompleteTransactionLoading: isPending, error };
};
