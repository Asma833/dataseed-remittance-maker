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
export const agentAdminCreationSchema = z
  .object({
    // Basic Information
    agent_name: z
      .string()
      .min(1, 'Agent name is required')
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
    emailId: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    phoneNo: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    agentType: z.string().min(1, 'Agent type is required'),
    agentBranchCity: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    entity_name: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    pan_no: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .refine((val) => val === '' || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), 'PAN Number must be in format ABCDE9799F')
      .optional()
      .or(z.literal('')),
    date_of_incorporation: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    agentHOBranchState: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    rm_name: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    rm_branch_name: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    systemCode: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    status: z.enum(['Active', 'Inactive', 'Blocked'], { message: 'Please select a status' }),
    agent_category: z.enum(['CNC', 'largeAgent'], { message: 'Please select an agent category' }),
    monthlyCreditLimit: z
      .union([z.string(), z.number()])
      .refine((val) => {
        const str = typeof val === 'string' ? val : val.toString();
        return !/^\s/.test(str) && !/^-/.test(str);
      }, 'Cannot start with space or hyphen')
      .transform((val) => {
        const str = typeof val === 'string' ? val : val.toString();
        if (str.trim() === '') return undefined;
        const num = parseFloat(str);
        return isNaN(num) ? undefined : num;
      }),
    totalCreditDays: z
      .union([z.string(), z.number()])
      .refine((val) => {
        const str = typeof val === 'string' ? val : val.toString();
        return !/^\s/.test(str) && !/^-/.test(str);
      }, 'Cannot start with space or hyphen')
      .transform((val) => {
        const str = typeof val === 'string' ? val : val.toString();
        if (str.trim() === '') return undefined;
        const num = parseInt(str);
        return isNaN(num) ? undefined : num;
      }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .refine((val) => val.trim().length >= 8, 'Password cannot be only spaces')
      .refine((val) => !/^[\s-]+$/.test(val), 'Password cannot contain only spaces or hyphens')
      .refine((val) => !/^[\s-]/.test(val), 'Password cannot start with space or hyphen')
      .refine((val) => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
      .refine((val) => /\d/.test(val), 'Password must contain at least one number')
      .refine(
        (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
        'Password must contain at least one special character'
      )
      .describe('Password'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters long')
      .refine((val) => val.trim().length >= 8, 'Confirm password cannot be only spaces')
      .refine((val) => !/^[\s-]+$/.test(val), 'Confirm password cannot contain only spaces or hyphens')
      .refine((val) => !/^[\s-]/.test(val), 'Confirm password cannot start with space or hyphen')
      .describe('Confirm Password'),

    // Company Details
    gstClassification: z
      .string()
      .min(1, 'GST Classification is required')
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
    gstNumber: z
      .string()
      .min(1, 'GST Number is required')
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
    gstPhoneNo: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    flatDoorNumber: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    roadStreet: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    areaLocality: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    gstCity: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional()
      .or(z.literal('')),
    gstState: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional(),
    pinCode: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .refine((val) => val === '' || /^\d{6}$/.test(val), 'PIN Code must be 6 digits')
      .optional()
      .optional(),
    gstBranch: z
      .string()
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
      .optional(),
    // Finance Details
    financeSpocName: z
      .string()
      .min(1, 'Financial SPOC Name is required')
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
    financeSpocEmail: z.string().min(1, 'Financial SPOC Email is required').email('Please enter a valid email address'),
    financeSpocPhoneNo: z
      .string()
      .min(1, 'Financial SPOC Phone No is required')
      .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
    bankAccounts: z
      .array(
        z.object({
          bankName: z
            .string()
            .min(1, 'Bank Name is required')
            .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
          branchName: z
            .string()
            .min(1, 'Branch Name is required')
            .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
          accountHolder: z
            .string()
            .min(1, 'Account Holder is required')
            .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
          accountNumber: z
            .string()
            .min(1, 'Account Number is required')
            .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen'),
          ifscCode: z
            .string()
            .min(1, 'IFSC Code is required')
            .regex(/^(?!\s)(?!-)/, 'Cannot start with space or hyphen')
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
      .optional()
      .superRefine((val, ctx) => {
        if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) return;
        const str = typeof val === 'string' ? val : val.toString();
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
        if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) return undefined;
        const str = typeof val === 'string' ? val : val.toString();
        const num = parseInt(str);
        return isNaN(num) ? undefined : num;
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
      chooseProductType: z.record(z.enum(['card', 'currency', 'remittance', 'referral']), z.coerce.boolean()).refine(
        (val) => {
          if (!val || typeof val !== 'object') return false;
          return Object.values(val).some((v) => v === true);
        },
        {
          message: 'Please select at least one product type',
        }
      ),

      purposeTypesForCard: z
        .record(
          z.enum(['personaltravel', 'businesstravel', 'education', 'immigration', 'employment', 'medical']),
          z.boolean()
        )
        .optional(),
      purposeTypesForCurrency: z.record(z.string(), z.boolean()).optional(),
      purposeTypesForRemittance: z.record(z.string(), z.boolean()).optional(),
      purposeTypesForReferral: z.record(z.string(), z.boolean()).optional(),
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
  })
  .superRefine((data, ctx) => {
    // Password validation
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  })
  .superRefine((data, ctx) => {
    // Conditional validation for largeAgent
    if (data.agent_category === 'largeAgent') {
      if (data.monthlyCreditLimit === undefined || data.monthlyCreditLimit === null || data.monthlyCreditLimit <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['monthlyCreditLimit'],
          message: 'Monthly credit limit is required for Large Agent',
        });
      }
      if (data.totalCreditDays === undefined || data.totalCreditDays === null || data.totalCreditDays <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['totalCreditDays'],
          message: 'Total credit days is required for Large Agent',
        });
      }
    }

    // Conditional validation for product purpose types
    if (data.productPurpose?.chooseProductType) {
      const productTypes = Object.keys(data.productPurpose.chooseProductType) as Array<
        'card' | 'currency' | 'remittance' | 'referral'
      >;

      productTypes.forEach((productType) => {
        if (data.productPurpose!.chooseProductType![productType]) {
          // If product is selected, check if at least one purpose is selected
          const purposesField =
            `purposeTypesFor${productType.charAt(0).toUpperCase() + productType.slice(1)}` as keyof typeof data.productPurpose;
          const purposes = data.productPurpose![purposesField] as Record<string, boolean> | undefined;

          if (!purposes || Object.values(purposes).every((val) => !val)) {
            ctx.addIssue({
              code: 'custom',
              path: ['productPurpose', purposesField],
              message: `Please select at least one purpose type for ${productType}`,
            });
          }
        }
      });
    }
  });
