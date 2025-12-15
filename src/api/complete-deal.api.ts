import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CompleteDealRequest, CompleteDealResponse } from '@/types/common/complete-deal.types';

export const completeDealApi = {
  completeDeal: async (dealData: CompleteDealRequest): Promise<CompleteDealResponse> => {
    const { data } = await axiosInstance.post<CompleteDealResponse>(
      API.REMITTANCE.DEALS.COMPLETE,
      dealData
    );
    return data;
  },
};