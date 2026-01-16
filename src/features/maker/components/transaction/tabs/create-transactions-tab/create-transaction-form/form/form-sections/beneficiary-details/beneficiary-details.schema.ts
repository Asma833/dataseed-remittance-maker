import { z } from 'zod';

const nameRegex = /^[a-zA-Z][a-zA-Z\s-]*$/;
const alphanumericRegex = /^[A-Z0-9]+$/;
const alphanumericCaseInsensitiveRegex = /^[a-zA-Z0-9]+$/;
const addressRegex = /^[a-zA-Z0-9][a-zA-Z0-9\s,-]*$/;
const lettersOnlyRegex = /^[A-Za-z][A-Za-z\s]*$/;

function isValidIBAN(iban: string): boolean {
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  if (!ibanRegex.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());
  const checksum = BigInt(numeric);
  return checksum % 97n === 1n;
}

export const beneficiaryDetailsSchema = z
  .object({
    beneficiary_name: z
      .string()
      .min(1, 'Beneficiary name is required')
      .regex(nameRegex, 'Beneficiary name cannot start with space or hyphen'),
    beneficiary_address: z
      .string()
      .min(1, 'Beneficiary address is required')
      .regex(addressRegex, 'Beneficiary address can only contain letters, numbers, spaces, commas, and hyphens'),
    beneficiary_city: z
      .string()
      .min(1, 'Beneficiary city is required')
      .regex(lettersOnlyRegex, 'Beneficiary city can only contain letters and spaces, and cannot start with space'),
    beneficiary_country: z
      .string()
      .min(1, 'Beneficiary country is required')
      .regex(lettersOnlyRegex, 'Beneficiary country can only contain letters and spaces, and cannot start with space'),
    beneficiary_account_number_iban_number: z
      .string()
      .min(1, 'Beneficiary account number / IBAN number is required')
      .regex(alphanumericRegex, 'Only uppercase alphanumeric characters allowed, no spaces or hyphens')
      .refine(
        (val) => (val.length < 15 ? val.length >= 8 && val.length <= 20 : isValidIBAN(val)),
        'Invalid account number or IBAN format'
      ),
    beneficiary_swift_code: z
      .string()
      .min(1, 'Beneficiary swift code is required')
      .regex(alphanumericCaseInsensitiveRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    beneficiary_bank_name: z
      .string()
      .min(1, 'Beneficiary bank name is required')
      .regex(nameRegex, 'Beneficiary bank name cannot start with space or hyphen'),
    beneficiary_bank_address: z
      .string()
      .min(1, 'Beneficiary bank address is required')
      .regex(addressRegex, 'Beneficiary bank address can only contain letters, numbers, spaces, commas, and hyphens'),
    sort_bsb_aba_transit_code: z
      .string()
      .min(1, 'SORT/BSB/ABA/TRANSIT Code is required')
      .regex(alphanumericCaseInsensitiveRegex, 'Only alphanumeric characters allowed, no spaces or hyphens'),
    message_to_beneficiary_additional_information: z
      .string()
      .min(1, 'Message to beneficiary / additional information is required')
      .regex(addressRegex, 'Message can only contain letters, numbers, spaces, commas, and hyphens'),
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
      .max(18, 'Max 18 characters allowed')
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
      .refine(
        (val) => !val || val.match(addressRegex),
        'Intermediary bank address can only contain letters, numbers, spaces, commas, and hyphens'
      ),
  })
  .refine((data) => data.intermediaryBankDetails !== 'yes' || !!data.intermediary_bank_account_number, {
    message: 'Intermediary Bank Account Number is required',
    path: ['intermediary_bank_account_number'],
  })
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
