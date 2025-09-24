import { z } from 'zod';

// Zod schema for agent admin creation form
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
    chooseProductType: z.array(z.string()).min(1, 'Please select at least one product type'),
    creditType: z.array(z.string()).min(1, 'Please select at least one credit type'),
    purposeTypesForCard: z.array(z.string()).min(1, 'Please select at least one purpose type for card'),
  }).optional(),

  rateMargin: z.object({}).optional(),
  commission: z.object({}).optional(),
  corporateOnboarding: z.object({}).optional(),
});
