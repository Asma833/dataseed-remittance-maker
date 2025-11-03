import { z } from 'zod';

export const kycDetailsSchema = z.object({
  transactionType: z.string().nonempty('Transaction Type is required'),

  purpose: z.string().nonempty('Purpose is required'),

  fxCurrency: z.string().nonempty('FX Currency is required'),

  fxAmount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    }),

  niumSettlementRate: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid rate',
    }),

  addMargins: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid margin',
    })
    .refine((val) => !val || (parseFloat(val) >= 0 && parseFloat(val) <= 100), {
      message: 'Margin must be between 0 and 100',
    }),

  customerRate: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid rate',
    }),

  nostroCharges: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Charges cannot be negative',
    }),

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
  declaredEducationLoanAmount: z.string().optional(),
  niumPreviousTransactionAmount: z.string().optional(),
  declarePreviousAmountByOtherAd: z.string().optional(),
  totalTransactionAmountTcs: z.string().optional(),
}).refine((data) => {
  if (data.sourceOfFunds === 'education') {
    return (
      data.declaredEducationLoanAmount &&
      data.niumPreviousTransactionAmount &&
      data.declarePreviousAmountByOtherAd &&
      data.totalTransactionAmountTcs
    );
  }
  return true;
}, {
  message: 'All education-related fields are required',
});
