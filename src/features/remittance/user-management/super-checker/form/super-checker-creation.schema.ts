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
        .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be less than 15 digits')
        .optional(),
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
      status: z.enum(['active', 'inactive'], { message: 'Please select a status' }),

      agents: z.array(z.string()).min(1, 'Agent is required').optional(),

     password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine((val) => val.trim().length >= 8, 'Password cannot be only spaces')
      .refine((val) => !/^[\s-]+$/.test(val), 'Password cannot contain only spaces or hyphens')
      .refine((val) => !/^[\s-]/.test(val), 'Password cannot start with space or hyphen')
      .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
      .refine((val) => /\d/.test(val), 'Password must contain at least one number')
      .refine((val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), 'Password must contain at least one special character')
      .describe('Password'),
      confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long')
      .refine((val) => val.trim().length >= 8, 'Confirm password cannot be only spaces')
      .refine((val) => !/^[\s-]+$/.test(val), 'Confirm password cannot contain only spaces or hyphens')
      .refine((val) => !/^[\s-]/.test(val), 'Confirm password cannot start with space or hyphen')
      .describe('Confirm Password'),
    

      transactionTypeMap: z
        .record(z.string(), z.enum(['buy', 'sell','both']))
        .optional()
        .refine(
          (val) => {
            if (!val) return true;
            // Ensure only 'card' or 'currency' keys exist
            const validKeys = ['card', 'currency'];
            return Object.keys(val).every((k) => validKeys.includes(k));
          },
          { message: 'Invalid product key in transaction type map' }
        ),
    }),
  })
  .refine(
    (data) => {
      const selectedProducts = (
        Object.keys(data.checkerDetails.productType || {}) as (keyof typeof data.checkerDetails.productType)[]
      ).filter((key) => data.checkerDetails.productType[key]);
      const needsTransaction = selectedProducts.filter((p) => p === 'card' || p === 'currency');

      // If no card/currency products are selected, validation passes
      if (needsTransaction.length === 0) return true;

      // If card/currency products are selected, check transactionTypeMap
      if (!data.checkerDetails.transactionTypeMap) {
        return false;
      }

      // Check each selected card/currency product has a transaction type
      for (const product of needsTransaction) {
        const txnType = data.checkerDetails.transactionTypeMap[product as 'card' | 'currency'];
        if (!txnType) {
          return false;
        }
      }

      return true;
    },
    {
      message: 'Transaction type is required for selected card or currency products',
      path: ['checkerDetails', 'transactionTypeMap'],
    }
  )
  .refine(
    (data) => {
      const p = data.checkerDetails.password;
      const cp = data.checkerDetails.confirmPassword;
      if (p && cp) return p === cp;
      if (p || cp) return false;
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['checkerDetails', 'confirmPassword'],
    }
  );
