import * as z from "zod";

/** ---------- SECTIONED FIELDS (with specific messages) ---------- */

export const basicInformationSchema = z.object({
  agent_code: z
    .string()
    .min(1, "Agent code is required")
    .describe("Agent Code"),
  agent_name: z
    .string()
    .min(1, "Agent name is required")
    .describe("Agent Name"),
  emailId: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .describe("Email ID"),
  phoneNo: z
    .string()
    .min(1, "Phone number is required")
    .describe("Phone No"),
  agentType: z
    .string()
    .min(1, "Agent type is required")
    .describe("Agent Type"),
  agentBranchCity: z
    .string()
    .min(1, "Agent branch city is required")
    .describe("Agent Branch City"),
  agentHOBranchState: z
    .string()
    .min(1, "Agent HO branch state is required")
    .describe("Agent HO Branch State"),
  ebixRMName: z
    .string()
    .min(1, "Ebix RM name is required")
    .describe("Ebix RM Name"),
  ebixRMBranchName: z
    .string()
    .min(1, "Ebix RM branch name is required")
    .describe("Ebix RM Branch Name"),
  systemCode: z
    .string()
    .min(1, "System code is required")
    .describe("System Code"),
  status: z
    .enum(["ACTIVE", "INACTIVE"], {
      message: "Status is required",
    })
    .describe("Status"),
  monthlyCreditLimit: z
    .number()
    .min(0, "Monthly credit limit must be positive")
    .describe("Monthly Credit Limit"),
  totalCreditDays: z
    .number()
    .min(1, "Total credit days must be at least 1")
    .describe("Total Credit Days"),
  password: z
    .string()
    .min(1, "Password is required")
    .describe("Password"),
  });

export const companyDetailsSchema = z.object({
  gstClassification: z
    .enum(["regular", "composition", "exempt"], {
      message: "GST classification is required",
    })
    .describe("GST Classification"),
  gstNumber: z
    .string()
    .min(1, "GST number is required")
    .describe("GST Number"),
  gstPhoneNo: z
    .string()
    .min(1, "GST phone number is required")
    .describe("GST Phone No"),
  flatDoorNumber: z
    .string()
    .min(1, "Flat/Door number is required")
    .describe("Flat/Door Number"),
  roadStreet: z
    .string()
    .min(1, "Road/Street is required")
    .describe("Road/Street"),
  areaLocality: z
    .string()
    .min(1, "Area/Locality is required")
    .describe("Area/Locality"),
  gstCity: z
    .string()
    .min(1, "GST city is required")
    .describe("GST City"),
  gstState: z
    .string()
    .min(1, "GST state is required")
    .describe("GST State"),
  pinCode: z
    .string()
    .min(1, "Pin code is required")
    .describe("Pin Code"),
  gstBranch: z
    .string()
    .min(1, "GST branch is required")
    .describe("GST Branch"),
});

export const financeDetailsSchema = z.object({
  financeSpocName: z
    .string()
    .min(1, "Finance SPOC name is required")
    .describe("Finance SPOC Name"),
  financeSpocEmail: z
    .string()
    .min(1, "Finance SPOC email is required")
    .email("Please enter a valid email")
    .describe("Finance SPOC Email"),
  financeSpocPhoneNo: z
    .string()
    .min(1, "Finance SPOC phone number is required")
    .describe("Finance SPOC Phone No"),
});

export const documentsSchema = z.object({
  agreementValid: z
    .string()
    .min(1, "Agreement validity is required")
    .describe("Agreement Valid"),
  rbiLicenseCategory: z
    .string()
    .min(1, "RBI license category is required")
    .describe("RBI License Category"),
  rbiLicenseValidity: z
    .string()
    .min(1, "RBI license validity is required")
    .describe("RBI License Validity"),
  noOfBranches: z
    .number()
    .min(1, "Number of branches must be at least 1")
    .describe("No. of Branches"),
  extensionMonth: z
    .string()
    .min(1, "Extension month is required")
    .describe("Extension Month"),
});

export const productPurposeSchema = z.object({
  addOnMargin: z
    .boolean()
    .describe("Add On Margin"),
  esignDocumentDownload: z
    .boolean()
    .describe("eSign Document Download"),
  vkycDocumentDownload: z
    .boolean()
    .describe("VKYC Document Download"),
  chooseProductType: z
    .array(z.enum(["card", "currency", "remittance", "referral"]))
    .min(1, "At least one product type must be selected")
    .describe("Choose Product Type"),
  creditType: z
    .array(z.enum(["CNC", "linecredit"]))
    .min(1, "At least one credit type must be selected")
    .describe("Credit Type"),
  purposeTypesForCard: z
    .array(z.enum([
      "personaltravel",
      "businesstravel",
      "education",
      "immigration",
      "employment",
      "medical"
    ]))
    .min(1, "At least one purpose type for card must be selected")
    .describe("Purpose Types for Card"),
});

export const rateMarginSchema = z.object({
  currency: z
    .record(z.string(), z.object({
      buy: z.number().min(0),
      sell: z.number().min(0),
    }))
    .describe("Currency Margins"),
  card: z.object({
    markupFlat: z.number().min(0).describe("Markup Flat"),
    markupPercent: z.number().min(0).describe("Markup Percent"),
  }),
  remittance: z.object({
    slabs: z.array(z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      margin: z.number().min(0),
    })).min(1, "At least one slab is required"),
  }),
});

export const commissionSchema = z.object({
  commission_product_type: z
    .enum(["Remittance", "Card", "Currency"], {
      message: "Commission product type is required",
    })
    .describe("Commission Product Type"),
  commission_type: z
    .enum(["FIXED", "PERCENTAGE", "HYBRID"], {
      message: "Commission type is required",
    })
    .describe("Commission Type"),
  product_margin: z.object({
    agent_fixed_margin: z.enum(["FIXED", "PERCENTAGE"]),
    all_currency: z.enum(["ALL_CURRENCY", "SPECIFIC"]),
    all_currency_margin: z.number().min(0),
    currency_list: z.array(z.object({
      currency_code: z.string(),
      margin: z.number().min(0),
    })),
  }),
  nostro_charges: z.object({
    type: z.enum(["FX", "PERCENTAGE"]),
    all_currency: z.enum(["ALL_CURRENCY", "SPECIFIC"]),
    all_currency_margin: z.number().min(0),
    currency_list: z.array(z.object({
      currency_code: z.string(),
      margin: z.number().min(0),
    })),
  }),
  tt_charges: z.object({
    rate: z.number().min(0),
  }),
  other_charges: z.object({
    rate: z.number().min(0),
  }),
});

/** ---------- TOP-LEVEL FORM SCHEMA ---------- */

export const branchAgentSchema = z.object({
  basicInformation: basicInformationSchema,
  companyDetails: companyDetailsSchema,
  financeDetails: financeDetailsSchema,
  documents: documentsSchema,
  productPurpose: productPurposeSchema,
  rateMargin: rateMarginSchema,
  commission: commissionSchema,
});

export type BranchAgentForm = z.infer<typeof branchAgentSchema>;
