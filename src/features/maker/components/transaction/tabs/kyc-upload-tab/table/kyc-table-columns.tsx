import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { Eye } from 'lucide-react';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import TooltipActionButton from '@/components/common/tooltip-action-button';
import TooltipImageButton from '@/components/common/tooltip-image-button';
import Reupload from '@/assets/icons/re-upload.svg';
import upload from '@/assets/icons/upload.svg';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import { AllTransaction } from '../../../types/payment.types';
import { Order } from '@/components/cell/types/updateIncident.types';

type KycTableRow = {
  company_reference_no: string;
  agent_reference_no: string;
  order_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  deal: AllTransaction;
};

export const KycTableColumnsConfig = ({
  navigate,
  onUploadClick,
  handleViewTransaction
}: {
  navigate: (url: string) => void;
  onUploadClick: (isReupload: boolean) => void;
  handleViewTransaction: (rowData: any) => void;
}) => {
  return [
    {
      accessorKey: 'company_reference_no',
      id: 'company_reference_no',
      header: 'Company Ref.No',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'agent_reference_no',
      id: 'agent_reference_no',
      header: 'Agent Ref.No.',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'order_date',
      id: 'order_date',
      header: 'Order Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: any; value: any }) => <span>{formatDateWithFallback(props.row.order_date)}</span>,
    },
    {
      accessorKey: 'expiry_date',
      id: 'expiry_date',
      header: 'Expiry Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: any; value: any }) => <span>{formatDateWithFallback(props.row.expiry_date)}</span>,
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
      cell: (props: { row: any; value: any }) => {
        const isCompleted = props.row.kyc_status === 'completed';
        return (
          <TooltipImageButton
            onClick={() => onUploadClick(isCompleted)}
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
      cell: (props: { row: any; value: any }) => <KycStatusCell rowData={{ kyc_status: props.row.kyc_status } as Order} />,
    },

    {
      accessorKey: 'view_action',
      id: 'view_action',
      header: 'View',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: KycTableRow }) => (
        <SignLinkButton
          id={row.deal.id}
          onClick={() => handleViewTransaction(row.deal)}
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
        />
      ),
    },
  ];
};
