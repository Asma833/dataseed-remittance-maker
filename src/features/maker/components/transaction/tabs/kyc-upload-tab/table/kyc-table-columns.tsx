import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { Eye } from 'lucide-react';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import TooltipActionButton from '@/components/common/tooltip-action-button';
import TooltipImageButton from '@/components/common/tooltip-image-button';
import Reupload from '@/assets/icons/re-upload.svg'
import upload from '@/assets/icons/upload.svg'

export const KycTableColumnsConfig = ({
  navigate,
  onUploadClick,
}: {
  navigate: (url: string) => void;
  onUploadClick: () => void;
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
          onClick={onUploadClick}
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
    cell: (props: { row: any; value: any }) => <KycStatusCell rowData={props.row} />,
  },
 
  {
    accessorKey: 'view_action',
    id: 'view_action',
    header: 'View',
    meta: { className: 'min-w-0 p-2' },
    cell: (props: { row: any; value: any }) => (
      <TooltipActionButton
        onClick={() =>
          navigate(`/maker/view-transaction?partner-order-id=${props.row.agent_reference_no}&action=view`)
        }
        icon={<Eye size={16} />}
        tooltipText="View"
        variant="view"
      />
    ),
  },
]
}
