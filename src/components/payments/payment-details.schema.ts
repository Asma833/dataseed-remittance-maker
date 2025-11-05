import { z } from 'zod';

export const paymentsFormSchema = z.object({
  paymentMethod: z
    .string()
    .min(1, 'Payment Method is required')
    .refine((val) => ['bank', 'paymentLink'].includes(val), 'Please select at least one payment method'),

  fileUpload: z
    .any()
    .refine(
      (files) => {
        if (!files || files.length === 0) {
          return false; // File is required
        }
        // Check if the first item has a valid file
        return files[0] && files[0].file instanceof File;
      },
      {
        message: 'File upload is required and must be a valid file',
      }
    ),
});
