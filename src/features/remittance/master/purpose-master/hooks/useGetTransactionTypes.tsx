import { useQuery } from '@tanstack/react-query';
import { getTransactionTypes, TransactionType } from '../api/get-transaction-types.api';

export const useGetTransactionTypes = () => {
  return useQuery<TransactionType[], Error>({
    queryKey: ['transactionTypes'],
    queryFn: getTransactionTypes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
