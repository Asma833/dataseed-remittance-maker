import { useMemo } from 'react';
import { GetViewAllTransactionTableColumns } from './view-transaction-column';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';
import { mapAllTransactionsToTableRows } from '../../utils/transaction-utils';

import { useNavigate } from 'react-router-dom';

const ViewAllTransactions = () => {
  const { data, isLoading, error } = useGetPaymentDetails();
  const navigate = useNavigate();

  const mappedData: PaymentData[] = useMemo(() => {
    return mapAllTransactionsToTableRows(data as AllTransaction[]);
  }, [data]);

  const handleViewTransaction = (rowData: PaymentData) => {
    if (rowData.deal_booking_id) {
       navigate('/branch_agent_maker/transaction/view-all-transactions/view-transactions', { 
           state: { 
               dealId: rowData.deal_booking_id,
               paymentData: rowData
           } 
       });
    }
  };

  // Table columns
  const tableColumns = GetViewAllTransactionTableColumns({ handleViewTransaction });

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
