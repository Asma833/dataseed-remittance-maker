import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export const useGetDealDetails = (dealBookingId?: string) => {
  return useQuery({
    queryKey: ['deal-details', dealBookingId],
    queryFn: async () => {
      if (!dealBookingId) {
        throw new Error('Deal booking ID is required');
      }
      const response = await axiosInstance.get(API.REMITTANCE.GET_DEAL_DETAILS(dealBookingId));
      return response.data;
    },
    enabled: !!dealBookingId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};