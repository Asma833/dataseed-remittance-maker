import { z } from "zod";

// Zod schema for branch agent creation form
export const branchAgentSchema = z.object({
  agentDetails: z.object({
    vendorName: z
      .string()
      .min(1, "Vendor name is required")
      .min(2, "Vendor name must be at least 2 characters")
      .max(100, "Vendor name must be less than 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Vendor name can only contain letters and spaces"),

    vendorCode: z
      .string()
      .min(1, "Vendor code is required")
      .min(2, "Vendor code must be at least 2 characters")
      .max(50, "Vendor code must be less than 50 characters")
      .regex(/^[A-Z0-9]+$/, "Vendor code can only contain uppercase letters and numbers"),

    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    emailId: z
      .string()
      .min(1, "Email ID is required")
      .email("Please enter a valid email address")
      .max(255, "Email ID must be less than 255 characters"),

    mobileNo: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid mobile number")
      .min(10, "Mobile number must be at least 10 digits")
      .max(15, "Mobile number must be less than 15 digits"),

    state: z
      .string()
      .min(1, "State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "State can only contain letters and spaces"),

    city: z
      .string()
      .min(1, "City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces"),

    branch: z
      .string()
      .min(1, "Branch is required")
      .min(2, "Branch must be at least 2 characters")
      .max(100, "Branch must be less than 100 characters"),

    role: z
      .enum(["maker", "checker"])
      .refine((val) => val !== undefined, {
        message: "Please select a role"
      }),

    checkerList: z
      .string()
      .min(1, "Please select a checker")
      .refine((val) => val !== "", {
        message: "Please select a checker from the list"
      })
  })
});