import { z } from 'zod';

// Zod schema for super checker creation form
export const superCheckerSchema = z
  .object({
    checkerDetails: z.object({
      fullName: z
        .string()
        .min(1, 'Full name is required')
        .min(2, 'Full name must be at least 2 characters')
        .max(100, 'Full name must be less than 100 characters')
        .regex(/^[a-zA-Z0-9]([a-zA-Z0-9\s-]*[a-zA-Z0-9])?$/, 'Full name must start with a letter or number'),

      email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .max(255, 'Email must be less than 255 characters'),

      phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be less than 15 digits'),
      productType: z
        .record(z.enum(['card', 'currency', 'remittance', 'referral']), z.boolean())
        .superRefine((val, ctx) => {
          if (!Object.values(val || {}).some(Boolean)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Please select at least one product type',
              path: [], // attach to the object itself
            });
          }
        }),
      // status: z.enum(['active', 'inactive'], { message: 'Please select a status' }),

      agents: z.array(z.string()).optional(),

      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be less than 50 characters')
        .regex(/^[^\s-]/, 'Password cannot start with a space or hyphen')
        .optional(),

      confirmPassword: z
        .string()
        .regex(/^[^\s-]/, 'Confirm password cannot start with a space or hyphen')
        .optional(),

      transactionTypeMap: z
        .record(z.enum(['card', 'currency']), z.enum(['buy', 'sell']))
        .optional(),

    }),
  })
  .refine((data) => {
    const selectedProducts = (Object.keys(data.checkerDetails.productType) as (keyof typeof data.checkerDetails.productType)[]).filter(key => data.checkerDetails.productType[key]);
    const needsTransaction = selectedProducts.filter(p => p === 'card' || p === 'currency');
    if (needsTransaction.length > 0) {
      if (!data.checkerDetails.transactionTypeMap) return false;
      for (const product of needsTransaction) {
        if (!data.checkerDetails.transactionTypeMap[product as 'card' | 'currency']) return false;
      }
    }
    return true;
  }, {
    message: 'Transaction type is required for selected card or currency products',
    path: ['checkerDetails', 'transactionTypeMap'],
  })
  .refine((data) => {
    const p = data.checkerDetails.password;
    const cp = data.checkerDetails.confirmPassword;
    if (p && cp) return p === cp;
    if (p || cp) return false;
    return true;
  }, {
    message: 'Passwords do not match',
    path: ['checkerDetails', 'confirmPassword'],
  });
