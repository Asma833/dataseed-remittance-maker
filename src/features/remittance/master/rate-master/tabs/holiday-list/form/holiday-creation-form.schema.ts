import { z } from 'zod';

// Zod schema for holiday edit form
export const holidayEditFormSchema = z.object({
  holidayName: z
    .string()
    .min(1, 'Holiday Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),
  date: z.string().min(1, 'Date is required'),
});

export type HolidayEditFormData = z.infer<typeof holidayEditFormSchema>;
