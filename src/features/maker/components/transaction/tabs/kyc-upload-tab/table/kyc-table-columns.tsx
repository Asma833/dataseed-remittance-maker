import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import TooltipImageButton from '@/components/common/tooltip-image-button';
import Reupload from '@/assets/icons/re-upload.svg';
import upload from '@/assets/icons/upload.svg';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import { DealsResponse, DealsResponseTransaction } from '../../../types/transaction.types';
import { TransactionStatusEnum } from '@/types/enums';

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
      accessorKey: 'company_reference_no',
      id: 'company_reference_no',
      header: 'Company Ref.No',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => (
        <span>
          {props.row.transactions?.[0]?.company_ref_number ? props.row.transactions?.[0]?.company_ref_number : '-'}
        </span>
      ),
    },
    {
      accessorKey: 'agent_reference_no',
      id: 'agent_reference_no',
      header: 'Agent Ref.No.',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => (
        <span>
          {props.row.transactions?.[0]?.agent_ref_number ? props.row.transactions?.[0]?.agent_ref_number : '-'}
        </span>
      ),
    },
    {
      accessorKey: 'order_date',
      id: 'order_date',
      header: 'Order Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => (
        <span>{formatDateWithFallback(props.row.transactions?.[0]?.order_date)}</span>
      ),
    },
    {
      accessorKey: 'expiry_date',
      id: 'expiry_date',
      header: 'Expiry Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => (
        <span>{formatDateWithFallback(props.row.transactions?.[0]?.order_expiry)}</span>
      ),
    },
    {
      accessorKey: 'applicant_name',
      id: 'applicant_name',
      header: 'Applicant Name',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => <span>{props.row.transactions?.[0]?.kyc_details?.applicant_name}</span>,
    },
    {
      accessorKey: 'applicant_pan',
      id: 'applicant_pan',
      header: 'Applicant PAN Number',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse }) => <span>{props.row.transactions?.[0]?.kyc_details?.applicant_pan}</span>,
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
      cell: (props: { row: DealsResponse }) => <span>{props.row.transactions?.[0]?.purpose}</span>,
    },
    {
      accessorKey: 'kyc_doc',
      id: 'kyc_doc',
      header: 'KYC Doc',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse; value: any }) => {
        const isRejected = props.row.transactions?.[0]?.transaction_status === TransactionStatusEnum.REJECTED;
        const transaction = props.row.transactions?.[0];
        return (
          <TooltipImageButton
            onClick={() => onUploadClick(props.row.transactions?.[0]?.transaction_status, transaction)}
            src={isRejected ? Reupload : upload}
            alt="Upload"
            tooltipText={isRejected ? 'Reupload' : 'Upload'}
          />
        );
      },
    },
    {
      accessorKey: 'kyc_status',
      id: 'kyc_status',
      header: 'KYC Status',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: DealsResponse; value: any }) => {
        if (!props.row.transactions || props.row.transactions.length === 0) {
          return <span>N/A</span>;
        }
        return <KycStatusCell rowData={props.row.transactions?.[0]} />;
      },
    },

    {
      accessorKey: 'view_action',
      id: 'view_action',
      header: 'View',
      meta: { className: 'min-w-0 p-2' },
      cell: (row: any) => (
        <SignLinkButton
          id={row?.transactions?.[0]?.id}
          onClick={() => handleViewTransaction(row)}
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
        />
      ),
    },
  ];
};
