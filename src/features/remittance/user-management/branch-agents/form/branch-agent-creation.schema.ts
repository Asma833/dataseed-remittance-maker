import * as z from "zod";

/** ---------- SECTIONED FIELDS (with specific messages) ---------- */

export const vendorDetailsSchema = z.object({
  vendorName: z
    .string()
    .min(1, "Vendor name is required")
    .refine((val) => val.trim().length > 0, "Vendor name cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "Vendor name cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "Vendor name cannot start with space or hyphen")
    .describe("Agent Vendor Name"),
  vendorCode: z
    .string()
    .min(1, "Vendor code is required")
    .refine((val) => val.trim().length > 0, "Vendor code cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "Vendor code cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "Vendor code cannot start with space or hyphen")
    .describe("Agent Vendor Code"),
  // systemCode: z
  //   .string()
  //   .min(1, "System code is required")
  //   .describe("System Code"),
});

export const basicDetailsSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine((val) => val.trim().length > 0, "Full name cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "Full name cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "Full name cannot start with space or hyphen")
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
  state: z
    .string()
    .min(1, "State is required")
    .refine((val) => val.trim().length > 0, "State cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "State cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "State cannot start with space or hyphen")
    .describe("State"),
  city: z
    .string()
    .min(1, "City is required")
    .refine((val) => val.trim().length > 0, "City cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "City cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "City cannot start with space or hyphen")
    .describe("City"),
  branch: z
    .string()
    .min(1, "Branch is required")
    .refine((val) => val.trim().length > 0, "Branch cannot be only spaces")
    .refine((val) => !/^[\s-]+$/.test(val), "Branch cannot contain only spaces or hyphens")
    .refine((val) => !/^[\s-]/.test(val), "Branch cannot start with space or hyphen")
    .describe("Branch"),
});

export const roleStatusSchema = z.object({
  role: z
    .any()
    .refine((val) => {
      if (typeof val === 'string' && val.length > 0) return true;
      if (Array.isArray(val) && val.length > 0) return true;
      if (typeof val === 'object' && val !== null) {
        return Object.values(val).some(v => v === true);
      }
      return false;
    }, {
      message: "Role is required"
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
      .refine((val) => val.trim().length >= 8, "Password cannot be only spaces")
      .refine((val) => !/^[\s-]+$/.test(val), "Password cannot contain only spaces or hyphens")
      .refine((val) => !/^[\s-]/.test(val), "Password cannot start with space or hyphen")
      .describe("Password"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .refine((val) => val.trim().length >= 8, "Confirm password cannot be only spaces")
      .refine((val) => !/^[\s-]+$/.test(val), "Confirm password cannot contain only spaces or hyphens")
      .refine((val) => !/^[\s-]/.test(val), "Confirm password cannot start with space or hyphen")
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
