import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { TCSCalculationPayload, TCSCalculationResponse } from '../types/tcs-gst.types';


export const tcsApi = {
  calculateTcs: async (payload: TCSCalculationPayload): Promise<TCSCalculationResponse> => {
    const { data } = await axiosInstance.post<TCSCalculationResponse>(API.REMITTANCE.TCS_CALCULATION, payload);
    return data;
  },
};