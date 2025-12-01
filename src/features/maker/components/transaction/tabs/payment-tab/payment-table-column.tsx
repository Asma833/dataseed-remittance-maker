import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import  KycStatusCell  from '@/components/cell/table/KycStatusCell';
import EsignStatusCell from '@/components/cell/table/EsignStatusCell';
import VKycStatusCell from '@/components/cell/table/VKycStatusCell';
import PaymentStatusCell from '@/components/cell/table/PaymentStatusCell';
// import TooltipActionButton from '@/components/common/tooltip-action-button';

interface PaymentData {
  nium_ref_no: string;
  nium_order_id?: string;
  agent_ref_no: string;
  created_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  e_sign_status: string;
  e_sign_link: string | null;
  e_sign_link_status?: string;
  v_kyc_status: string;
  v_kyc_link: string | null;
  payment_status: string;
  payment_link: string | null;
  payment_screenshot: string | null;
  is_esign_required: boolean;
  is_v_kyc_required: boolean;
  merged_document?: any;
}

export const PaymentTableColumn = ({
  handleRegenerateEsignLink,
  handleRegenerateVkycLink,
  isSendEsignLinkLoading = false,
  isSendVkycLinkLoading = false,
  loadingOrderId = null,
  navigate,
  handlePayment,
}: {
  handleRegenerateEsignLink: (rowData: any) => void;
  handleRegenerateVkycLink: (rowData: any) => void;
  handlePayment: (rowData: any) => void;
  isSendEsignLinkLoading?: boolean;
  isSendVkycLinkLoading?: boolean;
  loadingOrderId?: string | null;
  navigate: (path: string) => void;
}) => {
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);
  return [
    { id: 'nium_ref_no', header: 'Nium Ref No', accessorKey: 'nium_ref_no', meta: { className: 'min-w-0 p-2' } },
    { id: 'agent_ref_no', header: 'Agent Ref No', accessorKey: 'agent_ref_no', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'created_date',
      header: 'Created Date',
      accessorKey: 'created_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <span>{formatDateWithFallback(row.created_date)}</span>,
    },
    { id: 'expiry_date', header: 'Expiry Date', accessorKey: 'expiry_date', meta: { className: 'min-w-0 p-2' } },
    { id: 'applicant_name', header: 'Applicant Name', accessorKey: 'applicant_name', meta: { className: 'min-w-0 p-2' } },
    { id: 'applicant_pan', header: 'Applicant PAN Number', accessorKey: 'applicant_pan', meta: { className: 'min-w-0 p-2' } },
    { id: 'transaction_type', header: 'Transaction Type', accessorKey: 'transaction_type', meta: { className: 'min-w-0 p-2' } },
    { id: 'purpose', header: 'Purpose', accessorKey: 'purpose', meta: { className: 'min-w-0 p-2' } },
    { id: 'kyc_type', header: 'KYC Type', accessorKey: 'kyc_type', meta: { className: 'min-w-0 p-2' } },
    { id: 'kyc_status', header: 'KYC Status', accessorKey: 'kyc_status', meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <KycStatusCell rowData={row} />,
     },
    {
      id: 'e_sign_status',
      header: 'Esign Status',
      accessorKey: 'e_sign_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <EsignStatusCell rowData={row} />,
    },
    {
      id: 'e_sign_link',
      header: 'E Sign Link',
      accessorKey: 'e_sign_link',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => {
        const { merged_document, nium_order_id, nium_ref_no, e_sign_link, e_sign_status, e_sign_link_status, is_esign_required } =
          row;

        const id = (nium_order_id || nium_ref_no) as string;

        // No action can be taken if there's no merged document
        if (merged_document === null) {
          return (
            <SignLinkButton
              id={id}
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
        const isLoading = isSendEsignLinkLoading && loadingOrderId === id;

        // Set tooltip text based on whether we need generation or copy
        const tooltipText = needsGeneration ? 'Generate E Sign Link' : 'Copy E Sign Link';

        return (
          <SignLinkButton
            id={id}
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
      id: 'v_kyc_status',
      header: 'VKYC Status',
      accessorKey: 'v_kyc_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <VKycStatusCell rowData={row} />,
    },
    {
      id: 'v_kyc_link',
      header: 'VKYC Link',
      accessorKey: 'v_kyc_link',
      meta: { className: 'min-w-0 max-w-[80px]' },
      cell: ({ row }: { row: PaymentData }) => {
        const { v_kyc_status, e_sign_status, is_v_kyc_required, nium_order_id, nium_ref_no, v_kyc_link } = row;
        const id = (nium_order_id || nium_ref_no) as string;
        const isActionNeeded = v_kyc_status === 'N/A' || v_kyc_status === 'expired';

        const isDisabled =
          !is_v_kyc_required ||
          v_kyc_status === 'completed' ||
          (is_v_kyc_required && v_kyc_link === null && !isActionNeeded);

        // Determine tooltip text
        const tooltipText = isActionNeeded ? 'Generate VKYC Link' : is_v_kyc_required ? 'Copy VKYC Link' : '';

        // Determine if loading state applies to this row
        const isLoading = isSendVkycLinkLoading && loadingOrderId === id;

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
            id={id}
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
    { id: 'payment_status',
      header: 'Payment Status',
      accessorKey: 'payment_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <PaymentStatusCell rowData={row} />,
     },
    {
      id: 'payment_link',
      header: 'Payment Link',
      accessorKey: 'payment_link',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => {
        const { nium_ref_no, payment_link } = row;
        return (
          <SignLinkButton
            id={nium_ref_no}
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
      id: 'payment_screenshot',
      header: 'Payment Screenshot',
      accessorKey: 'payment_screenshot',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.nium_ref_no}
          onClick={() => handlePayment(row)}
          tooltipText="Upload Payment Screenshot"
          buttonType="upload"
          buttonIconType="upload"
          disabled={row.payment_screenshot !== null}
          className="group"
          iconClassName="text-primary group-hover:text-white group-disabled:text-gray-400"
        />
      ),
    },
    {
      id: 'view_action',
      header: 'View',
      accessorKey: 'view_action',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.nium_ref_no}
          onClick={() => navigate(``)}
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
        />
      ),
    },
  ];
};
