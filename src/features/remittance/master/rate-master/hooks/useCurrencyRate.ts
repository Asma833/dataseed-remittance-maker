import { useQuery } from '@tanstack/react-query';
import { getCurrencyRates } from '../api/currency-rate.api';

// Hook to fetch all currency rates
export const useGetCurrencyRates = () => {
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: getCurrencyRates,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};