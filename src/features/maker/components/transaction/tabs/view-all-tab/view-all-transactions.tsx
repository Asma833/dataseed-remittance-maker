import { GetViewAllTransactionTableColumns } from './view-transaction-column';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';

const dummyTransactionData = [
  {
    ref_no: 'NIUM-0001',
    agent_ref_no: 'AGENT-1001',
    created_date: '2024-06-10T10:30:00Z',
    expiry_date: '2024-07-10T10:30:00Z',
    applicant_name: 'John Doe',
    applicant_pan: 'ABCDE1234F',
    transaction_type: 'Remittance',
    purpose: 'Family Support',
    fx_currency: 'USD',
    fx_amount: '1000',
    fx_rate: '74.25',
    settlement_rate: '74.10',
    customer_rate: '74.50',
    payment_status: 'pending',
    payment_link: 'https://payment.example.com/NIUM-0001',
    payment_screenshot: null,
    e_sign_status: 'completed',
    e_sign_link: 'https://esign.example.com/NIUM-0001',
    kyc_type: 'VKYC',
    kyc_status: 'completed',
    kyc_upload_status: 'Uploaded',
    v_kyc_status: 'completed',
    v_kyc_link: 'https://vkyc.example.com/NIUM-0001',
    completion_date: '2024-06-15T12:00:00Z',
    swift_copy: 'https://files.example.com/swift/NIUM-0001.pdf',
    is_esign_required: true,
    is_v_kyc_required: true,
  },
];

const ViewAllTransactions = () => {
  const { data, isLoading, error } = useGetData({
    endpoint: API.TRANSACTION.GET_ALL_REMIT_TRANSACTIONS,
    queryKey: ['get-all-transaction'],
    dataPath: 'data',
    enabled: true,
  });

  // Table columns
  const tableColumns = GetViewAllTransactionTableColumns();

  // Table config
  const tableConfig = {
    ...staticConfig,
    loading: isLoading,
    export: { enabled: true, fileName: 'view-all-transactions.csv' },
    filters: {
      ...staticConfig.filters!,
      dateRangeFilter: {
        enabled: true,
        columnId: 'order_date',
        useMuiDateRangePicker: true,
      },
    },
  };

  // Table actions
  const tableActions = {};

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={tableColumns}
        data={dummyTransactionData ?? data ?? []}
        config={tableConfig}
        actions={tableActions}
      />
    </div>
  );
};

export default ViewAllTransactions;
