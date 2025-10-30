import { z } from 'zod';

export const DocumentSchema = z.object({
  name: z
    .string()
    .min(2, 'Document name must be at least 2 characters')
    .max(100, 'Document name must be less than 100 characters')
    .nonempty('Document name is required'),

  code: z
    .string()
    .min(2, 'Document code must be at least 2 characters')
    .max(20, 'Document code must be less than 20 characters')
    .nonempty('Document code is required'),

  is_required: z
    .string()
    .optional(),

  is_back_required: z
    .string()
    .optional(),
});