import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CompleteTransactionRequest, CompleteTransactionResponse } from '@/types/common/transaction.types';

export const completeTransactionApi = {
  createTransaction: async (dealData: CompleteTransactionRequest): Promise<CompleteTransactionResponse> => {
    const { data } = await axiosInstance.post<CompleteTransactionResponse>(API.REMITTANCE.CREATE_TRANSACTION, dealData);
    return data;
  },
};
