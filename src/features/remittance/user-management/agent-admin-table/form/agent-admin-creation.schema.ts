import { z } from 'zod';

// Zod schema for agent admin creation form
export const agentAdminCreationSchema = z.object({
  // Basic Information
  vendorCode: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required'),
  emailId: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phoneNo: z.string().optional(),
  agentType: z.string().optional(),
  agentBranchCity: z.string().optional(),
  agentHOBranchState: z.string().optional(),
  ebixRMName: z.string().optional(),
  ebixRMBranchName: z.string().optional(),
  systemCode: z.string().optional(),
  status: z.enum(['Active', 'Inactive'], { message: 'Please select a status' }),
  monthlyCreditLimit: z.string().min(1, 'Monthly credit limit is required').transform(val => parseFloat(val)).refine(val => !isNaN(val) && val > 0, 'Monthly credit limit must be a positive number'),
  totalCreditDays: z.string().min(1, 'Total credit days is required').transform(val => parseInt(val)).refine(val => !isNaN(val) && val > 0, 'Total credit days must be a positive integer'),

  // Placeholder for other steps
  companyDetails: z.object({}).optional(),
  financeDetails: z.object({}).optional(),
  documents: z.object({}).optional(),
  productPurpose: z.object({}).optional(),
  rateMargin: z.object({}).optional(),
  commission: z.object({}).optional(),
  corporateOnboarding: z.object({}).optional(),
});