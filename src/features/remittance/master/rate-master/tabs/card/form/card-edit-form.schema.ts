import { z } from 'zod';

// Zod schema for card edit form
export const cardEditFormSchema = z.object({
  currency: z
    .string()
    .min(1, 'Currency is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  working_10_12: z
    .string()
    .min(1, 'Working 10-12 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  working_12_02: z
    .string()
    .min(1, 'Working 12-02 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  working_02_3_30: z
    .string()
    .min(1, 'Working 02-3:30 is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  workingEnd: z
    .string()
    .min(1, 'Working End is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttHolidayMargin: z
    .string()
    .min(1, 'TT Holiday Margin is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  ttweekendMargin: z
    .string()
    .min(1, 'TT Weekend Margin is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  upperCircuit: z
    .string()
    .min(1, 'Upper Circuit is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
});

export type CardEditFormData = z.infer<typeof cardEditFormSchema>;
