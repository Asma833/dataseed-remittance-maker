import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { agentAdminApi } from '../api/agentAdmin';
import { UpdateAgentAdminRequest, AgentAdminData } from '../agent-admin-table/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';
import { agentAdminCreationSchema } from '../agent-admin-table/form/agent-admin-creation.schema';
import { uploadRemittanceImage } from '../api/documents';

type AgentAdminFormType = z.infer<typeof agentAdminCreationSchema>;

const transformFormData = (data: AgentAdminFormType) => {
  const commissionDetails = data.commission_details;
  return {
    basicInformation: {
      agent_code: data.agent_code || '',
      agent_name: data.agent_name,
      emailId: data.emailId,
      phoneNo: data.phoneNo || '',
      agentType: data.agentType || '',
      agentBranchCity: data.agentBranchCity || '',
      agentHOBranchState: data.agentHOBranchState || '',
      ebixRMName: data.ebixRMName || '',
      ebixRMBranchName: data.ebixRMBranchName || '',
      systemCode: data.systemCode || '',
      status: data.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      monthlyCreditLimit: Number(data.monthlyCreditLimit),
      totalCreditDays: Number(data.totalCreditDays),
    },
    companyDetails: {
      gstClassification: data.gstClassification,
      gstNumber: data.gstNumber,
      gstPhoneNo: data.gstPhoneNo || '',
      flatDoorNumber: data.flatDoorNumber || '',
      roadStreet: data.roadStreet || '',
      areaLocality: data.areaLocality || '',
      gstCity: data.gstCity || '',
      gstState: data.gstState,
      pinCode: data.pinCode,
      gstBranch: data.gstBranch,
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
      chooseProductType: data.productPurpose?.chooseProductType ? Object.keys(data.productPurpose.chooseProductType).filter(key => data.productPurpose.chooseProductType[key as keyof typeof data.productPurpose.chooseProductType]) : [],
      creditType: data.productPurpose?.creditType ? Object.keys(data.productPurpose.creditType).filter(key => data.productPurpose.creditType[key as keyof typeof data.productPurpose.creditType]) : [],
      purposeTypesForCard: data.productPurpose?.purposeTypesForCard ? Object.keys(data.productPurpose.purposeTypesForCard).filter(key => data.productPurpose.purposeTypesForCard[key as keyof typeof data.productPurpose.purposeTypesForCard]) : [],
    },
    rateMargin: {
      currency: {},
      card: { markupFlat: 0, markupPercent: 0 },
      remittance: { slabs: [] },
    },
    commission: commissionDetails ? {
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
    } : undefined,
  };
};

type UpdateAgentAdminOptions = {
  onAgentAdminUpdateSuccess?: () => void;
};

export const useUpdateAgentAdmin = ({ onAgentAdminUpdateSuccess }: UpdateAgentAdminOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<AgentAdminData, Error, { id: string; formData: AgentAdminFormType }>({
    mutationFn: ({ id, formData }) => {
      const transformedData = transformFormData(formData);
      console.log('Transformed data for update API:', transformedData);
      return agentAdminApi.updateAgentAdmin({ id, ...transformedData });
    },
    onSuccess: (data) => {
      toast.success('Agent Admin updated successfully');
      invalidateMultipleQueries([['getAgentAdmins']]);
      onAgentAdminUpdateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update Agent Admin');
      console.error('Failed to update Agent Admin:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};