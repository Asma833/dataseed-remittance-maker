//import { getCurrencyRates } from '@/features/remittance/master/rate-master/api/currency-rate.api';
import { useQuery } from '@tanstack/react-query';

// Hook to fetch all currency rates
export const useGetCurrencyRates = (marginType: 'number' | 'percentage' = 'number') => {
  return useQuery({
    queryKey: ['currencyRates', marginType],
    //queryFn: () => getCurrencyRates(marginType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
