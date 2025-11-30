import { useState } from 'react';
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import EsignStatusCell from '@/components/cell/table/EsignStatusCell';
import VKycStatusCell from '@/components/cell/table/VKycStatusCell';
import { Eye } from 'lucide-react';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import { SignLinkButton } from '@/components/common/single-link-button';
import TooltipActionButton from '@/components/common/tooltip-action-button';

export const KycTableColumnsConfig = ({
  handleRegenerateEsignLink,
  handleRegenerateVkycLink,
  isSendEsignLinkLoading = false,
  isSendVkycLinkLoading = false,
  loadingOrderId = null,
  navigate,
}: {
  handleRegenerateEsignLink: (rowData: any) => void;
  handleRegenerateVkycLink: (rowData: any) => void;
  isSendEsignLinkLoading?: boolean;
  isSendVkycLinkLoading?: boolean;
  loadingOrderId?: string | null;
  navigate: (url: string) => void;
}) => {
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);
  return [
  {
    key: 'nium_reference_no',
    id: 'nium_reference_no',
    name: 'Nium Ref.No',
    className: 'min-w-0 p-2',
  },
  {
    key: 'agent_reference_no',
    id: 'agent_reference_no',
    name: 'Agent Ref.No.',
    className: 'min-w-0 p-2',
  },
  {
    key: 'created_date',
    id: 'created_date',
    name: 'Created Date',
    className: 'min-w-0 p-2',
    cell: (_: any, rowData: any) => <span>{formatDateWithFallback(rowData.created_date)}</span>,
  },
  {
    key: 'expiry_date',
    id: 'expiry_date',
    name: 'Expiry Date',
    className: 'min-w-0 p-2',
    cell: (_: any, rowData: any) => <span>{formatDateWithFallback(rowData.expiry_date)}</span>,
  },
  {
    key: 'applicant_name',
    id: 'applicant_name',
    name: 'Applicant Name',
    className: 'min-w-0 p-2',
  },
  {
    key: 'applicant_pan',
    id: 'applicant_pan',
    name: 'Applicant PAN Number',
    className: 'min-w-0 p-2',
  },
  {
    key: 'transaction_type',
    id: 'transaction_type',
    name: 'Transaction Type',
    className: 'min-w-0 p-2',
  },
  {
    key: 'purpose',
    id: 'purpose',
    name: 'Purpose',
    className: 'min-w-0 p-2',
  },
  {
    key: 'kyc_type',
    id: 'kyc_type',
    name: 'KYC Type',
    className: 'min-w-0 p-2',
  },
  {
    key: 'kyc_status',
    id: 'kyc_status',
    name: 'KYC Status',
    className: 'min-w-0 p-2',
    cell: (_: any, rowData: any) => <KycStatusCell rowData={rowData} />,
  },
  {
    key: 'e_sign_status',
    id: 'e_sign_status',
    name: 'E Sign Status',
    className: 'min-w-0 p-2',
    cell: (_: any, rowData: any) => <EsignStatusCell rowData={rowData} />,
  },
  {
      key: 'e_sign_link',
      id: 'e_sign_link',
      name: 'E Sign Link',
      className: 'min-w-0 p-2',
      cell: (_: any, rowData: any) => {
        const { merged_document, nium_order_id, e_sign_link, e_sign_status, e_sign_link_status, is_esign_required } =
          rowData;

        // No action can be taken if there's no merged document
        if (merged_document === null) {
          return (
            <SignLinkButton
              id={nium_order_id}
              copyLinkUrl=""
              loading={false}
              toastInfoText=""
              disabled={true} // Disable button when no merged document exists
              tooltipText="No document available"
              buttonType="copy_link"
              buttonIconType="copy_link"
            />
          );
        }

        // Check if we need to generate a new link (no existing link or status requires regeneration)
        const needsGeneration =
          e_sign_link_status === 'expired' ||
          e_sign_status === 'rejected' ||
          e_sign_link === null ||
          e_sign_status === 'expired';

        // Button should be disabled if e-sign is completed and no regeneration is needed
        const isDisabled =
          (e_sign_status === 'completed' && !needsGeneration) ||
          (is_esign_required === true && e_sign_link === null && !needsGeneration);

        // Determine if loading state applies to this row
        const isLoading = isSendEsignLinkLoading && loadingOrderId === nium_order_id;

        // Set tooltip text based on whether we need generation or copy
        const tooltipText = needsGeneration ? 'Generate E Sign Link' : 'Copy E Sign Link';

        return (
          <SignLinkButton
            id={nium_order_id}
            copyLinkUrl={rowData.e_sign_link || ''}
            loading={isLoading}
            toastInfoText="E Sign link copied successfully!"
            disabled={isDisabled}
            {...(needsGeneration ? { onClick: () => handleRegenerateEsignLink(rowData) } : {})}
            tooltipText={tooltipText}
            buttonType={needsGeneration ? 'refresh' : 'copy_link'}
            buttonIconType={needsGeneration ? 'refresh' : 'copy_link'}
          />
        );
      },
    },
  {
    key: 'v_kyc_status',
    id: 'v_kyc_status',
    name: 'VKYC Status',
    className: 'min-w-0 p-2',
   cell: (_: any, rowData: any) => <VKycStatusCell rowData={rowData} />,
  },
  {
    key: 'v_kyc_link',
    id: 'v_kyc_link',
    name: 'VKYC Link',
    className: 'min-w-0 p-2',
     cell: (_: unknown, rowData: any) => {
        const { v_kyc_status, e_sign_status, is_v_kyc_required, nium_order_id, v_kyc_link } = rowData;
        const isActionNeeded = v_kyc_status === 'N/A' || v_kyc_status === 'expired';

        const isDisabled =
          !is_v_kyc_required ||
          v_kyc_status === 'completed' ||
          (is_v_kyc_required && v_kyc_link === null && !isActionNeeded);

        // Determine tooltip text
        const tooltipText = isActionNeeded ? 'Generate VKYC Link' : is_v_kyc_required ? 'Copy VKYC Link' : '';

        // Determine if loading state applies to this row
        const isLoading = isSendVkycLinkLoading && loadingOrderId === nium_order_id;

        // Create wrapper function for regenerating link
        const handleGenerateLink = async () => {
          try {
            await handleRegenerateVkycLink(rowData);
            // When link generation is successful, update our local state
            setHasGeneratedLink(true);
          } catch (error) {
            console.error('Error generating VKYC link:', error);
          }
        };

        return (
          <SignLinkButton
            id={nium_order_id}
            copyLinkUrl={rowData.v_kyc_link || ''}
            loading={isLoading}
            toastInfoText="VKYC Link copied successfully!"
            disabled={isDisabled}
            {...(isActionNeeded ? { onClick: handleGenerateLink } : {})}
            tooltipText={tooltipText}
            buttonType={isLoading || hasGeneratedLink ? 'copy_link' : isActionNeeded ? 'refresh' : 'copy_link'}
            buttonIconType={isLoading || hasGeneratedLink ? 'copy_link' : isActionNeeded ? 'refresh' : 'copy_link'}
          />
        );
      },
  },
  {
    key: 'view_action',
    id: 'view_action',
    name: 'View',
    className: 'min-w-0 p-2',
    cell: (_: any, rowData: any) => (
      <TooltipActionButton
        onClick={() =>
          navigate(`/maker/view-transaction?partner-order-id=${rowData.agent_reference_no}&action=view`)
        }
        icon={<Eye size={16} />}
        tooltipText="View"
        variant="view"
      />
    ),
  },
]
}
