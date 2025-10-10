import { z } from 'zod';

// Zod schema for onboard corporate dialog
export const onboardCorporateSchema = z.object({
  entityName: z.string()
    .min(1, 'Entity Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  panNumber: z.string()
    .min(1, 'PAN Number is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)'),

  dateOfIncorporation: z.string()
    .min(1, 'Date of Incorporation is required'),

  entityType: z.string()
    .min(1, 'Entity Type is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),

  cin: z.string()
    .optional()
    .refine((val) => !val || val.trim().length === 0 || /^(?!\s)(?!.*\s$)/.test(val), {
      message: 'Cannot start or end with spaces'
    }),

  address: z.string()
    .optional()
    .refine((val) => !val || val.trim().length === 0 || /^(?!\s)(?!.*\s$)/.test(val), {
      message: 'Cannot start or end with spaces'
    }),
});

export type OnboardCorporateFormData = z.infer<typeof onboardCorporateSchema>;