import { z } from 'zod';

export const HolidayFormSchema = z.object({
  year: z.string().min(1, 'Year is required'),
  date: z.string().min(1, 'Date is required'),
  holidayName: z.string().min(1, 'Holiday name is required'),
});
