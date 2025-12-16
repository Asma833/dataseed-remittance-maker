import axiosInstance from '@/core/services/axios/axios-instance';
import { DealBookingPayload, DealBookingResponse } from '../types/deal-booking.types';
import { API } from '@/core/constant/apis';

export const createDealBooking = async (payload: DealBookingPayload): Promise<DealBookingResponse> => {
  const response = await axiosInstance.post<DealBookingResponse>(API.DEAL_BOOKING.CREATE, payload);
  return response.data;
};
