import { useState } from 'react';
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import VKycStatusCell from '@/components/cell/table/VKycStatusCell';
import EsignStatusCell from '@/components/cell/table/EsignStatusCell';
import PaymentStatusCell from '@/components/cell/table/PaymentStatusCell';

export const ViewAllTransactionTableColumns = ({
  handleRegenerateEsignLink,
  handleRegenerateVkycLink,
  isSendEsignLinkLoading = false,
  isSendVkycLinkLoading = false,
  loadingOrderId = null,
}: {
  handleRegenerateEsignLink: (rowData: any) => void;
  handleRegenerateVkycLink: (rowData: any) => void;
  isSendEsignLinkLoading?: boolean;
  isSendVkycLinkLoading?: boolean;
  loadingOrderId?: string | null;
}) => { const [hasGeneratedLink, setHasGeneratedLink] = useState(false); return [
  {
    id: 'company_reference_no',
    header: 'Company Reference No',
    accessorKey: 'company_reference_no',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'agent_reference_no',
    header: 'Agent Reference No',
    accessorKey: 'agent_reference_no',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'created_date',
    header: 'Created Date',
    accessorKey: 'created_date',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => <span>{formatDateWithFallback(row.created_date)}</span>,
  },
  {
    id: 'expiry_date',
    header: 'Expiry Date',
    accessorKey: 'expiry_date',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'applicant_name',
    header: 'Applicant Name',
    accessorKey: 'applicant_name',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'transaction_type',
    header: 'Transaction Type',
    accessorKey: 'transaction_type',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'purpose',
    header: 'Purpose',
    accessorKey: 'purpose',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'fx_currency',
    header: 'FX Currency',
    accessorKey: 'fx_currency',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'fx_amount',
    header: 'FX Amount',
    accessorKey: 'fx_amount',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'fx_rate',
    header: 'FX Rate',
    accessorKey: 'fx_rate',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'settlement_rate',
    header: 'Settlement Rate',
    accessorKey: 'settlement_rate',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'customer_rate',
    header: 'Customer Rate',
    accessorKey: 'customer_rate',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'payment_status',
    header: 'Payment Status',
    accessorKey: 'payment_status',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => <PaymentStatusCell rowData={row} />
  },
  {
    id: 'payment_link',
    header: 'Payment Link',
    accessorKey: 'payment_link',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => {
      const { company_reference_no, payment_link } = row;
      return (
        <SignLinkButton
          id={company_reference_no}
          copyLinkUrl={payment_link || ''}
          toastInfoText="Payment link copied successfully!"
          tooltipText="Copy payment link"
          buttonType="copy_link"
          buttonIconType="copy_link"
        />
      );
    },
  },
  {
    id: 'e_sign_status',
    header: 'E Sign Status',
    accessorKey: 'e_sign_status',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => <EsignStatusCell rowData={row} />,
  },
  {
    id: 'e_sign_link',
    header: 'E Sign Link',
    accessorKey: 'e_sign_link',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => {
      const { merged_document, nium_order_id, e_sign_link, e_sign_status, e_sign_link_status, is_esign_required } =
        row;

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
          copyLinkUrl={row.e_sign_link || ''}
          loading={isLoading}
          toastInfoText="E Sign link copied successfully!"
          disabled={isDisabled}
          {...(needsGeneration ? { onClick: () => handleRegenerateEsignLink(row) } : {})}
          tooltipText={tooltipText}
          buttonType={needsGeneration ? 'refresh' : 'copy_link'}
          buttonIconType={needsGeneration ? 'refresh' : 'copy_link'}
        />
      );
    },
  },
  {
    id: 'kyc_type',
    header: 'KYC Type',
    accessorKey: 'kyc_type',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'kyc_upload_status',
    header: 'KYC Upload Status',
    accessorKey: 'kyc_upload_status',
    meta: { className: 'min-w-0 p-2' },
  },
  {
    id: 'v_kyc_status',
    header: 'VKYC Status',
    accessorKey: 'v_kyc_status',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => <VKycStatusCell rowData={row} />,
  },
  {
    id: 'v_kyc_link',
    header: 'VKYC Link',
    accessorKey: 'v_kyc_link',
    meta: { className: 'min-w-0 max-w-[80px]' },
    cell: ({ row }: { row: any }) => {
      const { v_kyc_status, e_sign_status, is_v_kyc_required, nium_order_id, v_kyc_link } = row;
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
          await handleRegenerateVkycLink(row);
          // When link generation is successful, update our local state
          setHasGeneratedLink(true);
        } catch (error) {
          console.error('Error generating VKYC link:', error);
        }
      };

      return (
        <SignLinkButton
          id={nium_order_id}
          copyLinkUrl={row.v_kyc_link || ''}
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
    id: 'completion_date',
    header: 'Completion Date',
    accessorKey: 'completion_date',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => <span>{formatDateWithFallback(row.completion_date)}</span>,
  },
  {
    id: 'swift_copy',
    header: 'Swift Copy',
    accessorKey: 'swift_copy',
    meta: { className: 'min-w-0 p-2' },
    cell: ({ row }: { row: any }) => (
      <SignLinkButton
        id={row.company_reference_no}
        onClick={() => {}}
        tooltipText="Download Swift Copy"
        buttonType="download"
        buttonIconType="download"
        iconClassName="text-primary group-hover:text-white group-disabled:text-gray-400"
        className="group"
      />
    ),
  }
]
}
