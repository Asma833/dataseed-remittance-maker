import { z } from "zod";

// Zod schema for super checker creation form
export const superCheckerSchema = z.object({
  checkerDetails: z.object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters"),

    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits"),

    location: z
      .string()
      .min(1, "Location is required")
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be less than 100 characters"),

    productType: z
      .record(z.enum(["card","currency","remittance","referral"]), z.boolean())
      .refine((val) => {
        // Check if at least one option is selected
        return Object.values(val).some(selected => selected === true);
      }, {
        message: "Please select at least one product type"
      }),

    status: z
      .enum(["active", "inactive"])
      .refine((val) => val !== undefined, {
        message: "Please select a status"
      }),

    agents: z
      .array(z.string())
      .min(1, "Please select at least one agent"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),

    transactionTypeMap: z.record(z.enum(["card","currency","remittance","referral"]), z.enum(["buy", "sell"]))
      .refine((val) => {
        // Ensure transactionTypeMap has values for selected products
        return val && Object.keys(val).length > 0;
      }, {
        message: "Please select transaction types for selected products"
      })
  })
}).refine((data) => data.checkerDetails.password === data.checkerDetails.confirmPassword, {
  message: "Passwords do not match",
  path: ["checkerDetails", "confirmPassword"],
});

