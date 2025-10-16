import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { agentAdminCreationSchema } from '../agent-admin-creation.schema';

type AgentAdminFormType = z.infer<typeof agentAdminCreationSchema>;

// Helper function to convert "NA" values to empty strings
const normalizeValue = (value: any): any => {
  if (value === 'NA' || value === null || value === undefined) {
    return '';
  }
  return value;
};

// Function to transform editData to form structure
export const transformEditDataToFormData = (editData: any) => {
  return {
    agent_code: normalizeValue(editData.agent_code),
    agent_name: normalizeValue(editData.agent_name),
    emailId: normalizeValue(editData.email),
    phoneNo: normalizeValue(editData.phone_number),
    agentType: normalizeValue(editData.agent_type).toUpperCase().replace(/-/g, ''),
    agentBranchCity: normalizeValue(editData.agent_branch_city),
    agentHOBranchState: normalizeValue(editData.agent_ho_branch_state),
    rm_name: normalizeValue(editData.rm_name),
    rm_branch_name: normalizeValue(editData.rm_branch_name),
    systemCode: normalizeValue(editData.system_code),
    status: (editData.status === 'ACTIVE' ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
    monthlyCreditLimit: editData.monthly_credit_limit || 0,
    totalCreditDays: editData.total_credit_days || 0,
    // Company Details
    gstClassification: normalizeValue(editData.company_details?.gstClassification),
    gstNumber: normalizeValue(editData.company_details?.gstNumber),
    gstPhoneNo: normalizeValue(editData.company_details?.gstPhoneNo),
    flatDoorNumber: normalizeValue(editData.company_details?.flatDoorNumber),
    roadStreet: normalizeValue(editData.company_details?.roadStreet),
    areaLocality: normalizeValue(editData.company_details?.areaLocality),
    gstCity: normalizeValue(editData.company_details?.gstCity),
    gstState: normalizeValue(editData.company_details?.gstState),
    pinCode: normalizeValue(editData.company_details?.pinCode),
    gstBranch: normalizeValue(editData.company_details?.gstBranch),
    // Finance Details
    financeSpocName: normalizeValue(editData.finance_details?.financeSpocName),
    financeSpocEmail: normalizeValue(editData.finance_details?.financeSpocEmail),
    financeSpocPhoneNo: normalizeValue(editData.finance_details?.financeSpocPhoneNo),
    bankAccounts: editData.finance_details?.bankAccounts || [],
    // Documents
    agreementValid: normalizeValue(editData.documents?.agreementValid),
    rbiLicenseCategory: normalizeValue(editData.documents?.rbiLicenseCategory),
    rbiLicenseValidity: normalizeValue(editData.documents?.rbiLicenseValidity),
    noOfBranches: editData.documents?.noOfBranches || '',
    extensionMonth: editData.documents?.extensionMonth || '',
    agreementCopy: editData.documents?.agreementCopy || '',
    rbiLicenseCopy: editData.documents?.rbiLicenseCopy || '',
    productPurpose: {
      // Convert boolean values to 'Yes'/'No' strings for radio button fields
      addOnForexMargin: editData.product_purpose?.addOnForexMargin ? 'Yes' : 'No',
      addOnNostroMargin: editData.product_purpose?.addOnNostroMargin ? 'Yes' : 'No',
      addOnTTMargin: editData.product_purpose?.addOnTTMargin ? 'Yes' : 'No',
      addOnOtherChargersMargin: editData.product_purpose?.addOnOtherChargersMargin ? 'Yes' : 'No',
      esignDocumentDownload: editData.product_purpose?.esignDocumentDownload ? 'Yes' : 'No',
      vkycDocumentDownload: editData.product_purpose?.vkycDocumentDownload ? 'Yes' : 'No',
      // Convert arrays to objects if needed
      agentCategory:
        editData.product_purpose?.agentCategory?.reduce(
          (acc: Record<string, boolean>, type: string) => ({ ...acc, [type.toLowerCase()]: true }),
          {}
        ) || {},
      chooseProductType:
        editData.product_purpose?.chooseProductType?.reduce(
          (acc: Record<string, boolean>, type: string) => ({ ...acc, [type]: true }),
          {}
        ) || {},
      purposeTypesForCard:
        editData.product_purpose?.purposeTypesForCard?.reduce(
          (acc: Record<string, boolean>, type: string) => ({ ...acc, [type]: true }),
          {}
        ) || {},
    },
    rateMargin: editData.rate_margin,
    commission_details: {
      commission_product_type: editData.commission?.commission_product_type || 'Remittance',
      commission_type: editData.commission?.commission_type || 'HYBRID',
      product_margin: {
        agent_fixed_margin: editData.commission?.product_margin?.agent_fixed_margin || 'PERCENTAGE',
        all_currency: editData.commission?.product_margin?.all_currency || 'ALL_CURRENCY',
        all_currency_margin:
          editData.commission?.product_margin?.all_currency_value ||
          editData.commission?.product_margin?.all_currency_margin ||
          0,
        currency_list: Array.isArray(editData.commission?.product_margin?.currency_list)
          ? editData.commission.product_margin.currency_list.reduce(
              (acc: Record<string, number>, item: { currency_code: string; margin: number }) => ({
                ...acc,
                [item.currency_code]: item.margin,
              }),
              {}
            )
          : editData.commission?.product_margin?.currency_list || {},
      },
      nostro_charges: {
        type: editData.commission?.nostro_charges?.type || 'FX',
        all_currency: editData.commission?.nostro_charges?.all_currency || 'ALL_CURRENCY',
        all_currency_margin:
          editData.commission?.nostro_charges?.all_currency_value ||
          editData.commission?.nostro_charges?.all_currency_margin ||
          0,
        currency_list: Array.isArray(editData.commission?.nostro_charges?.currency_list)
          ? editData.commission.nostro_charges.currency_list.reduce(
              (acc: Record<string, number>, item: { currency_code: string; margin: number }) => ({
                ...acc,
                [item.currency_code]: item.margin,
              }),
              {}
            )
          : editData.commission?.nostro_charges?.currency_list || {},
      },
      tt_charges: {
        rate: editData.commission?.tt_charges?.rate || 0,
      },
      other_charges: {
        rate: editData.commission?.other_charges?.rate || 0,
      },
    },
    corporateOnboarding: editData.corporate_onboarding,
  };
};

// Function to reset the form with edit data
export const resetAgentAdminForm = (methods: UseFormReturn<any>, editData: any) => {
  const formData = transformEditDataToFormData(editData);
  methods.reset(formData);

  // Explicitly set some fields to ensure they patch correctly
  setTimeout(() => {
    methods.setValue('agentType', editData.agent_type.toUpperCase().replace(/-/g, ''), {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });
    methods.setValue('agreementValid', editData.documents?.agreementValid || editData.agreementValid, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    methods.setValue('rbiLicenseValidity', editData.documents?.rbiLicenseValidity || editData.rbiLicenseValidity, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    methods.setValue('rbiLicenseCategory', editData.documents?.rbiLicenseCategory || editData.rbiLicenseCategory, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    methods.setValue('noOfBranches', editData.documents?.noOfBranches || editData.noOfBranches, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    methods.setValue('extensionMonth', editData.documents?.extensionMonth || editData.extensionMonth, {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
  }, 0);
};
