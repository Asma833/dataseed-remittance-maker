import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { TCSCalculationPayload, TCSCalculationResponse } from '../types/tcs-gst.types';

// Function to calculate TCS
export const calculateTCS = async (
  payload: TCSCalculationPayload
): Promise<TCSCalculationResponse> => {
  const response = await axiosInstance.post(API.REMITTANCE.TCS_CALCULATION, payload);
  return response.data;
};