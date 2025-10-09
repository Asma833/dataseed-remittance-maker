import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface UploadRemittanceImageResponse {
  success: boolean;
  message: string;
  url?: string;
  // Add other fields based on actual response
}

/**
 * Upload remittance image
 */
export const uploadRemittanceImage = async (file: File): Promise<UploadRemittanceImageResponse> => {
  console.log('Uploading file:', file);
  const formData = new FormData();
  formData.append('file', file);
  console.log('FormData has file:', formData.has('file'));

  const response = await axiosInstance.post(API.DOCUMENTS.UPLOAD_REMITTANCE_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    skipEncryption: true,
  } as any);
  return response.data;
};