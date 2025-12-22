import { z } from 'zod';

export const currencyDetailsSchema = z.object({
  fx_currency: z.string(),
  fx_amount: z.coerce.number(),
  settlement_rate: z.coerce.number(),
  add_margin: z.coerce.number(),
  customer_rate: z.coerce.number(),
  declared_education_loan_amount: z.coerce
    .number()
    // .min(0.01, 'Declared Education Loan Amount must be positive')
    .optional(),
  previous_transaction_amount: z.coerce.number(),
  // .min(0.01, 'Previous Transaction Amount must be positive'),
  declared_previous_amount: z.coerce
    .number()
    // .min(0.01, 'Declared Previous Amount must be positive')
    // .max(999999999, 'Declared Previous Amount too large')
    .optional(),
  total_transaction_amount_tcs: z.coerce.number(),
  // .min(0.01, 'Total Transaction Amount (TCS) must be positive'),
  invoiceRateTable: z.object({
    transaction_value: z.object({
      company_rate: z.coerce.number(),
      // .min(0, 'Company Rate must be non-negative')
      // .max(999999, 'Company Rate too large'),
      agent_mark_up: z.coerce.number(),
      // .min(0, 'Agent Mark Up must be non-negative')
      // .max(999999, 'Agent Mark Up too large'),
      rate: z.coerce.number(),
      // .min(0.01, 'Rate must be positive')
      // .max(999999, 'Rate too large'),
    }),
    remittance_charges: z.object({
      company_rate: z.coerce.number(),
      // .min(0, 'Company Rate must be non-negative')
      // .max(999999, 'Company Rate too large'),
      agent_mark_up: z.coerce.number(),
      // .min(0, 'Agent Mark Up must be non-negative')
      // .max(999999, 'Agent Mark Up too large'),
      rate: z.coerce.number(),
      // .min(0, 'Rate must be non-negative')
      // .max(999999, 'Rate too large'),
    }),
    nostro_charges: z.object({
      company_rate: z.coerce.number(),
      // .min(0, 'Company Rate must be non-negative')
      // .max(999999, 'Company Rate too large'),
      agent_mark_up: z.coerce.number(),
      // .min(0, 'Agent Mark Up must be non-negative')
      // .max(999999, 'Agent Mark Up too large'),
      rate: z.coerce.number(),
      // .min(0.01, 'Rate must be positive')
      // .max(999999, 'Rate too large'),
    }),
    other_charges: z.object({
      company_rate: z.coerce.number(),
      // .min(0, 'Company Rate must be non-negative')
      // .max(999999, 'Company Rate too large'),
      agent_mark_up: z.coerce.number(),
      // .min(0, 'Agent Mark Up must be non-negative')
      // .max(999999, 'Agent Mark Up too large'),
      rate: z.coerce.number(),
      // .min(0.01, 'Rate must be positive')
      // .max(999999, 'Rate too large'),
    }),
    transaction_amount: z.object({
      rate: z.coerce.number(),
      // .min(0, 'Rate must be non-negative')
      // .max(999999999, 'Rate too large'),
    }),
    gst_amount: z.object({
      rate: z.coerce.number(),
      // .min(0, 'Rate must be non-negative')
      // .max(999999999, 'Rate too large'),
    }),
    total_inr_amount: z.object({
      rate: z.coerce.number(),
      // .min(0, 'Rate must be non-negative')
      // .max(999999999, 'Rate too large'),
    }),
    tcs: z.object({
      rate: z.coerce.number(),
      // .min(0, 'Rate must be non-negative')
      // .max(999999999, 'Rate too large'),
    }),
  }),
});

export type CurrencyDetailsFormData = z.infer<typeof currencyDetailsSchema>;
