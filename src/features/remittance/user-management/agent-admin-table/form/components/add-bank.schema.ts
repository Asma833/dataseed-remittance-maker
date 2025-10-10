import { z } from 'zod';

// Zod schema for add bank dialog
export const addBankSchema = z.object({
  bankName: z.string()
    .min(1, 'Bank Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  branchName: z.string()
    .min(1, 'Branch Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  accountHolder: z.string()
    .min(1, 'Account Holder Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[^-]/, 'Cannot start with hyphen'),

  accountNumber: z.string()
    .min(1, 'Account Number is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[a-zA-Z0-9]+$/, 'Account Number must contain only letters and digits'),

  ifscCode: z.string()
    .min(1, 'IFSC Code is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code format (e.g., SBIN0001234)'),
});

export type AddBankFormData = z.infer<typeof addBankSchema>;