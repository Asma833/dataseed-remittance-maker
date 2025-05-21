import { formatDate } from '@/utils/dateFormat';

export const GetTransactionTableColumns = () => [
  {
    key: 'nium_order_id',
    id: 'nium_order_id',
    name: 'Nium ID',
    cell: (value: string) => <span className="text-pink-600">{value}</span>,
    className: 'min-w-0',
  },
  {
    key: 'created_at',
    id: 'created_at',
    name: 'Order Date',
    className: 'min-w-0',
    cell: (_: unknown, rowData: { created_at?: string }) => (
      <span>{rowData.created_at ? formatDate(rowData.created_at) : null}</span>
    ),
  },
  {
    key: 'customer_pan',
    id: 'customer_pan',
    name: 'Customer PAN',
    className: 'min-w-0',
  },
  {
    key: 'transaction_type_name',
    id: 'transaction_type_name',
    name: 'Transaction Type',
    className: 'min-w-0',
    cell: (_: unknown, rowData: any) => (
      <span>{rowData?.transaction_type_name?.name || '-'}</span>
    ),
  },
  {
    key: 'purpose_type_name',
    id: 'purpose_type_name',
    name: 'Purpose Type',
    className: 'min-w-0',
    cell: (_: unknown, rowData: any) => (
      <span>{rowData?.purpose_type_name?.purpose_name || '-'}</span>
    ),
  },
  {
    key: 'e_sign_status',
    id: 'e_sign_status',
    name: 'E-Sign Status',
    className: 'min-w-0',
    cell: (_: unknown, rowData: { e_sign_status?: string }) => (
      <span>
        {rowData.e_sign_status && (
          <span
            className={`status-badge vkyc-${rowData.e_sign_status.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {rowData.e_sign_status}
          </span>
        )}
      </span>
    ),
  },
  {
    key: 'esign_status_completion_date',
    id: 'esign_status_completion_date',
    name: 'E-Sign Status Completion Date',
    className: 'min-w-0',
  },
  {
    key: 'v_kyc_status',
    id: 'v_kyc_status',
    name: 'VKYC Status',
    className: 'min-w-0',
    cell: (_: unknown, rowData: { v_kyc_status?: string }) => (
      <span>
        {rowData.v_kyc_status && (
          <span
            className={`status-badge vkyc-${rowData.v_kyc_status.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {rowData.v_kyc_status}
          </span>
        )}
      </span>
    ),
  },
  {
    key: 'v_kyc_customer_completion_date',
    id: 'v_kyc_customer_completion_date',
    name: 'VKYC Completion Date',
    className: 'min-w-0',
  },
  {
    key: 'incident_status',
    id: 'incident_status',
    name: 'Incident Status',
    className: 'min-w-0',
    cell: (_: unknown, rowData: { incident_status?: boolean | null }) => (
      <span>
        {rowData.incident_status === null ||
        rowData.incident_status === undefined ? (
          <span className="status-badge pending">Pending</span>
        ) : rowData.incident_status ? (
          <span className="status-badge approved">Approved</span>
        ) : (
          <span className="status-badge rejected">Rejected</span>
        )}
      </span>
    ),
  },
  {
    key: 'incident_completion_date',
    id: 'incident_completion_date',
    name: 'Incident Completion Date',
    className: 'min-w-0',
  },
];
