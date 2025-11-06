import axios from 'axios';
import { DealBookingPayload, DealBookingResponse } from '../types/deal-booking.types';

export const createDealBooking = async (payload: DealBookingPayload): Promise<DealBookingResponse> => {
  const response = await axios.post<DealBookingResponse>('/deal-booking', payload);
  return response.data;
};