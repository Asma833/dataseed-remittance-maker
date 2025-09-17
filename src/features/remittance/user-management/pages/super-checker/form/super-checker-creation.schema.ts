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
      .enum(["card","currency","remittance","referral"])
      .refine((val) => val !== undefined, {
        message: "Please select a product type"
      }),

    transactionType: z
      .enum(["buy", "sell"])
      .refine((val) => val !== undefined, {
        message: "Please select a transaction type"
      }),

    status: z
      .enum(["active", "inactive"])
      .refine((val) => val !== undefined, {
        message: "Please select a status"
      }),

    agents: z
      .array(z.string())
      .min(1, "Please select at least one agent"),

    transactionTypeMap: z.record(z.enum(["card","currency","remittance","referral"]), z.enum(["buy", "sell"])).optional()
  })
});

