import { z } from 'zod';

export const BookTransactionDetailsSchema = z.object({
  applicantName: z.string().nonempty('Applicant name is required'),
  applicantPanNumber: z
    .string()
    .nonempty('PAN number is required')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format'),
  applicantDob: z.string().nonempty('Date of birth is required'),
  applicantEmail: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val),
      'Invalid email address format'
    ),
  applicantMobileNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: 'Mobile number must be 10 digits',
    }),
  sourceOfFunds: z.string().optional(),
  paidBy: z.string().optional(),
  payeeNameAsPerPan: z.string().optional(),
  payeePanNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
      message: 'Invalid PAN number format',
    }),
  payeeDobAsPerPan: z.string().optional(),
});
