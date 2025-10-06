export interface AgentAdminData {
  id: string;
  vendorCode: string;
  fullName: string;
  emailId: string;
  phoneNo: string;
  agentType: string;
  agentBranchCity: string;
  agentHOBranchState: string;
  ebixRMName: string;
  ebixRMBranchName: string;
  systemCode: string;
  status: string;
  monthlyCreditLimit: number;
  totalCreditDays: number;
  gstClassification: string;
  gstNumber: string;
  gstPhoneNo: string;
  flatDoorNumber: string | null;
  roadStreet: string | null;
  areaLocality: string | null;
  gstCity: string;
  gstState: string;
  pinCode: string;
  gstBranch: string;
  financeSpocName: string;
  financeSpocEmail: string;
  financeSpocPhoneNo: string;
  agreementValid: string;
  rbiLicenseCategory: string;
  rbiLicenseValidity: string;
  noOfBranches: number;
  extensionMonth: string;
  addOnMargin: boolean;
  esignDocumentDownload: boolean;
  vkycDocumentDownload: boolean;
  chooseProductType: string[];
  creditType: string[];
  purposeTypesForCard: string[];
  rateMargin: {
    currency: Record<string, { buy: number; sell: number }>;
    card: {
      markupFlat: number;
      markupPercent: number;
    };
    remittance: {
      slabs: Array<{
        min: number;
        max: number;
        margin: number;
      }>;
    };
  } | null;
  commission: {
    productType: Record<string, { type: string; value: number; fixed?: number; percent?: number }>;
    payoutFrequency: string;
    tcsApplies: boolean;
  } | null;
  corporateOnboarding: {
    enabled: boolean;
    kyc: {
      pan: boolean;
      gst: boolean;
      cin: boolean;
    };
    limits: {
      maxTransaction: number;
      dailyLimit: number;
    };
    allowedIndustries: string[];
  } | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentAdminRequest {
  basicInformation: {
    vendorCode: string;
    fullName: string;
    emailId: string;
    phoneNo: string;
    agentType: string;
    agentBranchCity: string;
    agentHOBranchState: string;
    ebixRMName: string;
    ebixRMBranchName: string;
    systemCode: string;
    status: string;
    monthlyCreditLimit: number;
    totalCreditDays: number;
  };
  companyDetails: {
    gstClassification: string;
    gstNumber: string;
    gstPhoneNo: string;
    flatDoorNumber: string;
    roadStreet: string;
    areaLocality: string;
    gstCity: string;
    gstState: string;
    pinCode: string;
    gstBranch: string;
  };
  financeDetails: {
    financeSpocName: string;
    financeSpocEmail: string;
    financeSpocPhoneNo: string;
  };
  documents: {
    agreementValid: string;
    rbiLicenseCategory: string;
    rbiLicenseValidity: string;
    noOfBranches: number;
    extensionMonth: number;
  };
  productPurpose: {
    addOnMargin: boolean;
    esignDocumentDownload: boolean;
    vkycDocumentDownload: boolean;
    chooseProductType: string[];
    creditType: string[];
    purposeTypesForCard: string[];
  };
  rateMargin: {
    currency: Record<string, { buy: number; sell: number }>;
    card: {
      markupFlat: number;
      markupPercent: number;
    };
    remittance: {
      slabs: Array<{
        min: number;
        max: number;
        margin: number;
      }>;
    };
  };
  commission: {
    productType: Record<string, { type: string; value: number; fixed?: number; percent?: number }>;
    payoutFrequency: string;
    tcsApplies: boolean;
  };
  corporateOnboarding: {
    enabled: boolean;
    kyc: {
      pan: boolean;
      gst: boolean;
      cin: boolean;
    };
    limits: {
      maxTransaction: number;
      dailyLimit: number;
    };
    allowedIndustries: string[];
  };
}

export interface UpdateAgentAdminRequest extends CreateAgentAdminRequest {
  id: string;
}
