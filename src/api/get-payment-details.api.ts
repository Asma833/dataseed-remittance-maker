import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export const getPaymentDetailsApi = {
  getPaymentDetails: async () => {
    const { data } = await axiosInstance.get(API.REMITTANCE.GET_TRANSACTION);
    return data;
  },
};