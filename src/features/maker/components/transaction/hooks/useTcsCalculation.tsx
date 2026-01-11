import { useQuery } from '@tanstack/react-query';
import { TCSCalculationPayload, TCSCalculationResponse } from '../types/tcs-gst.types';
import { tcsApi } from '../api/tcs.api';

export const useTcsCalculation = (payload?: TCSCalculationPayload, enabled = true) => {
  return useQuery<TCSCalculationResponse, Error>({
    queryKey: ['tcs-calculation', payload],
    queryFn: () => tcsApi.calculateTcs(payload!),
    enabled:
      enabled &&
      !!payload &&
      Number(payload.txnAmount) > 0 &&
      !!payload.panNumber &&
      !!payload.purpose &&
      !!payload.sourceofFund,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
