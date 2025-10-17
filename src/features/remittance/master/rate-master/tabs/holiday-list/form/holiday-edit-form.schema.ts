import { z } from 'zod';

// Zod schema for holiday edit form
export const holidayEditFormSchema = z.object({
  year: z
    .string()
    .min(1, 'Year is required'),

  date: z
    .string()
    .min(1, 'Date is required'),

  holidayName: z
    .string()
    .min(1, 'Holiday Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
});

export type HolidayEditFormData = z.infer<typeof holidayEditFormSchema>;