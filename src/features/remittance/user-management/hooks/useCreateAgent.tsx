import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { agentAdminApi } from '../api/agentAdmin';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';
import { agentAdminCreationSchema } from '../agent-admin-table/form/agent-admin-creation.schema';
import { CreateAgentAdminRequest } from '../agent-admin-table/table/types';

type AgentAdminFormType = z.infer<typeof agentAdminCreationSchema>;

type CreateAgentOptions = {
  onAgentCreateSuccess?: () => void;
};

const transformFormData = (data: AgentAdminFormType): CreateAgentAdminRequest => {
  const commissionDetails = data.commission_details;
  return {
    basicInformation: {
      agent_name: data.agent_name,
      emailId: data.emailId,
      phoneNo: data.phoneNo || 'NA',
      agentType: data.agentType || '',
      agentBranchCity: data.agentBranchCity || 'NA',
      agentHOBranchState: data.agentHOBranchState || 'NA',
      rm_name: data.rm_name || 'NA',
      rm_branch_name: data.rm_branch_name || 'NA',
      systemCode: data.systemCode || 'NA',
      status: data.status,
      monthlyCreditLimit: Number(data.monthlyCreditLimit),
      totalCreditDays: Number(data.totalCreditDays),
      agent_category: [data?.agent_category],
      password: data?.password,
      pan_no: data?.pan_no || 'NA',
      entity_name: data?.entity_name || 'NA',
      date_of_incorporation: data?.date_of_incorporation || 'NA',
    },
    companyDetails: {
      gstClassification: data.gstClassification,
      gstNumber: data.gstNumber,
      gstPhoneNo: data.gstPhoneNo || 'NA',
      flatDoorNumber: data.flatDoorNumber || 'NA',
      roadStreet: data.roadStreet || 'NA',
      areaLocality: data.areaLocality || 'NA',
      gstCity: data.gstCity || 'NA',
      gstState: data.gstState || 'NA',
      pinCode: data.pinCode || 'NA',
      gstBranch: data.gstBranch || 'NA',
    },
    financeDetails: {
      financeSpocName: data.financeSpocName,
      financeSpocEmail: data.financeSpocEmail,
      financeSpocPhoneNo: data.financeSpocPhoneNo,
    },
    documents: {
      agreementValid: data.agreementValid || '',
      rbiLicenseCategory: data.rbiLicenseCategory || '',
      rbiLicenseValidity: data.rbiLicenseValidity || '',
      noOfBranches: Number(data.noOfBranches) || 0,
      extensionMonth: String(data.extensionMonth || ''),
      agreementCopy: '',
      rbiLicenseCopy: '',
    },
    productPurpose: {
      addOnForexMargin: data.productPurpose?.addOnForexMargin === 'Yes',
      addOnNostroMargin: data.productPurpose?.addOnNostroMargin === 'Yes',
      addOnTTMargin: data.productPurpose?.addOnTTMargin === 'Yes',
      addOnOtherChargersMargin: data.productPurpose?.addOnOtherChargersMargin === 'Yes',
      esignDocumentDownload: data.productPurpose?.esignDocumentDownload === 'Yes',
      vkycDocumentDownload: data.productPurpose?.vkycDocumentDownload === 'Yes',
      chooseProductType: data.productPurpose?.chooseProductType
        ? Object.keys(data.productPurpose.chooseProductType).filter(
            (key) => data.productPurpose.chooseProductType[key as keyof typeof data.productPurpose.chooseProductType]
          )
        : [],
      purposeTypesForCard: data.productPurpose?.purposeTypesForCard
        ? Object.keys(data.productPurpose.purposeTypesForCard).filter(
            (key) =>
              data.productPurpose.purposeTypesForCard![key as keyof typeof data.productPurpose.purposeTypesForCard]
          )
        : [],
    },
    rateMargin: {
      currency: {},
      card: { markupFlat: 0, markupPercent: 0 },
      remittance: { slabs: [] },
    },
    commission: commissionDetails
      ? {
          commission_product_type: commissionDetails.commission_product_type,
          commission_type: commissionDetails.commission_type,
          product_margin: {
            ...commissionDetails.product_margin,
            currency_list: Object.entries(commissionDetails.product_margin.currency_list || {}).map(
              ([currency_code, margin]) => ({ currency_code, margin })
            ),
          },
          nostro_charges: {
            ...commissionDetails.nostro_charges,
            currency_list: Object.entries(commissionDetails.nostro_charges.currency_list || {}).map(
              ([currency_code, margin]) => ({ currency_code, margin })
            ),
          },
          tt_charges: commissionDetails.tt_charges,
          other_charges: commissionDetails.other_charges,
        }
      : undefined,
  };
};

export const useCreateAgent = ({ onAgentCreateSuccess }: CreateAgentOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<any, Error, AgentAdminFormType>({
    mutationFn: (data) => {
      const transformedData = transformFormData(data);
      return agentAdminApi.createAgent(transformedData);
    },
    onSuccess: (data) => {
      toast.success('Agent created successfully');
      invalidateMultipleQueries([['getAgentAdmins']]);
      onAgentCreateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create Agent');
      console.error('Failed to create Agent:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};
