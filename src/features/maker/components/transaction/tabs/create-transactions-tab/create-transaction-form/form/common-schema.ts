import { z } from 'zod';
import { currencyDetailsSchema } from './form-sections/currency-details/currency-details.schema';
import { beneficiaryDetailsSchema } from './form-sections/beneficiary-details/beneficiary-details.schema';
import { transactionBasicDetailsSchema } from './form-sections/transaction-details/transaction-basic-details.schema';

// Combined schema for create transaction form
export const createTransactionSchema = z.object({
  currencyDetails: currencyDetailsSchema,
  beneficiaryDetails: beneficiaryDetailsSchema,
  transactionDetails: transactionBasicDetailsSchema,
})
// .superRefine((data, ctx) => {
//   if ((data.transactionDetails.purpose || '').toLowerCase() === 'education') {
//     if (data.currencyDetails.declared_education_loan_amount == null || data.currencyDetails.declared_education_loan_amount <= 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Declared Education Loan Amount is required',
//         path: ['currencyDetails', 'declared_education_loan_amount'],
//       });
//     }
//     if (data.currencyDetails.declared_previous_amount == null || data.currencyDetails.declared_previous_amount <= 0) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: 'Declared Previous Amount is required',
//         path: ['currencyDetails', 'declared_previous_amount'],
//       });
//     }
//   }
// });

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
export type CreateTransactionFormInput = z.input<typeof createTransactionSchema>;
