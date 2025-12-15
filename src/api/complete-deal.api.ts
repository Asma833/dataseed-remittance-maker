import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CompleteDealRequest, CompleteDealResponse } from '@/types/common/complete-deal.types';

export const completeDealApi = {
  completeDeal: async (dealData:any): Promise<any> => {
    const { data } = await axiosInstance.post<any>(
      API.REMITTANCE.DEALS.COMPLETE,
      dealData
    );
    return data;
  },
};