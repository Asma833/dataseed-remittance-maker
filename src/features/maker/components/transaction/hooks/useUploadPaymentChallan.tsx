import { useMutation } from '@tanstack/react-query';

import { UploadPaymentChallanRequest, UploadPaymentChallanResponse } from '../types/payment.types';
import { toast } from 'sonner';
import { uploadPaymentChallanApi } from '../api/upload-payment-challan.api';

/**
 * Hook for uploading payment challan
 */
export const useUploadPaymentChallan = () => {
  return useMutation<UploadPaymentChallanResponse, Error, UploadPaymentChallanRequest>({
    mutationFn: uploadPaymentChallanApi.uploadPaymentChallan,
    onSuccess: (data) => {
      toast.success(data.message || 'Payment challan uploaded successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload payment challan');
    },
  });
};
