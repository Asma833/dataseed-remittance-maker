import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CompleteDealRequest, CompleteDealResponse } from '@/types/common/transaction.types';

export const completeDealApi = {
  completeDeal: async (dealData: any): Promise<any> => {
    const { data } = await axiosInstance.post<any>(API.REMITTANCE.CREATE_TRANSACTION, dealData);
    return data;
  },
};
