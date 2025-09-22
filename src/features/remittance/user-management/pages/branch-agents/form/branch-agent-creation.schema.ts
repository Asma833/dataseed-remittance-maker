import * as z from "zod";

/** ---------- SECTIONED FIELDS (with specific messages) ---------- */

export const vendorDetailsSchema = z.object({
  vendorName: z
    .string()
    .min(1, "Vendor name is required")
    .describe("Agent Vendor Name"),
  vendorCode: z
    .string()
    .min(1, "Vendor code is required")
    .describe("Agent Vendor Code"),
  systemCode: z
    .string()
    .min(1, "System code is required")
    .describe("System Code"),
});

export const basicDetailsSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .describe("Full Name"),
  emailId: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .describe("Email Id"),
  mobileNo: z
    .string()
    .min(1, "Phone number is required")
    .describe("Phone No."),
});

export const addressSchema = z.object({
  state: z.string().min(1, "State is required").describe("State"),
  city: z.string().min(1, "City is required").describe("City"),
  branch: z.string().min(1, "Branch is required").describe("Branch"),
});

export const roleStatusSchema = z.object({
  role: z
    .enum(["maker", "checker", "both", "admin"], {
      message: "Role is required",
    })
    .describe("Choose Role"),
  checkerList: z
    .string()
    .min(1, "Please select at least one checker")
    .describe("Select Checker"),
  status: z
    .enum(["active", "inactive"], {
      message: "Status is required",
    })
    .describe("Status"),
});

export const securitySchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .describe("Password"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .describe("Confirm Password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

/** ---------- TOP-LEVEL FORM SCHEMA ---------- */

export const branchAgentSchema = z.object({
  agentDetails: z.object({
    vendorDetails: vendorDetailsSchema,
    basicDetails: basicDetailsSchema,
    address: addressSchema,
    roleStatus: roleStatusSchema,
    security: securitySchema,
  }),
});

export type BranchAgentForm = z.infer<typeof branchAgentSchema>;
