import { useMutation } from '@tanstack/react-query';
import { uploadRemittanceImage, UploadRemittanceImageResponse } from '../api/documents';

/**
 * Hook for uploading remittance image
 */
export const useUploadRemittanceImage = () => {
  return useMutation<UploadRemittanceImageResponse, Error, File>({
    mutationFn: uploadRemittanceImage,
    onError: (error) => {
      console.error('Remittance image upload failed:', error);
    },
  });
};