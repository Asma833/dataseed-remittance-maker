import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { GSTCalculationPayload, GSTCalculationResponse } from '@/features/maker/components/transaction/types/tcs-gst.types';

export const gstApi = {
  calculateGst: async (payload: GSTCalculationPayload): Promise<GSTCalculationResponse> => {
    const { data } = await axiosInstance.post<GSTCalculationResponse>(API.REMITTANCE.GST_CALCULATION, payload);
    return data;
  },
};