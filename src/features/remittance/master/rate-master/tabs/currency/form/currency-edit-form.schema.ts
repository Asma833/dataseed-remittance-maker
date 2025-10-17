import { z } from 'zod';

// Zod schema for currency edit form
export const currencyEditFormSchema = z.object({
  currency: z
    .string()
    .min(1, 'Currency is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttMargin10_12: z
    .string()
    .min(1, 'TT Margin 10-12 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttMargin12_02: z
    .string()
    .min(1, 'TT Margin 12-02 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttMargin02_3_30: z
    .string()
    .min(1, 'TT Margin 02-3:30 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttMargin03_30end: z
    .string()
    .min(1, 'TT Margin 03-30 End is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttHolidayMargin: z
    .string()
    .min(1, 'TT Holiday Margin is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttWeekendMargin: z
    .string()
    .min(1, 'TT Weekend Margin is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttUpperCircuit: z
    .string()
    .min(1, 'TT Upper Circuit is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
});

export type CurrencyEditFormData = z.infer<typeof currencyEditFormSchema>;