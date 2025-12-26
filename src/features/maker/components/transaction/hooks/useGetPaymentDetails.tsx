import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';

export const useGetPaymentDetails = <T = any>() => {
  return useGetData<T>({
    endpoint: API.REMITTANCE.GET_TRANSACTION,
    queryKey: ['payment-details'],
    dataPath: '',
    enabled: true,
  });
};
