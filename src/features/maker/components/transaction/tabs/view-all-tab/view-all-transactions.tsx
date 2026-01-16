import { useMemo } from 'react';
import { GetViewAllTransactionTableColumns } from './view-transaction-column';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';
import { mapAllTransactionsToTableRows } from '../../utils/transaction-utils';

import { useNavigate } from 'react-router-dom';
import { useGetDealDetails } from '../../hooks/useGetDealDetails';
import { mapDealDetailsApiToFormInput } from '../../utils/transaction-utils';
import { useState, useEffect } from 'react';

const ViewAllTransactions = () => {
  const { data, isLoading, error } = useGetPaymentDetails();
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const { data: dealDetails, isLoading: isDealLoading } = useGetDealDetails(selectedDealId || undefined);
  const navigate = useNavigate();

  const mappedData: PaymentData[] = useMemo(() => {
    return mapAllTransactionsToTableRows(data as AllTransaction[]);
  }, [data]);

  const handleViewTransaction = (rowData: PaymentData) => {
    if (rowData.deal_booking_id) {
      setSelectedDealId(rowData.deal_booking_id);
    }
  };

  // Handle navigation when deal details are loaded
  useEffect(() => {
    if (dealDetails && selectedDealId && !isDealLoading) {
      try {
        const initialData = mapDealDetailsApiToFormInput(dealDetails, selectedDealId);

        // Find the mapped row to pass the full data (including raw_data) to view mode
        const rowData = mappedData.find((row) => row.deal_booking_id === selectedDealId);
        if (rowData) {
          initialData.paymentDetails = rowData;
        }
        navigate('/branch_agent_maker/transaction/view-all-transactions/view-transactions', { state: { initialData } });
        setSelectedDealId(null); // Reset after navigation
      } catch (error) {
        console.error('Error processing deal details:', error);
        setSelectedDealId(null);
      }
    }
  }, [dealDetails, selectedDealId, isDealLoading, navigate, mappedData]);

  // Table columns
  const tableColumns = GetViewAllTransactionTableColumns({ handleViewTransaction });

  // Table config
  const tableConfig = {
    ...staticConfig,
    loading: isLoading || isDealLoading,
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
