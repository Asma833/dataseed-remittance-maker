import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface UploadRemittanceImageResponse {
  success: boolean;
  s3_key: string;
}

/**
 * Upload remittance image
 */
export const uploadRemittanceImage = async (file: File): Promise<UploadRemittanceImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(API.DOCUMENTS.UPLOAD_REMITTANCE_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  } as any);
  return response.data;
};

import { GetPresignedUrlsResponse } from '../types/presignedUrls.types';

export const getPresignedUrls = async (s3Keys: string[]): Promise<GetPresignedUrlsResponse> => {
  const response = await axiosInstance.post(API.DOCUMENTS.PRESIGNED_URLS, {
    s3Keys,
    expiresIn: 1800,
  });
  return response.data;
};