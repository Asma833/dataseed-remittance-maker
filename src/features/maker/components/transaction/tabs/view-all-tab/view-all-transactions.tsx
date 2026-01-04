import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetViewAllTransactionTableColumns } from './view-transaction-column';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';

interface ViewAllTransactionData extends PaymentData {
  order_date: string;
  fx_rate: string;
  kyc_upload_status: string;
  completion_date: string | null;
  swift_copy: string | null;
  transaction_status: string;
}

const ViewAllTransactions = () => {
  const { data, isLoading, error } = useGetPaymentDetails();

  const mappedData: ViewAllTransactionData[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return (data as AllTransaction[]).flatMap((deal: AllTransaction) =>
      deal.transactions.map(
        (transaction): ViewAllTransactionData => ({
          id: transaction.id || '-',
          transaction_id: transaction.transaction_id || '-',
          ref_no: transaction.company_ref_number || '-',
          agent_ref_no: transaction.agent_ref_number || '-',
          created_date: transaction.order_date || deal.created_at || '-',
          expiry_date: transaction.order_expiry || '-',
          applicant_name: transaction.kyc_details?.applicant_name || '-',
          applicant_pan: transaction.kyc_details?.applicant_pan || '-',
          transaction_type: deal.transaction_type || '-',
          purpose: transaction.purpose || '-',
          kyc_type: 'VKYC',
          kyc_status: transaction.kyc_status || '-',
          payment_status: deal.payment_records?.[0]?.payment_status || 'pending',
          payment_link: null,
          payment_screenshot: null,
          fx_currency: transaction.fx_currency || '-',
          fx_amount: transaction.fx_amount || '-',
          settlement_rate: deal.settlement_rate || '-',
          customer_rate: deal.customer_rate || '-',
          transaction_amount: transaction.transaction_amount || '-',
          rejection_reason: deal.rejection_reason || '-',
          order_date: transaction.order_date || deal.created_at || '-',
          fx_rate: deal.customer_rate || '-',
          kyc_upload_status: 'Uploaded',
          completion_date: null,
          swift_copy: null,
          transaction_status: transaction.transaction_status || '-',
          deal_booking_id: transaction.deal_booking_id || deal.deal_booking_id || '-',
        })
      )
    );
  }, [data]);

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
      <DataTable columns={tableColumns} data={mappedData ?? []} config={tableConfig} actions={tableActions} />
    </div>
  );
};

export default ViewAllTransactions;
