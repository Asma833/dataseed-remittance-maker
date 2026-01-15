import { z } from 'zod';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const CURRENCY_CODE_REGEX = /^[A-Z]{3}$/;
const POSTAL_CODE_REGEX = /^\d{6}$/; // Indian PIN code
const INDIAN_PASSPORT_REGEX = /^[A-Z][0-9]{7}$/; // Indian passport: 1 letter + 7 digits
const NO_LEADING_HYPHEN_OR_SPACE = /^[^-\s].*/; // No leading hyphen or space
const NO_NUMBERS_REGEX = /^[a-zA-Z\s-]+$/; // No numbers allowed
const OPTIONAL_DATE_SCHEMA = z.preprocess((arg) => {
  if (typeof arg === 'string' && arg.length === 0) return undefined;
  return arg;
}, z.coerce.date().max(new Date(), 'Date of birth cannot be in the future').optional());

export const transactionBasicDetailsSchema = z
  .object({
    company_reference_number: z
      .string()
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Company reference number cannot start with hyphen or space')
      .max(50, 'Company Reference number too long')
      .optional()
      .or(z.literal('')),
    agent_reference_number: z
      .string()
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Agent reference number cannot start with hyphen or space')
      .max(50, 'Agent reference number too long')
      .optional()
      .or(z.literal('')),
    purpose: z.string().min(1, 'Purpose is required'),
    transaction_purpose_map_id: z.string().optional(),
    transaction_type: z.string().optional().or(z.literal('')),
    fx_currency: z
      .string()
      .min(1, 'FX currency is required')
      .regex(CURRENCY_CODE_REGEX, 'Invalid currency code (must be 3 uppercase letters)'),
    fx_amount: z.coerce.number().min(1, 'FX amount is required'),
    company_settlement_rate: z.coerce.number(),
    add_margin: z.coerce.number().min(0.01, 'Add margin must be at least 0.01'),
    customer_rate: z.coerce.number(),
    nostro_charges: z.string().min(1, 'Nostro charges is required'),
    applicant_name: z
      .string()
      .min(2, 'Applicant name too short')
      .max(100, 'Applicant name too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Applicant name cannot start with hyphen or space')
      .optional()
      .or(z.literal('')),
    applicant_pan_number: z
      .string()
      .min(1, 'Applicant PAN number is required')
      .regex(PAN_REGEX, 'Invalid PAN format (e.g., ABCDE1234F)')
      .length(10, 'PAN must be 10 characters'),
    applicant_dob: OPTIONAL_DATE_SCHEMA,
    applicant_email: z.string().email('Invalid email format').max(100, 'Email too long').optional().or(z.literal('')),
    applicant_mobile_number: z
      .string()
      .regex(MOBILE_REGEX, 'Invalid mobile number (must be 10 digits starting with 6-9)')
      .length(10, 'Mobile number must be 10 digits')
      .optional()
      .or(z.literal('')),
    source_of_funds: z
      .string()
      .min(1, 'Source of funds is required')
      .max(200, 'Description too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Description cannot start with hyphen or space'),
    paid_by: z
      .string()
      .max(100, 'Paid by too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Paid by cannot start with hyphen or space')
      .optional()
      .or(z.literal('')),
    payee_name: z
      .string()
      .min(2, 'Payee name too short')
      .max(100, 'Payee name too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Payee name cannot start with hyphen or space')
      .optional()
      .or(z.literal('')),
    payee_pan_number: z
      .string()
      .regex(PAN_REGEX, 'Invalid PAN number format (e.g., QRJYE1234F)')
      .length(10, 'PAN number must be 10 characters')
      .optional()
      .or(z.literal('')),
    payee_dob: OPTIONAL_DATE_SCHEMA,
    applicant_id_document: z
      .string()
      .max(100, 'ID document too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'ID cannot start with hyphen or space')
      .optional()
      .or(z.literal('')),
    passport_number: z
      .string()
      .nonempty('Passport number is required')
      .regex(INDIAN_PASSPORT_REGEX, 'Invalid passport format (e.g., A1234567)')
      .length(8, 'Indian passport number must be exactly 8 characters'),
    passport_issue_date: z
      .string()
      .min(1, 'Passport issue date is required')
      .refine((val) => new Date(val) <= new Date(), 'Issue date cannot be in the future'),
    passport_expiry_date: z
      .string()
      .min(1, 'Passport expiry date is required')
      .refine((val) => new Date(val) >= new Date(), 'Expiry date must be in the future'),
    place_of_issue: z
      .string()
      .max(100, 'Place too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Place cannot start with hyphen or space')
      .optional()
      .or(z.literal('')),
    applicant_address: z
      .string()
      .nonempty('Applicant address is required')
      .max(200, 'Address too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Address cannot start with hyphen or space'),
    applicant_city: z
      .string()
      .nonempty('Applicant city is required')
      .max(50, 'City too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'City cannot start with hyphen or space')
      .regex(NO_NUMBERS_REGEX, 'City cannot contain numbers'),
    applicant_state: z
      .string()
      .nonempty('Applicant state is required')
      .max(50, 'State too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'State cannot start with hyphen or space')
      .regex(NO_NUMBERS_REGEX, 'State cannot contain numbers'),
    applicant_country: z
      .string()
      .nonempty('Applicant country is required')
      .max(50, 'Country too long')
      .regex(NO_LEADING_HYPHEN_OR_SPACE, 'Country cannot start with hyphen or space')
      .regex(NO_NUMBERS_REGEX, 'Country cannot contain numbers'),
    postal_code: z
      .string()
      .nonempty('Postal code is required')
      .regex(POSTAL_CODE_REGEX, 'Postal code must be 6 digits'),
  })
  .refine(
    (data) => {
      if (
        data.passport_issue_date &&
        data.passport_expiry_date &&
        new Date(data.passport_expiry_date) <= new Date(data.passport_issue_date)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Expiry date must be after issue date',
      path: ['passport_expiry_date'],
    }
  );

export type TransactionBasicDetailsFormData = z.infer<typeof transactionBasicDetailsSchema>;
