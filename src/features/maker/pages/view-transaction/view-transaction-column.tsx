import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/common/SignLinkButton';
import TooltipActionButton from '@/components/common/TooltipActionButton';
import { Eye } from 'lucide-react';
import VKycStatusCell from '@/features/checker/components/table/VKycStatusCell';
import EsignStatusCell from '@/features/checker/components/table/EsignStatusCell';

export const ViewAllTransactionTableColumns = ({
  handleDelete,
  handleRegenerateEsignLink,
  handleRegenerateVkycLink,
  isSendEsignLinkLoading = false,
  isSendVkycLinkLoading = false,
  loadingOrderId = null,
  navigate
}: {
  handleDelete: (rowData: any) => void;
  handleRegenerateEsignLink: (rowData: any) => void;
  handleRegenerateVkycLink: (rowData: any) => void;
  isSendEsignLinkLoading?: boolean;
  isSendVkycLinkLoading?: boolean;
  loadingOrderId?: string | null;
  navigate: (path: string) => void;
}) => [
  {
    key: 'nium_reference_no',
    id: 'nium_reference_no',
    name: 'NIUM Reference No',
    className: 'min-w-0 p-2',
  },
  {
    key: 'agent_reference_no',
    id: 'agent_reference_no',
    name: 'Agent Reference No',
    className: 'min-w-0 p-2',
  },
  {
    key: 'created_date',
    id: 'created_date',
    name: 'Created Date',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => <span>{formatDateWithFallback(rowData.created_date)}</span>,
  },
  {
    key: 'expiry_date',
    id: 'expiry_date',
    name: 'Expiry Date',
    className: 'min-w-0 p-2',
  },
  {
    key: 'applicant_name',
    id: 'applicant_name',
    name: 'Applicant Name',
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
    key: 'fx_currency',
    id: 'fx_currency',
    name: 'FX Currency',
    className: 'min-w-0 p-2',
  },
  {
    key: 'fx_amount',
    id: 'fx_amount',
    name: 'FX Amount',
    className: 'min-w-0 p-2',
  },
  {
    key: 'fx_rate',
    id: 'fx_rate',
    name: 'FX Rate',
    className: 'min-w-0 p-2',
  },
  {
    key: 'settlement_rate',
    id: 'settlement_rate',
    name: 'Settlement Rate',
    className: 'min-w-0 p-2',
  },
  {
    key: 'customer_rate',
    id: 'customer_rate',
    name: 'Customer Rate',
    className: 'min-w-0 p-2',
  },
  {
    key: 'payment_status',
    id: 'payment_status',
    name: 'Payment Status',
    className: 'min-w-0 p-2',
  },
  {
    key: 'payment_link',
    id: 'payment_link',
    name: 'Payment Link',
    className: 'min-w-0 p-2',
  },
  {
    key: 'e_sign_status',
    id: 'e_sign_status',
    name: 'E Sign Status',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => <EsignStatusCell rowData={rowData} />,
  },
  {
    key: 'e_sign_link',
    id: 'e_sign_link',
    name: 'E Sign Link',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => {
      const { nium_reference_no, e_sign_link } = rowData;
      const isLoading = isSendEsignLinkLoading && loadingOrderId === nium_reference_no;

      return (
        <SignLinkButton
          id={nium_reference_no}
          copyLinkUrl={e_sign_link || ''}
          loading={isLoading}
          toastInfoText="E Sign link copied successfully!"
          onClick={() => handleRegenerateEsignLink(rowData)}
          tooltipText="Copy / Generate E Sign Link"
          buttonType="copy_link"
          buttonIconType="copy_link"
        />
      );
    },
  },
  {
    key: 'kyc_type',
    id: 'kyc_type',
    name: 'KYC Type',
    className: 'min-w-0 p-2',
  },
  {
    key: 'kyc_upload_status',
    id: 'kyc_upload_status',
    name: 'KYC Upload Status',
    className: 'min-w-0 p-2',
  },
  {
    key: 'v_kyc_status',
    id: 'v_kyc_status',
    name: 'VKYC Status',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => <VKycStatusCell rowData={rowData} />,
  },
  {
    key: 'v_kyc_link',
    id: 'v_kyc_link',
    name: 'VKYC Link',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => {
      const { nium_reference_no, v_kyc_link } = rowData;
      const isLoading = isSendVkycLinkLoading && loadingOrderId === nium_reference_no;

      return (
        <SignLinkButton
          id={nium_reference_no}
          copyLinkUrl={v_kyc_link || ''}
          loading={isLoading}
          toastInfoText="VKYC link copied successfully!"
          onClick={() => handleRegenerateVkycLink(rowData)}
          tooltipText="Copy / Generate VKYC Link"
          buttonType="copy_link"
          buttonIconType="copy_link"
        />
      );
    },
  },
  {
    key: 'completion_date',
    id: 'completion_date',
    name: 'Completion Date',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => <span>{formatDateWithFallback(rowData.completion_date)}</span>,
  },
  {
    key: 'swift_copy',
    id: 'swift_copy',
    name: 'Swift Copy',
    className: 'min-w-0 p-2',
  },
  {
    key: 'action',
    id: 'action',
    name: 'Action',
    className: 'min-w-0 p-2',
    //cell: (_: unknown, rowData: any) => (
    //   <TooltipActionButton
    //     onClick={() =>
    //       navigate(`/maker/view-transaction?partner-order-id=${rowData.agent_reference_no}&action=view`)
    //     }
    //     icon={<Eye size={16} />}
    //     tooltipText="View"
    //     variant="view"
    //   />
    //),
  },
];
