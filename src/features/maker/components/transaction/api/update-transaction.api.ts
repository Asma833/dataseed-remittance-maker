import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import {
  CompleteDealRequest,
  CompleteDealResponse,
} from '../types/deal-booking.types';

export const updateTransactionApi = {
  updateTransaction: async (id: string, transactionData?: CompleteDealRequest): Promise<CompleteDealResponse> => {
    const { data } = await axiosInstance.put<CompleteDealResponse>(API.REMITTANCE.COMPLETE_DEAL(id), transactionData);
    return data;
  },
};