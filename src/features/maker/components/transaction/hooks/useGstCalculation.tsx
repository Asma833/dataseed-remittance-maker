import { useMutation } from '@tanstack/react-query';
import { GSTCalculationPayload, GSTCalculationResponse } from '../types/tcs-gst.types';
import { gstApi } from '../api/gst.api';

export const useGstCalculation = () => {
  const { mutateAsync, isPending, error, data } = useMutation<GSTCalculationResponse, Error, GSTCalculationPayload>({
    mutationFn: gstApi.calculateGst,
  });

  return { calculateGst: mutateAsync, isCalculating: isPending, error, gstData: data };
};
