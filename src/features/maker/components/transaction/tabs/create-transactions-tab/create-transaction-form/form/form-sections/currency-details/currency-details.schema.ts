import { z } from 'zod';

export const currencyDetailsSchema = z.object({
  fx_currency: z
    .string()
    .min(3, 'Fx currency must be at least 3 characters')
    .regex(/^[A-Z]{3}$/, 'Fx currency must be a valid 3-letter ISO code (e.g., USD), no hyphens or other characters')
    .optional()
    .or(z.literal('')),
  fx_amount: z
    .number({ message: 'Fx amount must be a valid number' })
    .positive('Fx amount must be greater than 0')
    .optional(),
  settlement_rate: z
    .number({ message: 'Settlement rate must be a valid number' })
    .positive('Settlement rate must be greater than 0')
    .optional(),
  add_margin: z
    .coerce.number({ message: 'Add margin must be a valid number' })
    .min(0, 'Add margin cannot be negative')
    .max(100, 'Add margin cannot exceed 100%')
    .optional(),
  customer_rate: z
    .coerce.number({ message: 'Customer rate must be a valid number' })
    .positive('Customer rate must be greater than 0')
    .max(1000, 'Customer rate cannot exceed 1000')
    .optional(),
  declared_education_loan_amount: z
    .number({ message: 'Declared education loan amount must be a valid number' })
    .min(1, 'Amount cannot be negative')
    .optional(),
  previous_transaction_amount: z
    .number({ message: 'Previous transaction amount must be a valid number' })
    .min(1, 'Amount cannot be negative')
    .optional(),
  declared_previous_amount: z
    .number({ message: 'Declared previous amount must be a valid number' })
    .min(1, 'Amount cannot be negative')
    .optional(),
  total_transaction_amount_tcs: z
    .number({ message: 'Total transaction amount (TCS) must be a valid number' })
    .min(1, 'Amount cannot be negative')
    .optional(),
});

export type CurrencyDetailsFormData = z.infer<typeof currencyDetailsSchema>;