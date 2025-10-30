export interface AgentAdminData {
  id: string;
  agent_code: string;
  agent_name: string;
  email: string | null;
  phone_number: string | null;
  agent_type: string | null;
  agent_branch_city: string | null;
  agent_ho_branch_state: string | null;
  rm_name: string | null;
  rm_branch_name: string | null;
  system_code: string | null;
  status: string | null;
  monthly_credit_limit: string | null;
  total_credit_days: number | null;
  agent_category: string;
  password: string | null;
  company_details: {
    gstCity: string;
    pinCode: string;
    gstState: string;
    gstBranch: string;
    gstNumber: string;
    gstPhoneNo: string;
    roadStreet: string;
    areaLocality: string;
    flatDoorNumber: string;
    gstClassification: string;
  } | null;
  finance_details: {
    financeSpocName: string;
    financeSpocEmail: string;
    financeSpocPhoneNo: string;
  } | null;
  documents: {
    noOfBranches: number;
    agreementValid: string;
    extensionMonth: string;
    rbiLicenseCategory: string;
    rbiLicenseValidity: string;
  } | null;
  product_purpose: {
    addOnMargin: boolean;
    chooseProductType: string[];
    purposeTypesForCard: string[];
    vkycDocumentDownload: boolean;
    esignDocumentDownload: boolean;
  } | null;
  rate_margin: {
    card: {
      markupFlat: number;
      markupPercent: number;
    };
    currency: Record<string, { buy: number; sell: number }>;
    remittance: {
      slabs: Array<{
        min: number;
        max: number;
        margin: number;
      }>;
    };
  } | null;
  commission: {
    tt_charges: {
      rate: number;
    };
    other_charges: {
      rate: number;
    };
    nostro_charges: {
      type: string;
      all_currency: string;
      currency_list: Array<{
        margin: number;
        currency_code: string;
      }>;
      all_currency_margin: number;
    };
    product_margin: {
      all_currency: string;
      currency_list: Array<{
        margin: number;
        currency_code: string;
      }>;
      agent_fixed_margin: string;
      all_currency_margin: number;
    };
    commission_type: string;
    commission_product_type: string;
  } | null;
  corporate_onboarding: any | null;
}

export interface CreateAgentAdminRequest {
  basicInformation: {
    agent_name: string;
    emailId: string;
    phoneNo: string;
    agentType: string;
    agentBranchCity: string;
    agentHOBranchState: string;
    rm_name: string;
    rm_branch_name: string;
    systemCode: string;
    status: string;
    monthlyCreditLimit: number;
    totalCreditDays: number;
    agent_category: string[];
    password: string;
    pan_no: string;
    entity_name: string;
    date_of_incorporation: string;
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
    extensionMonth: string;
    agreementCopy: string;
    rbiLicenseCopy: string;
  };
  productPurpose: {
    addOnForexMargin: boolean;
    addOnNostroMargin: boolean;
    addOnTTMargin: boolean;
    addOnOtherChargersMargin: boolean;
    esignDocumentDownload: boolean;
    vkycDocumentDownload: boolean;
    chooseProductType: string[];
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
  commission:
    | {
        commission_product_type: string;
        commission_type: string;
        product_margin: {
          agent_fixed_margin: string;
          all_currency: string;
          all_currency_margin: number;
          currency_list: Array<{
            margin: number;
            currency_code: string;
          }>;
        };
        nostro_charges: {
          type: string;
          all_currency: string;
          all_currency_margin: number;
          currency_list: Array<{
            margin: number;
            currency_code: string;
          }>;
        };
        tt_charges: {
          rate: number;
        };
        other_charges: {
          rate: number;
        };
      }
    | undefined;
}

export interface UpdateAgentAdminRequest extends CreateAgentAdminRequest {
  id: string;
}
