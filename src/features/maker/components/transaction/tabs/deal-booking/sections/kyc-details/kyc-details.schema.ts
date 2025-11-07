import { z } from 'zod';

export const kycDetailsSchema = z.object({
  invoice_rate_table: z.object({
    transaction_value: z.object({
      nium_rate: z.number().optional(),
      agent_mark_up: z.number().optional(),
      rate: z.number().optional(),
    }),
    remittance_charges: z.object({
      nium_rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agent_mark_up: z.string().optional()
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
    nostro_charges: z.object({
      nium_rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agent_mark_up: z.string().optional()
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
    other_charges: z.object({
      nium_rate: z.string().optional()
        .refine((val) => !val || !val.includes(' ') && !val.includes('-'), {
          message: 'Nium Rate cannot contain spaces or hyphens',
        })
        .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
          message: 'Please enter a valid amount',
        })
        .refine((val) => !val || parseFloat(val) >= 0, {
          message: 'Amount cannot be negative',
        }),
      agent_mark_up: z.string().optional()
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
    transaction_amount: z.object({
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
    gst_amount: z.object({
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
    total_inr_amount: z.object({
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
  fx_currency: z.string().nonempty('FX Currency is required'),
  fx_amount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    }),

  company_settlement_rate: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid rate',
    }),

  add_margins: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid margin',
    })
    .refine((val) => !val || (parseFloat(val) >= 0 && parseFloat(val) <= 100), {
      message: 'Margin must be between 0 and 100',
    }),

  customer_rate: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid rate',
    }),

  nostro_charges: z
    .string()
    .optional(),
  applicant_name: z.string().nonempty('Applicant name is required'),

  applicant_pan_number: z
    .string()
    .nonempty('PAN number is required')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN number must be in format ABCDE9799F'),

  applicant_dob: z.string().nonempty('Date of birth is required'),

  applicant_email: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val),
      'Invalid email address format'
    ),

  applicant_mobile_number: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: 'Mobile number must be 10 digits',
    }),

  source_of_funds: z.string().optional(),

  paid_by: z.string().optional(),

  payee_name_as_per_pan: z.string().optional(),

  payee_pan_number: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
      message: 'PAN number must be in format ABCDE9799F',
    }),

  payee_dob_as_per_pan: z.string().optional(),
  declared_education_loan_amount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
  nium_previous_transaction_amount: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]*\.?[0-9]*$/.test(val), {
      message: 'Please enter a valid amount',
    })
    .refine((val) => !val || parseFloat(val) >= 0, {
      message: 'Amount cannot be negative',
    }),
  declare_previous_amount_by_other_ad: z
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
  total_transaction_amount_tcs: z
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
  if (data.source_of_funds === 'education') {
    return (
      data.declared_education_loan_amount &&
      data.nium_previous_transaction_amount &&
      data.declare_previous_amount_by_other_ad &&
      data.total_transaction_amount_tcs
    );
  }
  return true;
}, {
  message: 'All education-related fields are required',
});
