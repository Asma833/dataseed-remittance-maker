import { z } from 'zod';

// Zod schema for remittance edit form
export const remittanceEditFormSchema = z.object({
  currencyType: z
    .enum(['inr', 'percentage'])
    .refine((val) => val, 'Currency type is required'),

  currency: z
    .string()
    .min(1, 'Currency is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  'ttMargin10-12': z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Margin 10-12 must be a positive number or valid percentage'),

  'ttMargin12-02': z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Margin 12-02 must be a positive number or valid percentage'),

  'ttMargin02-3-30': z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Margin 02-3:30 must be a positive number or valid percentage'),

  'ttMargin03-30end': z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Margin 03-30 End must be a positive number or valid percentage'),

  ttHolidayMargin: z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Holiday Margin must be a positive number or valid percentage'),

  ttWeekendMargin: z
    .union([z.number(), z.string()])
    .refine((val) => {
      if (typeof val === 'string') {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      }
      return val >= 0;
    }, 'TT Weekend Margin must be a positive number or valid percentage'),

  ttUpperCircuit: z
    .string()
    .min(1, 'TT Upper Circuit is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
});

export type RemittanceEditFormData = z.infer<typeof remittanceEditFormSchema>;