import { FieldType } from "@/types/enums";
import { Agent } from "../../api/agents";

export const branchAgentCreationConfig = (agents: Agent[] = []) => {
  const agentOptions = agents.map(agent => ({
    id: agent.id,
    agent_code: agent.agent_code,
    value: agent.agent_name,
    label: agent.agent_name,
  }));

  return {
    sectionTitle: "Admin Agent Creation",
    fields: {
      // Basic Information
      agent_code: {
        name: "basicInformation.agent_code",
        label: "Agent Code",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Agent Code",
      },
      agent_name: {
        name: "basicInformation.agent_name",
        label: "Agent Name",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Agent Name",
      },
      emailId: {
        name: "basicInformation.emailId",
        label: "Email ID",
        type: FieldType.Email,
        required: true,
        placeholder: "Enter Email ID",
      },
      phoneNo: {
        name: "basicInformation.phoneNo",
        label: "Phone No",
        type: FieldType.Phone,
        required: true,
        placeholder: "Enter Phone No",
      },
      agentType: {
        name: "basicInformation.agentType",
        label: "Agent Type",
        type: FieldType.Select,
        required: true,
        placeholder: "Select Agent Type",
        options: [
          { value: "type1", label: "Type 1" },
          { value: "type2", label: "Type 2" },
        ],
      },
      agentBranchCity: {
        name: "basicInformation.agentBranchCity",
        label: "Agent Branch City",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Agent Branch City",
      },
      agentHOBranchState: {
        name: "basicInformation.agentHOBranchState",
        label: "Agent HO Branch State",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Agent HO Branch State",
      },
      ebixRMName: {
        name: "basicInformation.ebixRMName",
        label: "Ebix RM Name",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Ebix RM Name",
      },
      ebixRMBranchName: {
        name: "basicInformation.ebixRMBranchName",
        label: "Ebix RM Branch Name",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Ebix RM Branch Name",
      },
      systemCode: {
        name: "basicInformation.systemCode",
        label: "System Code",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter System Code",
      },
      status: {
        name: "basicInformation.status",
        label: "Status",
        type: FieldType.Radio,
        required: true,
        options: {
          ACTIVE: { label: "Active", checked: true },
          INACTIVE: { label: "Inactive" },
        },
      },
      monthlyCreditLimit: {
        name: "basicInformation.monthlyCreditLimit",
        label: "Monthly Credit Limit",
        type: FieldType.Number,
        required: true,
        placeholder: "Enter Monthly Credit Limit",
      },
      totalCreditDays: {
        name: "basicInformation.totalCreditDays",
        label: "Total Credit Days",
        type: FieldType.Number,
        required: true,
        placeholder: "Enter Total Credit Days",
      },
      password: {
        name: "basicInformation.password",
        label: "Password",
        type: FieldType.Password,
        required: true,
        placeholder: "Enter Password",
      },

      // Company Details
      gstClassification: {
        name: "companyDetails.gstClassification",
        label: "GST Classification",
        type: FieldType.Select,
        required: true,
        placeholder: "Select GST Classification",
        options: [
          { value: "regular", label: "Regular" },
          { value: "composition", label: "Composition" },
          { value: "exempt", label: "Exempt" },
        ],
      },
      gstNumber: {
        name: "companyDetails.gstNumber",
        label: "GST Number",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter GST Number",
      },
      gstPhoneNo: {
        name: "companyDetails.gstPhoneNo",
        label: "GST Phone No",
        type: FieldType.Phone,
        required: true,
        placeholder: "Enter GST Phone No",
      },
      flatDoorNumber: {
        name: "companyDetails.flatDoorNumber",
        label: "Flat/Door Number",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Flat/Door Number",
      },
      roadStreet: {
        name: "companyDetails.roadStreet",
        label: "Road/Street",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Road/Street",
      },
      areaLocality: {
        name: "companyDetails.areaLocality",
        label: "Area/Locality",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Area/Locality",
      },
      gstCity: {
        name: "companyDetails.gstCity",
        label: "GST City",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter GST City",
      },
      gstState: {
        name: "companyDetails.gstState",
        label: "GST State",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter GST State",
      },
      pinCode: {
        name: "companyDetails.pinCode",
        label: "Pin Code",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Pin Code",
      },
      gstBranch: {
        name: "companyDetails.gstBranch",
        label: "GST Branch",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter GST Branch",
      },

      // Finance Details
      financeSpocName: {
        name: "financeDetails.financeSpocName",
        label: "Finance SPOC Name",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Finance SPOC Name",
      },
      financeSpocEmail: {
        name: "financeDetails.financeSpocEmail",
        label: "Finance SPOC Email",
        type: FieldType.Email,
        required: true,
        placeholder: "Enter Finance SPOC Email",
      },
      financeSpocPhoneNo: {
        name: "financeDetails.financeSpocPhoneNo",
        label: "Finance SPOC Phone No",
        type: FieldType.Phone,
        required: true,
        placeholder: "Enter Finance SPOC Phone No",
      },

      // Documents
      agreementValid: {
        name: "documents.agreementValid",
        label: "Agreement Valid",
        type: FieldType.Date,
        required: true,
        placeholder: "Select Agreement Validity Date",
      },
      rbiLicenseCategory: {
        name: "documents.rbiLicenseCategory",
        label: "RBI License Category",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter RBI License Category",
      },
      rbiLicenseValidity: {
        name: "documents.rbiLicenseValidity",
        label: "RBI License Validity",
        type: FieldType.Date,
        required: true,
        placeholder: "Select RBI License Validity Date",
      },
      noOfBranches: {
        name: "documents.noOfBranches",
        label: "No. of Branches",
        type: FieldType.Number,
        required: true,
        placeholder: "Enter Number of Branches",
      },
      extensionMonth: {
        name: "documents.extensionMonth",
        label: "Extension Month",
        type: FieldType.Text,
        required: true,
        placeholder: "Enter Extension Month",
      },

      // Product Purpose
      addOnMargin: {
        name: "productPurpose.addOnMargin",
        label: "Add On Margin",
        type: FieldType.Checkbox,
        required: false,
      },
      esignDocumentDownload: {
        name: "productPurpose.esignDocumentDownload",
        label: "eSign Document Download",
        type: FieldType.Checkbox,
        required: false,
      },
      vkycDocumentDownload: {
        name: "productPurpose.vkycDocumentDownload",
        label: "VKYC Document Download",
        type: FieldType.Checkbox,
        required: false,
      },
      chooseProductType: {
        name: "productPurpose.chooseProductType",
        label: "Choose Product Type",
        type: FieldType.Checkbox,
        required: true,
        isMulti: true,
        options: [
          { value: "card", label: "Card" },
          { value: "currency", label: "Currency" },
          { value: "remittance", label: "Remittance" },
          { value: "referral", label: "Referral" },
        ],
      },
      creditType: {
        name: "productPurpose.creditType",
        label: "Credit Type",
        type: FieldType.Checkbox,
        required: true,
        isMulti: true,
        options: [
          { value: "CNC", label: "CNC" },
          { value: "linecredit", label: "Line Credit" },
        ],
      },
      purposeTypesForCard: {
        name: "productPurpose.purposeTypesForCard",
        label: "Purpose Types for Card",
        type: FieldType.Checkbox,
        required: true,
        isMulti: true,
        options: [
          { value: "personaltravel", label: "Personal Travel" },
          { value: "businesstravel", label: "Business Travel" },
          { value: "education", label: "Education" },
          { value: "immigration", label: "Immigration" },
          { value: "employment", label: "Employment" },
          { value: "medical", label: "Medical" },
        ],
      },

      // Rate Margin - This will need custom handling for nested objects
      // Commission - This will need custom handling for nested objects
    },
  };
};
