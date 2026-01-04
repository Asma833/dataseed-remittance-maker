import { useMemo } from 'react';
import { GetViewAllTransactionTableColumns } from './view-transaction-column';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';
import { mapAllTransactionsToTableRows } from '../../utils/transaction-utils';

const ViewAllTransactions = () => {
  const { data, isLoading, error } = useGetPaymentDetails();

  const mappedData: PaymentData[] = useMemo(() => {
    return mapAllTransactionsToTableRows(data as AllTransaction[]);
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
