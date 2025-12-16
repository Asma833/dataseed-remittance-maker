import { z } from 'zod';

const nameRegex = /^[A-Za-z][A-Za-z0-9\s-]*$/;
const alphanumericRegex = /^[A-Za-z0-9]+$/;

export const beneficiaryDetailsSchema = z
  .object({
    beneficiary_name: z
      .string()
      .min(1, 'Beneficiary name is required')
      .regex(nameRegex, 'Beneficiary name cannot start with space or hyphen'),
    beneficiary_address: z
      .string()
      .min(1, 'Beneficiary address is required')
      .regex(nameRegex, 'Beneficiary address cannot start with space or hyphen'),
    beneficiary_city: z
      .string()
      .min(1, 'Beneficiary city is required')
      .regex(nameRegex, 'Beneficiary city cannot start with space or hyphen'),
    beneficiary_country: z
      .string()
      .min(1, 'Beneficiary country is required')
      .regex(nameRegex, 'Beneficiary country cannot start with space or hyphen'),
    beneficiary_account_number_iban_number: z
      .string()
      .min(1, 'Beneficiary account number / IBAN number is required')
      .regex(alphanumericRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    beneficiary_swift_code: z
      .string()
      .min(1, 'Beneficiary swift code is required')
      .regex(alphanumericRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    beneficiary_bank_name: z
      .string()
      .min(1, 'Beneficiary bank name is required')
      .regex(nameRegex, 'Beneficiary bank name cannot start with space or hyphen'),
    beneficiary_bank_address: z
      .string()
      .min(1, 'Beneficiary bank address is required')
      .regex(nameRegex, 'Beneficiary bank address cannot start with space or hyphen'),
    sort_bsb_aba_transit_code: z
      .string()
      .min(1, 'SORT/BSB/ABA/TRANSIT Code is required')
      .regex(alphanumericRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    nostro_charges: z
      .string()
      .min(1, 'Nostro charges is required')
      .regex(alphanumericRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    message_to_beneficiary_additional_information: z
      .string()
      .min(1, 'Message to beneficiary / additional information is required')
      .regex(nameRegex, 'Message cannot start with space or hyphen'),
    student_name: z
      .string()
      .optional()
      .refine((val) => !val || val.match(nameRegex), 'Student name cannot start with space or hyphen'),
    student_passport_number: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.match(alphanumericRegex),
        'Only alphanumeric characters allowed, no spaces or hyphens'
      ),
    payment_instruction_number: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.match(alphanumericRegex),
        'Only alphanumeric characters allowed, no spaces or hyphens'
      ),
    university_name: z
      .string()
      .optional()
      .refine((val) => !val || val.match(nameRegex), 'University name cannot start with space or hyphen'),
    intermediaryBankDetails: z.enum(['yes', 'no']),
    intermediary_bank_account_number: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.match(alphanumericRegex),
        'Only alphanumeric characters allowed, no spaces or hyphens'
      ),
    intermediary_bank_swift_code: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.match(alphanumericRegex),
        'Only alphanumeric characters allowed, no spaces or hyphens'
      ),
    intermediary_bank_name: z
      .string()
      .optional()
      .refine((val) => !val || val.match(nameRegex), 'Intermediary bank name cannot start with space or hyphen'),
    intermediary_bank_address: z
      .string()
      .optional()
      .refine((val) => !val || val.match(nameRegex), 'Intermediary bank address cannot start with space or hyphen'),
  })
  .refine(
    (data) => {
      if (data.intermediaryBankDetails === 'yes') {
        return (
          !!data.intermediary_bank_account_number &&
          !!data.intermediary_bank_swift_code &&
          !!data.intermediary_bank_name &&
          !!data.intermediary_bank_address
        );
      }
      return true;
    },
    {
      message: 'All Intermediary Bank Details are required when Yes is selected',
      path: ['intermediary_bank_account_number'],
    }
  )
  .refine((data) => data.intermediaryBankDetails !== 'yes' || !!data.intermediary_bank_swift_code, {
    message: 'Intermediary Bank Swift Code is required',
    path: ['intermediary_bank_swift_code'],
  })
  .refine((data) => data.intermediaryBankDetails !== 'yes' || !!data.intermediary_bank_name, {
    message: 'Intermediary Bank Name is required',
    path: ['intermediary_bank_name'],
  })
  .refine((data) => data.intermediaryBankDetails !== 'yes' || !!data.intermediary_bank_address, {
    message: 'Intermediary Bank Address is required',
    path: ['intermediary_bank_address'],
  });

export type BeneficiaryDetailsFormData = z.infer<typeof beneficiaryDetailsSchema>;
