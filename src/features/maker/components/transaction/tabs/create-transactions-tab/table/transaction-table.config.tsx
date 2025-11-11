import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';

export interface TransactionData {
  company_ref_no: string;
  agent_ref_no: string;
  order_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan_number: string;
  transaction_type: string;
  purpose: string;
  fx_currency: string;
  fx_amount: number;
  settlement_rate: number;
  customer_rate: number;
  transaction_amount: number;
  deal_status: string;
}

export const GetTransactionTableColumns = ({
  handleEdit,
}: {
  handleEdit: (transaction: TransactionData) => void;
}): TableColumn<TransactionData>[] => {
  return [
    {
      id: 'company_ref_no',
      header: 'Company Ref No',
      accessorKey: 'company_ref_no',
      sortable: true,
      filterable: true,
    },
    {
      id: 'agent_ref_no',
      header: 'Agent Ref No',
      accessorKey: 'agent_ref_no',
      sortable: true,
      filterable: true,
    },
    {
      id: 'order_date',
      header: 'Order Date',
      accessorKey: 'order_date',
      sortable: true,
      filterable: true,
    },
    {
      id: 'expiry_date',
      header: 'Expiry Date',
      accessorKey: 'expiry_date',
      sortable: true,
      filterable: true,
    },
    {
      id: 'applicant_name',
      header: 'Applicant Name',
      accessorKey: 'applicant_name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'applicant_pan_number',
      header: 'Applicant PAN Number',
      accessorKey: 'applicant_pan_number',
      sortable: true,
      filterable: true,
    },
    {
      id: 'transaction_type',
      header: 'Transaction Type',
      accessorKey: 'transaction_type',
      sortable: true,
      filterable: true,
    },
    {
      id: 'purpose',
      header: 'Purpose',
      accessorKey: 'purpose',
      sortable: true,
      filterable: true,
    },
    {
      id: 'fx_currency',
      header: 'FX Currency',
      accessorKey: 'fx_currency',
      sortable: true,
      filterable: true,
    },
    {
      id: 'fx_amount',
      header: 'FX Amount',
      accessorKey: 'fx_amount',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: number }) => value.toFixed(2),
    },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: number }) => value.toFixed(4),
    },
    {
      id: 'customer_rate',
      header: 'Customer Rate',
      accessorKey: 'customer_rate',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: number }) => value.toFixed(4),
    },
    {
      id: 'transaction_amount',
      header: 'Transaction Amount',
      accessorKey: 'transaction_amount',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: number }) => value.toFixed(2),
    },
    {
      id: 'deal_status',
      header: 'Deal Status',
      accessorKey: 'deal_status',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: string }) => <StatusBadge status={value} />,
    },
    {
      id: 'action',
      header: 'Action',
      // cell: (props: { row: TransactionData; value: any }) => <ActionButtons row={{ original: props.row }} onEdit={handleEdit} />,
      sortable: false,
      filterable: false,
    },
  ];
};

export default GetTransactionTableColumns;