import { ActionButtons, StatusBadge, TableColumn } from '../../../../../../../components/table';
import { TransactionData } from '../../../types/transaction.types';


export const GetTransactionTableColumns = ({
  handleCreate,
  handleDownload,
  handleCustomerFillUpLink,
}: {
  handleCreate?: (transaction: TransactionData) => void;
  handleDownload?: (transaction: TransactionData) => void;
  handleCustomerFillUpLink?: (transaction: TransactionData) => void;
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
    },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      sortable: true,
      filterable: true
    },
    {
      id: 'customer_rate',
      header: 'Customer Rate',
      accessorKey: 'customer_rate',
      sortable: true,
      filterable: true
    },
    {
      id: 'transaction_amount',
      header: 'Transaction Amount',
      accessorKey: 'transaction_amount',
      sortable: true,
      filterable: true,
    },
    {
      id: 'deal_status',
      header: 'Deal Status',
      accessorKey: 'deal_status',
      sortable: true,
      filterable: true,
      cell: ({ value }: { value: string }) => <StatusBadge status={value || ''} />,
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row, value }: { row: TransactionData; value: any; }) => (
        <ActionButtons
          row={row}
          {...(handleCreate && { onAdd: handleCreate })}
          {...(handleDownload && { onDownload: handleDownload })}
          {...(handleCustomerFillUpLink && { onCustomer: handleCustomerFillUpLink })}
        />
      ),
      sortable: false,
      filterable: false,
    },
  ];
};

export default GetTransactionTableColumns;