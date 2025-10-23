import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { agentAdminApi } from '../api/agentAdmin';
import { AgentAdminData } from '../agent-admin-table/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';
import { agentAdminCreationSchema } from '../agent-admin-table/form/agent-admin-creation.schema';

type AgentAdminFormType = z.infer<typeof agentAdminCreationSchema>;

const transformFormData = (data: AgentAdminFormType) => {
  const commissionDetails = data.commission_details;
  return {
    basicInformation: {
      agent_name: data.agent_name,
      emailId: data.emailId,
      phoneNo: data.phoneNo || 'NA',
      agentType: data.agentType || 'NA',
      agentBranchCity: data.agentBranchCity || 'NA',
      agentHOBranchState: data.agentHOBranchState || 'NA',
      rm_name: data.rm_name || 'NA',
      rm_branch_name: data.rm_branch_name || 'NA',
      systemCode: data.systemCode || 'NA',
      status: data.status === 'Active' ? 'ACTIVE' : 'INACTIVE',
      monthlyCreditLimit: Number(data.monthlyCreditLimit),
      totalCreditDays: Number(data.totalCreditDays),
      agent_category: [data?.agent_category],
      password:data?.password,
      pan_no:data?.pan_no || 'NA',
      entity_name:data?.entity_name || 'NA',
      date_of_incorporation:data?.date_of_incorporation || 'NA'
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
      agreementCopy: data.agreementCopy,
      rbiLicenseCopy: data.rbiLicenseCopy,
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
      purposeTypesForCard: (() => {
        const fields = [
          { key: 'card', field: 'purposeTypesForCard' },
          { key: 'currency', field: 'purposeTypesForCurrency' },
          { key: 'remittance', field: 'purposeTypesForRemittance' },
          { key: 'referral', field: 'purposeTypesForReferral' },
        ];

        const result: string[] = [];

        fields.forEach(({ key, field }) => {
          const purposeField = data.productPurpose?.[field as keyof typeof data.productPurpose];
          if (purposeField && typeof purposeField === 'object') {
            const selected = Object.keys(purposeField).filter(
              (k) => (purposeField as Record<string, boolean>)[k]
            );
            if (selected.length > 0) {
              result.push(`${key}:${selected.join(',')}`);
            }
          }
        });

        return result;
      })(),
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
            all_currency_margin: commissionDetails.product_margin.all_currency_margin ?? 0,
            currency_list: Object.entries(commissionDetails.product_margin.currency_list || {}).map(
              ([currency_code, margin]) => ({ currency_code, margin })
            ),
          },
          nostro_charges: {
            ...commissionDetails.nostro_charges,
            all_currency_margin: commissionDetails.nostro_charges.all_currency_margin ?? 0,
            currency_list: Object.entries(commissionDetails.nostro_charges.currency_list || {}).map(
              ([currency_code, margin]) => ({ currency_code, margin })
            ),
          },
          tt_charges: {
            rate: commissionDetails.tt_charges?.rate ?? 0,
          },
          other_charges: {
            rate: commissionDetails.other_charges?.rate ?? 0,
          },
        }
      : undefined,
  };
};

type UpdateAgentAdminOptions = {
  onAgentAdminUpdateSuccess?: () => void;
};

export const useUpdateAgentAdmin = ({ onAgentAdminUpdateSuccess }: UpdateAgentAdminOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<AgentAdminData, Error, { id: string; formData: AgentAdminFormType }>(
    {
      mutationFn: ({ id, formData }) => {
        const transformedData = transformFormData(formData);
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
    }
  );

  return { mutate, isLoading: isPending, error };
};
