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
  vendorCode: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  fullName: z.string().min(1, 'Full name is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  emailId: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phoneNo: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  agentType: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  agentBranchCity: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  agentHOBranchState: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  ebixRMName: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  ebixRMBranchName: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  systemCode: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  status: z.enum(['Active', 'Inactive'], { message: 'Please select a status' }),
  monthlyCreditLimit: z.union([z.string(), z.number()]).transform((val) => {
    const str = typeof val === 'string' ? val : val.toString();
    if (str.trim() === '') return 0;
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  }).refine((val) => val >= 1, 'Monthly credit limit must be at least 1').refine((val) => val <= 999999999, 'Monthly credit limit is too large'),
  totalCreditDays: z.union([z.string(), z.number()]).transform((val) => {
    const str = typeof val === 'string' ? val : val.toString();
    if (str.trim() === '') return 0;
    const num = parseInt(str);
    return isNaN(num) ? 0 : num;
  }).refine((val) => val >= 1, 'Total credit days must be at least 1').refine((val) => val <= 365, 'Total credit days cannot exceed 365'),

  // Company Details
  gstClassification: z.string().min(1, 'GST Classification is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  gstNumber: z.string().min(1, 'GST Number is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  gstPhoneNo: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  flatDoorNumber: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  roadStreet: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  areaLocality: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  gstCity: z.string().regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').optional().or(z.literal('')),
  gstState: z.string().min(1, 'State is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  pinCode: z.string().min(1, 'PIN Code is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').regex(/^\d{6}$/, 'PIN Code must be 6 digits'),
  gstBranch: z.string().min(1, 'Branch is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),

  // Finance Details
  financeSpocName: z.string().min(1, 'Financial SPOC Name is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  financeSpocEmail: z.string().min(1, 'Financial SPOC Email is required').email('Please enter a valid email address'),
  financeSpocPhoneNo: z.string().min(1, 'Financial SPOC Phone No is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
  bankAccounts: z.array(z.object({
    bankName: z.string().min(1, 'Bank Name is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
    branchName: z.string().min(1, 'Branch Name is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
    accountHolder: z.string().min(1, 'Account Holder is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
    accountNumber: z.string().min(1, 'Account Number is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces'),
    ifscCode: z.string().min(1, 'IFSC Code is required').regex(/^(?!\s)(?!.*\s$)/, 'Cannot start or end with spaces').regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code format'),
  })).max(3, 'Maximum 3 bank accounts allowed'),

  // Documents
  documents: z.object({}).optional(),

  // Product Purpose
  productPurpose: z.object({
    addOnMargin: z.enum(['Yes', 'No'], { message: 'Please select an option for Add on Margin' }).optional(),
    esignDocumentDownload: z.enum(['Yes', 'No'], { message: 'Please select an option for Esign Document Download' }).optional(),
    vkycDocumentDownload: z.enum(['Yes', 'No'], { message: 'Please select an option for VKYC Document Download' }).optional(),
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
    creditType: 
     z.record(z.enum(['CNC', 'linecredit']), z.boolean())
        .superRefine((val, ctx) => {
          if (!Object.values(val || {}).some(Boolean)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Please select at least one product type',
              path: [], // attach to the object itself
            });
          }
        }),
    purposeTypesForCard:
      z.record(z.enum(['personaltravel', 'businesstravel','education','immigration','employment','medical']), z.boolean())
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
  rateMargin: z.object({}).optional(),
  commission: z.object({}).optional(),
  corporateOnboarding: z.object({}).optional(),
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
    purposeTypesForCard: { personaltravel: true, businesstravel: false, education: false, immigration: false, employment: false, medical: false },
  },
};
