import { z } from 'zod';

export const kycDetailsSchema = z.object({
  invoiceRateTable: z.object({
    transactionValue: z.object({
      niumRate: z.number().optional(),
      agentMarkUp: z.number().optional(),
      rate: z.number().optional(),
    }),
    remittanceCharges: z.object({
      niumRate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agentMarkUp: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Agent Mark Up cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    nostroCharges: z.object({
      niumRate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agentMarkUp: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Agent Mark Up cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    otherCharges: z.object({
      niumRate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agentMarkUp: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Agent Mark Up cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    transactionAmount: z.object({
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    gstAmount: z.object({
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    totalInrAmount: z.object({
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
    tcs: z.object({
      rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
    }),
  }),
  purpose: z.string().nonempty('Purpose is required'),
  fxCurrency: z.string().nonempty('FX Currency is required'),
  fxAmount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    }),

  companySettlementRate: z
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
  declaredEducationLoanAmount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
  niumPreviousTransactionAmount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
  declarePreviousAmountByOtherAd: z
    .string()
    .optional()
    .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
      message: 'Declare Previous Amount By OtherAd cannot contain spaces or hyphens',
    })
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
  totalTransactionAmountTcs: z
    .string()
    .optional()
    .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
      message: 'Total Transaction Amount Tcs cannot contain spaces or hyphens',
    })
    .transform((val) => val?.trim() || '')
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
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
