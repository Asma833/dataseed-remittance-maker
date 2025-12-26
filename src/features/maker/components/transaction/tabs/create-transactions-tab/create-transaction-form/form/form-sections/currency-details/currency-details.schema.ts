import { z } from 'zod';

export const currencyDetailsSchema = z.object({
  fx_currency: z.string(),
  fx_amount: z.coerce.number(),
  settlement_rate: z.coerce.number(),
  add_margin: z.coerce.number(),
  customer_rate: z.coerce.number(),
  declared_education_loan_amount: z.coerce.number().optional(),
  previous_transaction_amount: z.coerce.number(),
  declared_previous_amount: z.coerce.number().optional(),
  total_transaction_amount_tcs: z.coerce.number(),
  invoiceRateTable: z.object({
    transaction_value: z.object({
      company_rate: z.coerce.number(),
      agent_mark_up: z.coerce.number(),
      rate: z.coerce.number(),
    }),
    remittance_charges: z.object({
      company_rate: z.coerce.number(),
      agent_mark_up: z.coerce.number(),
      rate: z.coerce.number(),
    }),
    nostro_charges: z.object({
      company_rate: z.coerce.number(),
      agent_mark_up: z.coerce.number(),
      rate: z.coerce.number(),
    }),
    other_charges: z.object({
      company_rate: z.coerce.number(),
      agent_mark_up: z.coerce.number(),
      rate: z.coerce.number(),
    }),
    transaction_amount: z.object({
      rate: z.coerce.number(),
    }),
    gst_amount: z.object({
      rate: z.coerce.number(),
    }),
    total_inr_amount: z.object({
      rate: z.coerce.number(),
    }),
    tcs: z.object({
      rate: z.coerce.number(),
    }),
  }),
});

export type CurrencyDetailsFormData = z.infer<typeof currencyDetailsSchema>;
