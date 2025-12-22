import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';

export const useGetPaymentDetails = () => {
  return useGetData({
    endpoint: API.REMITTANCE.GET_TRANSACTION,
    queryKey: ['payment-details'],
    dataPath: '',
    enabled: true,
  });
};