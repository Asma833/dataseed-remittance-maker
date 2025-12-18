import { useQuery } from '@tanstack/react-query';
import { getDeals, Deal } from '@/features/maker/api/dealsApi';

export function useDeals() {
  return useQuery<Deal[], Error>({
    queryKey: ['deals'],
    queryFn: getDeals,
    retry: 1,
    staleTime: 60 * 1000,
  });
}