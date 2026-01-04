import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import TooltipImageButton from '@/components/common/tooltip-image-button';
import Reupload from '@/assets/icons/re-upload.svg';
import upload from '@/assets/icons/upload.svg';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import { PaymentData } from '../../../types/payment.types';

export const KycTableColumnsConfig = ({
  navigate,
  onUploadClick,
  handleViewTransaction,
}: {
  navigate: (url: string) => void;
  onUploadClick: (status: string, transaction: any) => void;
  handleViewTransaction: (rowData: any) => void;
}) => {
  return [
    {
      accessorKey: 'ref_no',
      id: 'ref_no',
      header: 'Company Ref.No',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'agent_ref_no',
      id: 'agent_ref_no',
      header: 'Agent Ref.No.',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'order_date',
      id: 'order_date',
      header: 'Order Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: PaymentData }) => <span>{formatDateWithFallback(props.row.order_date)}</span>,
    },
    {
      accessorKey: 'expiry_date',
      id: 'expiry_date',
      header: 'Expiry Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: PaymentData }) => <span>{formatDateWithFallback(props.row.expiry_date)}</span>,
    },
    {
      accessorKey: 'applicant_name',
      id: 'applicant_name',
      header: 'Applicant Name',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'applicant_pan',
      id: 'applicant_pan',
      header: 'Applicant PAN Number',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'transaction_type',
      id: 'transaction_type',
      header: 'Transaction Type',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'purpose',
      id: 'purpose',
      header: 'Purpose',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'kyc_doc',
      id: 'kyc_doc',
      header: 'KYC Doc',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: PaymentData; value: any }) => {
        const isCompleted = props.row.kyc_status === 'COMPLETED';
        return (
          <TooltipImageButton
            onClick={() => onUploadClick(props.row.kyc_status, props.row.raw_data?.transaction)}
            src={isCompleted ? Reupload : upload}
            alt="Upload"
            tooltipText={isCompleted ? 'Reupload' : 'Upload'}
          />
        );
      },
    },
    {
      accessorKey: 'kyc_status',
      id: 'kyc_status',
      header: 'KYC Status',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: PaymentData; value: any }) => {
        return <KycStatusCell rowData={props.row} />;
      },
    },

    {
      accessorKey: 'view_action',
      id: 'view_action',
      header: 'View',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.id}
          onClick={() => handleViewTransaction(row)}
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
        />
      ),
    },
  ];
};
