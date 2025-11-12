import { z } from 'zod';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const CURRENCY_CODE_REGEX = /^[A-Z]{3}$/;
const POSTAL_CODE_REGEX = /^\d{6}$/; // Indian PIN code
const NO_LEADING_HYPHEN_OR_SPACE = /^[^-\s].*/; // No leading hyphen or space

export const transactionBasicDetailsSchema = z.object({
  company_reference_number: z.string()
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Reference number cannot start with hyphen or space')
    .max(50, 'Reference number too long')
    .optional()
    .or(z.literal('')),
  agent_reference_number: z.string()
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Reference number cannot start with hyphen or space')
    .max(50, 'Reference number too long')
    .optional()
    .or(z.literal('')),
  created_date: z.date()
    .max(new Date(), 'Created date cannot be in the future')
    .optional(),
  deal_expiry: z.date()
    .min(new Date(), 'Deal expiry must be in the future')
    .optional(),
  transaction_type: z.string()
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Transaction type cannot start with hyphen or space')
    .max(100, 'Transaction type too long')
    .optional()
    .or(z.literal('')),
  purpose: z.string()
    .max(100, 'Purpose too long')
    .optional()
    .or(z.literal('')),
  fx_currency: z.string()
    .regex(CURRENCY_CODE_REGEX, 'Invalid currency code (must be 3 uppercase letters)')
    .optional()
    .or(z.literal('')),
  fx_amount: z.number()
    .min(0, 'Amount must be positive')
    .max(999999999, 'Amount too large')
    .optional(),
  settlement_rate: z.number()
    .min(0, 'Rate must be positive')
    .max(999999, 'Rate too large')
    .optional(),
  billing_rate: z.number()
    .min(0, 'Rate must be positive')
    .max(999999, 'Rate too large')
    .optional(),
  applicant_name: z.string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Name cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  applicant_pan_number: z.string()
    .regex(PAN_REGEX, 'Invalid PAN format')
    .length(10, 'PAN must be 10 characters')
    .optional()
    .or(z.literal('')),
  applicant_dob: z.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .refine((date) => (new Date().getFullYear() - date.getFullYear()) >= 18, 'Must be at least 18 years old')
    .optional(),
  applicant_email: z.string()
    .email('Invalid email format')
    .max(100, 'Email too long')
    .optional()
    .or(z.literal('')),
  applicant_mobile_number: z.string()
    .regex(MOBILE_REGEX, 'Invalid mobile number (must be 10 digits starting with 6-9)')
    .length(10, 'Mobile number must be 10 digits')
    .optional()
    .or(z.literal('')),
  source_of_funds: z.string()
    .max(200, 'Description too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Description cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  paid_by: z.string()
    .max(100, 'Paid by too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Paid by cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  payee_name: z.string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Name cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  payee_pan_number: z.string()
    .regex(PAN_REGEX, 'Invalid PAN format')
    .length(10, 'PAN must be 10 characters')
    .optional()
    .or(z.literal('')),
  payee_dob: z.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .refine((date) => (new Date().getFullYear() - date.getFullYear()) >= 18, 'Must be at least 18 years old')
    .optional(),
  applicant_id_document: z.string()
    .max(100, 'ID document too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'ID cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  passport_number: z.string()
    .min(5, 'Passport number too short')
    .max(20, 'Passport number too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Passport number cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  passport_issued_date: z.date()
    .max(new Date(), 'Issued date cannot be in the future')
    .optional(),
  passport_expiry_date: z.date()
    .min(new Date(), 'Expiry date must be in the future')
    .optional(),
  place_of_issue: z.string()
    .max(100, 'Place too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Place cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  applicant_address: z.string()
    .max(200, 'Address too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Address cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  applicant_city: z.string()
    .max(50, 'City too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'City cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  applicant_state: z.string()
    .max(50, 'State too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'State cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  applicant_country: z.string()
    .max(50, 'Country too long')
    .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Country cannot start with hyphen or space')
    .optional()
    .or(z.literal('')),
  postal_code: z.string()
    .regex(POSTAL_CODE_REGEX, 'Invalid postal code (must be 6 digits)')
    .length(6, 'Postal code must be 6 digits')
    .optional()
    .or(z.literal('')),
}).refine((data) => {
  // Additional cross-field validations if needed, e.g., deal_expiry > created_date
  if (data.created_date && data.deal_expiry && data.deal_expiry <= data.created_date) {
    return false;
  }
  if (data.passport_issued_date && data.passport_expiry_date && data.passport_expiry_date <= data.passport_issued_date) {
    return false;
  }
  return true;
}, {
  message: 'Deal expiry must be after created date',
  path: ['deal_expiry'],
}).refine((data) => {
  if (data.passport_issued_date && data.passport_expiry_date && data.passport_expiry_date <= data.passport_issued_date) {
    return false;
  }
  return true;
}, {
  message: 'Expiry date must be after issued date',
  path: ['passport_expiry_date'],
});

export type TransactionBasicDetailsFormData = z.infer<typeof transactionBasicDetailsSchema>;