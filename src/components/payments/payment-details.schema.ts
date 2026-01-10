import { z } from 'zod';
import { FileSize } from '@/types/enums';

export const paymentsFormSchema = z.object({
  paymentMethod: z
    .string()
    .min(1, 'Payment Method is required')
    .refine((val) => ['bank', 'paymentLink'].includes(val), 'Please select at least one payment method'),

  fileUpload: z.any().refine(
    (files) => {
      if (!files || files.length === 0) {
        return false; // File is required
      }
      // Check if the first item has a valid file
      const file = files[0];
      if (!(file && file.file instanceof File)) {
        return false;
      }
      // Check file size (max 1GB)
      if (file.file.size > FileSize.ONE_GB) {
        return false;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'];
      return allowedTypes.includes(file.file.type);
    },
    {
      message: 'File upload is required, must be a valid file (PDF, PNG, JPG, JPEG only), and file size must not exceed 1GB',
    }
  ),
});
