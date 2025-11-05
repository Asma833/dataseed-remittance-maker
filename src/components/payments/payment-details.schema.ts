import { z } from 'zod';

export const paymentsFormSchema = z.object({
 paymentMethod:z.string()
      .min(1, 'Payment Method is required')
      .refine((val) => ['true', 'false'].includes(val), 'Please select at least one payment method'),
  
    fileUpload: z
    .any()
    .optional()
    .refine((file) => {
      if (file == null || file.length === 0) {
        // Assuming optional, no file is okay
        return true;
      }
      // Check if it's actually a File or FileList
      return file instanceof File || (file[0] instanceof File);
    }, {
      message: 'Invalid file selected',
    }),
});
