import { useQuery } from '@tanstack/react-query';
import { getCurrencyRates } from '../api/currency-rate.api';

// Hook to fetch currency rates for a specific currency
export const useGetCurrencyRates = (currencyCode: string) => {
  return useQuery({
    queryKey: ['currencyRates', currencyCode],
    queryFn: () => getCurrencyRates(currencyCode),
    enabled: !!currencyCode, // Only run query if currencyCode is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
