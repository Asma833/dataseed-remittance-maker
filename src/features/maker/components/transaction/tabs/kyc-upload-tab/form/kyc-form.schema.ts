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
          if (fileData.file.size > FileSize.MAX_SIZE) {
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
      message: 'File size must not exceed 2MB and only PDF, JPG, JPEG, PNG, or GIF files are allowed',
    }
  );

import { MappedDocument } from '../../../types/mapped-documents.types';

export const createKycFormSchema = (documentTypes: MappedDocument[]) => {
  const baseSchema = z.object({
    company_reference_number: z.string().optional(),
    agent_reference_number: z.string().optional(),
    applicant_name: z.string().optional(),
  });

  // Create a schema that validates the known fields
  let schema = baseSchema.catchall(fileArrayValidation);

  // Add refinements for mandatory documents
  return schema.superRefine((data, ctx) => {
    documentTypes.forEach((doc) => {
      // Treat all documents as mandatory for UX validation per user request
      if (true) {
        const docId = doc.document_id || doc.id;
        
        if (doc.is_back_required) {
          const frontKey = `document_${docId}_front`;
          const backKey = `document_${docId}_back`;
          
          if (!data[frontKey] || (Array.isArray(data[frontKey]) && data[frontKey].length === 0)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${doc.display_name || doc.name} (Front) is required`,
              path: [frontKey],
            });
          }
          if (!data[backKey] || (Array.isArray(data[backKey]) && data[backKey].length === 0)) {
             ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${doc.display_name || doc.name} (Back) is required`,
              path: [backKey],
            });
          }
        } else {
          const key = `document_${docId}`;
          if (!data[key] || (Array.isArray(data[key]) && data[key].length === 0)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `${doc.display_name || doc.name} is required`,
              path: [key],
            });
          }
        }
      }
    });
  });
};
