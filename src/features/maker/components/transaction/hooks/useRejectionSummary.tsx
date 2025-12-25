import { useQuery } from '@tanstack/react-query';
import { getRejectionSummary, RejectionSummaryResponse } from '../api/rejectionSummaryApi';

export function useRejectionSummary(transactionId?: string) {
  return useQuery<RejectionSummaryResponse, Error>({
    queryKey: ['rejection-summary', transactionId],
    queryFn: () => getRejectionSummary(String(transactionId)),
    enabled: Boolean(transactionId),
    retry: 1,
    staleTime: 60 * 1000,
  });
}
