import { z } from 'zod';

// Zod schema for agent admin creation form

// Schema for onboard corporate form
export const onboardCorporateSchema = z.object({
  entityName: z.string().min(1, 'Entity Name is required'),
  panNumber: z.string().min(1, 'PAN Number is required'),
  dateOfIncorporation: z.string().min(1, 'Date of Incorporation is required'),
  entityType: z.string().min(1, 'Entity Type is required'),
  cin: z.string().optional(),
  address: z.string().optional(),
});

export type OnboardCorporateFormData = z.infer<typeof onboardCorporateSchema>;
export const agentAdminCreationSchema = z.object({
  // Basic Information
  agent_code: z
    .string()
    .min(1, 'Agent code is required')
    .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
  agent_name: z
    .string()
    .min(1, 'Full name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  emailId: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phoneNo: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  agentType: z.string().min(1, 'Agent type is required'),
  agentBranchCity: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  agentHOBranchState: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  ebixRMName: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  ebixRMBranchName: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  systemCode: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  status: z.enum(['Active', 'Inactive'], { message: 'Please select a status' }),
  monthlyCreditLimit: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = typeof val === 'string' ? val : val.toString();
      if (str.trim() === '') return 0;
      const num = parseFloat(str);
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => val >= 1, 'Monthly credit limit must be at least 1')
    .refine((val) => val <= 999999999, 'Monthly credit limit is too large'),
  totalCreditDays: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = typeof val === 'string' ? val : val.toString();
      if (str.trim() === '') return 0;
      const num = parseInt(str);
      return isNaN(num) ? 0 : num;
    })
    .refine((val) => val >= 1, 'Total credit days must be at least 1')
    .refine((val) => val <= 365, 'Total credit days cannot exceed 365'),

  // Company Details
  gstClassification: z
    .string()
    .min(1, 'GST Classification is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  gstNumber: z
    .string()
    .min(1, 'GST Number is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  gstPhoneNo: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  flatDoorNumber: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  roadStreet: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  areaLocality: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  gstCity: z
    .string()
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .optional()
    .or(z.literal('')),
  gstState: z
    .string()
    .min(1, 'State is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  pinCode: z
    .string()
    .min(1, 'PIN Code is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
    .regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
  gstBranch: z
    .string()
    .min(1, 'Branch is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),

  // Finance Details
  financeSpocName: z
    .string()
    .min(1, 'Financial SPOC Name is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  financeSpocEmail: z.string().min(1, 'Financial SPOC Email is required').email('Please enter a valid email address'),
  financeSpocPhoneNo: z
    .string()
    .min(1, 'Financial SPOC Phone No is required')
    .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  bankAccounts: z
    .array(
      z.object({
        bankName: z
          .string()
          .min(1, 'Bank Name is required')
          .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
        branchName: z
          .string()
          .min(1, 'Branch Name is required')
          .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
        accountHolder: z
          .string()
          .min(1, 'Account Holder is required')
          .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
        accountNumber: z
          .string()
          .min(1, 'Account Number is required')
          .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
        ifscCode: z
          .string()
          .min(1, 'IFSC Code is required')
          .regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces')
          .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code format'),
      })
    )
    .max(3, 'Maximum 3 bank accounts allowed'),

  // Documents
  agreementValid: z.string().min(1, 'Agreement valid date is required'),
  rbiLicenseCategory: z
    .string()
    .min(1, 'RBI License Category is required')
    .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
  rbiLicenseValidity: z.string().min(1, 'RBI License Validity is required'),
  noOfBranches: z
    .union([z.string(), z.number()])
    .superRefine((val, ctx) => {
      const str = typeof val === 'string' ? val : val.toString();
      if (str.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Number of branches is required',
        });
        return;
      }
      const num = parseInt(str);
      if (isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Number of branches must be a valid number',
        });
        return;
      }
      if (num < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Number of branches cannot be negative',
        });
      }
    })
    .transform((val) => {
      const str = typeof val === 'string' ? val : val.toString();
      const num = parseInt(str);
      return num;
    }),
  extensionMonth: z
    .union([z.string(), z.number()])
    .superRefine((val, ctx) => {
      const str = typeof val === 'string' ? val : val.toString();
      if (str.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Extension Month is required',
        });
        return;
      }
      const num = parseInt(str);
      if (isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Extension Month must be a valid number',
        });
        return;
      }
      if (num < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Extension month cannot be negative',
        });
      }
    })
    .transform((val) => {
      const str = typeof val === 'string' ? val : val.toString();
      const num = parseInt(str);
      return num;
    }),
  agreementCopy: z.any().optional(),
  rbiLicenseCopy: z.any().optional(),
  documents: z.object({}).optional(),
  // Product Purpose
  productPurpose: z.object({
    addOnForexMargin: z.enum(['Yes', 'No'], { message: 'Please select an option for Add on Forex Margin' }),
    addOnNostroMargin: z.enum(['Yes', 'No'], { message: 'Please select an option for Add on Nostro Margin' }),
    addOnTTMargin: z.enum(['Yes', 'No'], { message: 'Please select an option for Add on TT Margin' }),
    addOnOtherChargersMargin: z.enum(['Yes', 'No'], {
      message: 'Please select an option for Add on Other Chargers Margin',
    }),
    esignDocumentDownload: z.enum(['Yes', 'No'], { message: 'Please select an option for Esign Document Download' }),
    vkycDocumentDownload: z.enum(['Yes', 'No'], { message: 'Please select an option for VKYC Document Download' }),
    chooseProductType: z
      .record(z.enum(['card', 'currency', 'remittance', 'referral']), z.boolean())
      .superRefine((val, ctx) => {
        if (!Object.values(val || {}).some(Boolean)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select at least one product type',
            path: [], // attach to the object itself
          });
        }
      }),
    creditType: z.record(z.enum(['CNC', 'linecredit']), z.boolean()).superRefine((val, ctx) => {
      if (!Object.values(val || {}).some(Boolean)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select at least one product type',
          path: [], // attach to the object itself
        });
      }
    }),
    purposeTypesForCard: z
      .record(
        z.enum(['personaltravel', 'businesstravel', 'education', 'immigration', 'employment', 'medical']),
        z.boolean()
      )
      .superRefine((val, ctx) => {
        if (!Object.values(val || {}).some(Boolean)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select at least one product type',
            path: [], // attach to the object itself
          });
        }
      }),
  }),

  commission_details: z
    .object({
      commission_product_type: z.enum(['Remittance', 'Card', 'Currency', 'ADI-Referral']),
      commission_type: z.enum(['FIXED', 'PERCENTAGE', 'HYBRID']),
      product_margin: z.object({
        agent_fixed_margin: z.enum(['FIXED', 'PERCENTAGE']),
        all_currency: z.enum(['ALL_CURRENCY', 'SPECIFIC']),
        all_currency_margin: z
          .union([z.string(), z.number()])
          .transform((val) => {
            const str = typeof val === 'string' ? val : val.toString();
            if (str.trim() === '') return 0;
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
          })
          .refine((val) => val >= 0, 'All currency margin must be non-negative'),
        currency_list: z.record(
          z.string(),
          z
            .union([z.string(), z.number()])
            .transform((val) => {
              const str = typeof val === 'string' ? val : val.toString();
              if (str.trim() === '') return 0;
              const num = parseFloat(str);
              return isNaN(num) ? 0 : num;
            })
            .refine((val) => val >= 0, 'Currency margin must be non-negative')
        ),
      }),
      nostro_charges: z.object({
        type: z.enum(['FX', 'PERCENTAGE']),
        all_currency: z.enum(['ALL_CURRENCY', 'SPECIFIC']),
        all_currency_margin: z
          .union([z.string(), z.number()])
          .transform((val) => {
            const str = typeof val === 'string' ? val : val.toString();
            if (str.trim() === '') return 0;
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
          })
          .refine((val) => val >= 0, 'All currency margin must be non-negative'),
        currency_list: z.record(
          z.string(),
          z
            .union([z.string(), z.number()])
            .transform((val) => {
              const str = typeof val === 'string' ? val : val.toString();
              if (str.trim() === '') return 0;
              const num = parseFloat(str);
              return isNaN(num) ? 0 : num;
            })
            .refine((val) => val >= 0, 'Currency margin must be non-negative')
        ),
      }),
      tt_charges: z.object({
        rate: z
          .union([z.string(), z.number()])
          .transform((val) => {
            const str = typeof val === 'string' ? val : val.toString();
            if (str.trim() === '') return 0;
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
          })
          .refine((val) => val >= 0, 'Rate must be non-negative'),
      }),
      other_charges: z.object({
        rate: z
          .union([z.string(), z.number()])
          .transform((val) => {
            const str = typeof val === 'string' ? val : val.toString();
            if (str.trim() === '') return 0;
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
          })
          .refine((val) => val >= 0, 'Rate must be non-negative'),
      }),
    })
    .optional(),
});

