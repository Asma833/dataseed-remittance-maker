import { useQuery } from '@tanstack/react-query';
import { GSTCalculationResponse } from '../types/tcs-gst.types';
import { gstApi } from '../api/gst.api';

export const useGstCalculation = (txnAmount?: string, enabled = true) => {
  return useQuery<GSTCalculationResponse, Error>({
    queryKey: ['gst-calculation', txnAmount],
    queryFn: () => gstApi.calculateGst({ txnAmount: txnAmount || '0' }),
    enabled: enabled && !!txnAmount && Number(txnAmount) > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
