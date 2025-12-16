import { z } from 'zod';
import { currencyDetailsSchema } from './form-sections/currency-details/currency-details.schema';
import { beneficiaryDetailsSchema } from './form-sections/beneficiary-details/beneficiary-details.schema';
import { transactionBasicDetailsSchema } from './form-sections/transaction-details/transaction-basic-details.schema';

// Combined schema for create transaction form
export const createTransactionSchema = z.object({
  currencyDetails: currencyDetailsSchema,
  beneficiaryDetails: beneficiaryDetailsSchema,
  transactionDetails: transactionBasicDetailsSchema
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type CreateTransactionFormInput = z.input<typeof createTransactionSchema>;