export const defaultValues = {
  vendorCode: 'V001',
  fullName: 'John Doe',
  emailId: 'john.doe@example.com',
  phoneNo: '1234567890',
  agentType: 'Type A',
  agentBranchCity: 'Mumbai',
  agentHOBranchState: 'Maharashtra',
  ebixRMName: 'RM Name',
  ebixRMBranchName: 'Branch Name',
  systemCode: 'SYS001',
  status: 'Active',
  monthlyCreditLimit: '10000',
  totalCreditDays: '30',
  gstClassification: 'Regular',
  gstNumber: '22AAAAA0000A1Z5',
  gstPhoneNo: '9876543210',
  flatDoorNumber: '123',
  roadStreet: 'Main Street',
  areaLocality: 'Locality',
  gstCity: 'Mumbai',
  gstState: 'Maharashtra',
  pinCode: '400001',
  gstBranch: 'Main Branch',
  financeSpocName: 'Finance SPOC',
  financeSpocEmail: 'finance@example.com',
  financeSpocPhoneNo: '1234567890',
  bankAccounts: [
    {
      bankName: 'Bank of Example',
      branchName: 'Main Branch',
      accountHolder: 'John Doe',
      accountNumber: '123456789012',
      ifscCode: 'EXAM0001234',
    },
  ],
  productPurpose: {
    addOnMargin: 'No',
    esignDocumentDownload: 'No',
    vkycDocumentDownload: 'No',
    chooseProductType: { card: false, currency: false, remittance: true, referral: false },
    creditType: { CNC: true, linecredit: false },
    purposeTypesForCard: {
      personaltravel: true,
      businesstravel: false,
      education: false,
      immigration: false,
      employment: false,
      medical: false,
    },
  },
  rateMargin: {
    currency: {
      EUR: { buy: 0.12, sell: 0.2 },
      GBP: { buy: 0.13, sell: 0.22 },
      USD: { buy: 0.1, sell: 0.18 },
    },
    card: {
      markupFlat: 0.25,
      markupPercent: 1.1,
    },
    remittance: {
      slabs: [
        { min: 0, max: 1000, margin: 0.2 },
        { min: 1000, max: 5000, margin: 0.15 },
        { min: 5000, max: 10000, margin: 0.12 },
      ],
    },
  },
  commission_details: {
    commission_product_type: 'Remittance',
    commission_type: 'HYBRID',
    product_margin: {
      agent_fixed_margin: 'PERCENTAGE',
      all_currency: 'ALL_CURRENCY',
      all_currency_margin: 0.75,
      currency_list: {
        USD: 0.8,
        EUR: 0.7,
        GBP: 0.65,
        CAD: 0.6,
        AUD: 0.55,
        JPY: 0.5,
        SGD: 0.45,
        CHF: 0.4,
        AED: 0.35,
        THB: 0.3,
        NZD: 0.25,
        SAR: 0.2,
        ZAR: 0.15,
      },
    },
    nostro_charges: {
      type: 'FX',
      all_currency: 'ALL_CURRENCY',
      all_currency_margin: 150,
      currency_list: {
        USD: 175,
        EUR: 160,
        GBP: 155,
        CAD: 150,
        AUD: 145,
        JPY: 140,
        SGD: 135,
        CHF: 130,
        AED: 125,
        THB: 120,
        NZD: 115,
        SAR: 110,
        ZAR: 100,
      },
    },
    tt_charges: {
      rate: 99.5,
    },
    other_charges: {
      rate: 49,
    },
  },
  agreementValid: '',
  rbiLicenseCategory: '',
  rbiLicenseValidity: '',
  noOfBranches: '',
  extensionMonth: '',
};
