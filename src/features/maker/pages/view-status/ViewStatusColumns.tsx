import { SignLinkButton } from '@/components/common/SignLinkButton';
import ViewButton from '@/components/common/ViewButton';
import EsignStatusCell from '@/features/checker/components/table/EsignStatusCell';
import { Eye, FileText, ExternalLink } from 'lucide-react'; // Import the necessary Lucide icons

export const ViewStatusColumns = ({}) => [
  {
    key: 'nium_order_id',
    id: 'nium_order_id',
    name: 'Transaction No',
    className: 'min-w-0 p-2'
  },
  {
    key: 'created_at',
    id: 'created_at',
    name: 'Created Date',
    className: 'min-w-0 p-2',
    format: (value: string) => new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },
  {
    key: 'expiry_date',
    id: 'expiry_date',
    name: 'Expiry Date',
    className: 'min-w-0 p-2',
    format: (value: string) => new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  },
  {
    key: 'applicant_name',
    id: 'applicant_name',
    name: 'Applicant Name',
    className: 'min-w-0 p-2'
  },
  {
    key: 'applicant_pan_no',
    id: 'applicant_pan_no',
    name: 'Applicant PAN No',
    className: 'min-w-0 p-2'
  },
  {
    key: 'transaction_type_name.name',
    id: 'transaction_type_name.name',
    name: 'Transaction Type',
    className: 'min-w-0 p-2'
  },
  {
    key: 'purpose_type_name.purpose_name',
    id: 'purpose_type_name.purpose_name',
    name: 'Purpose',
    className: 'min-w-0 p-2'
  },
  {
    key: 'transaction_status',
    id: 'transaction_status',
    name: 'Transaction Status',
    className: 'min-w-0 p-2',
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Completed' ? 'bg-green-100 text-green-800' : 
        value === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'e_sign_status',
    id: 'e_sign_status',
    name: 'E Sign Status',
    className: 'min-w-0 p-2',
    cell: (_: unknown, value: any) => (
      console.log(value),
      <EsignStatusCell rowData={value} />
    )
  },
  {
     key: 'e_sign_link',
     id: 'e_sign_link',
     name: 'E Sign Link',
     className: 'min-w-0 max-w-[80px]',
     cell: (_: unknown, rowData: any) => (
       <SignLinkButton
         copyLinkUrl={rowData.e_sign_link}
         toastInfoText={'E Sign link copied successfully!'}
         disabled={!rowData.e_sign_link || rowData.e_sign_status === 'not generated'}
         tooltipText={'Copy E sign Link'}
         buttonType="copy_link"
         buttonIconType="copy_link"
       />
     ),
   },
  
  {
    key: 'view_action',
    id: 'view_action',
    name: 'View',
    className: 'min-w-0 p-2',
    cell: (_: unknown, rowData: any) => ( // Change render to cell to match your pattern
      <ViewButton
        onClick={() => {
          
        }}
        tooltipText={`View`}
        orderId={rowData.nium_order_id}
        disabled={false}
        buttonType="view_details"
        buttonIconType="view"
      />
    )
  }
];