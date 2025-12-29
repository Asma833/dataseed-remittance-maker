import { getAllCurrencyRates } from '@/features/maker/components/transaction/api/currency-rate.api';
import { useQuery } from '@tanstack/react-query';

// Hook to fetch all currency rates
export const useGetCurrencyRates = (marginType: 'number' | 'percentage' = 'number') => {
  return useQuery({
    queryKey: ['currencyRates', marginType],
    queryFn: () => getAllCurrencyRates(marginType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
