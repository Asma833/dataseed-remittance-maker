import { useMutation } from '@tanstack/react-query';
import { createDealBooking } from '../api/deal-booking.api';
import { DealBookingPayload } from '../types/deal-booking.types';

export const useDealBooking = () => {
  return useMutation({
    mutationFn: (payload: DealBookingPayload) => createDealBooking(payload),
  });
};