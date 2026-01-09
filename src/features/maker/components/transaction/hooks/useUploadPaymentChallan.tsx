import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UploadPaymentChallanRequest, UploadPaymentChallanResponse } from '../types/payment.types';
import { toast } from 'sonner';
import { uploadPaymentChallanApi } from '../api/upload-payment-challan.api';

/**
 * Hook for uploading payment challan
 */
export const useUploadPaymentChallan = () => {
  const queryClient = useQueryClient();
  
  return useMutation<UploadPaymentChallanResponse, Error, UploadPaymentChallanRequest>({
    mutationFn: uploadPaymentChallanApi.uploadPaymentChallan,
    onSuccess: (data) => {
      toast.success(data.message || 'Payment challan uploaded successfully');
      // Invalidate and refetch payment details
      queryClient.invalidateQueries({ queryKey: ['payment-details'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload payment challan');
    },
  });
};
