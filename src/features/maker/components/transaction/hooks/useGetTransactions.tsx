import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../api/get-transactions.api';

export const useGetTransactions = () => {
  return useQuery<any[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
