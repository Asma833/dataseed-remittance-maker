import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';
import { DealDetailsApiResponse } from '../types/create-transaction.types';

export const useGetPaymentDetails = <T = any,>() => {
  return useGetData<T>({
    endpoint: API.REMITTANCE.GET_TRANSACTION,
    queryKey: ['payment-details'],
    dataPath: '',
    enabled: true,
  });
};

export const useGetDealDetails = (dealBookingId: string) => {
  return useGetData<DealDetailsApiResponse>({
    endpoint: API.REMITTANCE.GET_DEAL_DETAILS(dealBookingId),
    queryKey: ['deal-details', dealBookingId],
    dataPath: '',
    enabled: !!dealBookingId,
  });
};
