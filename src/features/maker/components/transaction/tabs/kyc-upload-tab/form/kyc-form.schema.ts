import { z } from 'zod';
import { FileSize } from '@/types/enums';

const acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

const fileArrayValidation = z
  .array(
    z.object({
      file: z.instanceof(File).optional(),
      document_url: z.string().optional(),
      name: z.string(),
      size: z.number().optional(),
      type: z.string().optional(),
      lastModified: z.number().optional(),
    })
  )
  .optional()
  .refine(
    (files) => {
      if (!files || files.length === 0) {
        return true;
      }
      for (const fileData of files) {
        if (fileData.file) {
          if (fileData.file.size > FileSize.ONE_GB) {
            return false;
          }
          if (!acceptedFileTypes.includes(fileData.file.type)) {
            return false;
          }
        }
      }
      return true;
    },
    {
      message: 'File size must not exceed 1GB and only PDF, JPG, JPEG, PNG, or GIF files are allowed',
    }
  );

export const KycFormSchema = z
  .object({
    company_reference_number: z.string().optional(),
    agent_reference_number: z.string().optional(),
    applicant_name: z.string().nonempty('Applicant Name is required'),
  })
  .catchall(fileArrayValidation);
