
import { useMutation } from '@tanstack/react-query';
import { TCSCalculationPayload, TCSCalculationResponse } from '../types/tcs-gst.types';
import { tcsApi } from '../api/tcs.api';

export const useTcsCalculation = () => {
  const { mutateAsync, isPending, error, data } = useMutation<TCSCalculationResponse, Error, TCSCalculationPayload>({
     mutationFn: tcsApi.calculateTcs,
  });

  return { calculateTcs: mutateAsync, isCalculating: isPending, error, tcsData: data };
};