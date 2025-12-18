import axiosInstance from '@/core/services/axios/axios-instance';
import { API, HEADER_KEYS } from '@/core/constant/apis';
import { UploadPaymentChallanRequest, UploadPaymentChallanResponse } from '@/features/maker/components/transaction/types/payment.types';

/**
 * Upload payment challan document
 */
const uploadPaymentChallan = async (data: UploadPaymentChallanRequest): Promise<UploadPaymentChallanResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await axiosInstance.post(API.REMITTANCE.UPLOAD_PAYMENT_CHALLAN(data.id), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
  return response.data;
};

export const uploadPaymentChallanApi = {
  uploadPaymentChallan,
};