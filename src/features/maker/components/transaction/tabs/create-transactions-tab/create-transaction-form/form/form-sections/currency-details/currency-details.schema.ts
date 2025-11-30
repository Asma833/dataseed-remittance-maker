import { z } from 'zod';

const numberRegex = /^(0|[1-9]\d*)(\.\d+)?$/;

export const currencyDetailsSchema = z.object({
  fx_currency: z
    .string()
    .min(3, 'Fx currency must be at least 3 characters')
    .regex(/^[A-Z]{3}$/, 'Fx currency must be a valid 3-letter ISO code (e.g., USD), no hyphens or other characters'),
  fx_amount: z.string()
    .min(1, 'FX Amount is required')
    .regex(numberRegex, 'FX Amount must be a valid number without spaces or hyphens'),
  settlement_rate: z.string()
    .min(1, 'Settlement Rate is required')
    .regex(numberRegex, 'Settlement Rate must be a valid number without spaces or hyphens'),
  add_margin: z.string()
    .min(1, 'Add Margin is required')
    .regex(numberRegex, 'Add Margin must be a valid number without spaces or hyphens'),
  customer_rate: z.string()
    .min(1, 'Customer Rate is required')
    .regex(numberRegex, 'Customer Rate must be a valid number without spaces or hyphens'),
  declared_education_loan_amount: z.string()
    .min(1, 'Declared Education Loan Amount is required')
    .regex(numberRegex, 'Declared Education Loan Amount must be a valid number without spaces or hyphens'),
  previous_transaction_amount: z.string()
    .min(1, 'Previous Transaction Amount is required')
    .regex(numberRegex, 'Previous Transaction Amount must be a valid number without spaces or hyphens'),
  declared_previous_amount: z.string()
    .min(1, 'Declared Previous Amount is required')
    .regex(numberRegex, 'Declared Previous Amount must be a valid number without spaces or hyphens'),
  total_transaction_amount_tcs: z.string()
    .min(1, 'Total Transaction Amount (TCS) is required')
    .regex(numberRegex, 'Total Transaction Amount (TCS) must be a valid number without spaces or hyphens'),
  invoiceRateTable: z.object({
    transaction_value: z.object({
      nium_rate: z.string().min(1, 'Nium Rate is required').regex(numberRegex, 'Nium Rate must be a valid number'),
      agent_mark_up: z.string().min(1, 'Agent Mark Up is required').regex(numberRegex, 'Agent Mark Up must be a valid number'),
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    remittance_charges: z.object({
      nium_rate: z.string().min(1, 'Nium Rate is required').regex(numberRegex, 'Nium Rate must be a valid number'),
      agent_mark_up: z.string().min(1, 'Agent Mark Up is required').regex(numberRegex, 'Agent Mark Up must be a valid number'),
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    nostro_charges: z.object({
      nium_rate: z.string().min(1, 'Nium Rate is required').regex(numberRegex, 'Nium Rate must be a valid number'),
      agent_mark_up: z.string().min(1, 'Agent Mark Up is required').regex(numberRegex, 'Agent Mark Up must be a valid number'),
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    other_charges: z.object({
      nium_rate: z.string().min(1, 'Nium Rate is required').regex(numberRegex, 'Nium Rate must be a valid number'),
      agent_mark_up: z.string().min(1, 'Agent Mark Up is required').regex(numberRegex, 'Agent Mark Up must be a valid number'),
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    transaction_amount: z.object({
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    gst_amount: z.object({
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    total_inr_amount: z.object({
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
    tcs: z.object({
      rate: z.string().min(1, 'Rate is required').regex(numberRegex, 'Rate must be a valid number'),
    }),
  }),
});

export type CurrencyDetailsFormData = z.infer<typeof currencyDetailsSchema>;