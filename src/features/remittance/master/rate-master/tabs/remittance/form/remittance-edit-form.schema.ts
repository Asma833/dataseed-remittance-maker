import { z } from 'zod';

// Zod schema for remittance edit form
export const remittanceEditFormSchema = z.object({
  currency: z
    .string()
    .min(1, 'Currency is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  'ttMargin10-12': z
    .number()
    .min(0, 'TT Margin 10-12 must be a positive number'),

  'ttMargin12-02': z
    .number()
    .min(0, 'TT Margin 12-02 must be a positive number'),

  'ttMargin02-3-30': z
    .number()
    .min(0, 'TT Margin 02-3:30 must be a positive number'),

  'ttMargin03-30end': z
    .number()
    .min(0, 'TT Margin 03-30 End must be a positive number'),

  ttHolidayMargin: z
    .number()
    .min(0, 'TT Holiday Margin must be a positive number'),

  ttWeekendMargin: z
    .number()
    .min(0, 'TT Weekend Margin must be a positive number'),

  ttUpperCircuit: z
    .string()
    .min(1, 'TT Upper Circuit is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
});

export type RemittanceEditFormData = z.infer<typeof remittanceEditFormSchema>;