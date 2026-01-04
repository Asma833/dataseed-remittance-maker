import { useMemo, useState, useEffect } from 'react';
import { DataTable } from '@/components/table/data-table';
import { useNavigate } from 'react-router-dom';
import { KycTableColumnsConfig } from './kyc-table-columns';
import { useGetPaymentDetails } from '../../../hooks/useGetPaymentDetails';
import { useGetDealDetails } from '../../../hooks/useGetDealDetails';
import { AllTransaction, PaymentData } from '../../../types/payment.types';
import { mapAllTransactionsToTableRows, mapDealDetailsApiToFormInput } from '../../../utils/transaction-utils';

const KYCTable = ({ onUploadClick }: { onUploadClick: (isReupload: boolean, transaction: any) => void }) => {
  const navigate = useNavigate();
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  const { data: rawData, isLoading } = useGetPaymentDetails<AllTransaction[]>();
  const { data: dealDetails, isLoading: isDealLoading } = useGetDealDetails(selectedDealId || undefined);

  const mappedData = useMemo(() => {
    return mapAllTransactionsToTableRows(rawData as AllTransaction[]);
  }, [rawData]);

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

        navigate('../create-transactions', { state: { initialData } });
        setSelectedDealId(null); // Reset after navigation
      } catch (error) {
        console.error('Error processing deal details:', error);
        setSelectedDealId(null);
      }
    }
  }, [dealDetails, selectedDealId, isDealLoading, navigate, mappedData]);

  const columns = KycTableColumnsConfig({
    navigate,
    onUploadClick: (status: string, transaction: any) => {
      onUploadClick(true, transaction);
    },
    handleViewTransaction,
  });

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={columns}
        data={mappedData || []}
        config={{
          search: { enabled: true, searchMode: 'static' },
          pagination: {
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50, 100],
            showPageSizeSelector: true,
          },
          sorting: { enabled: true, multiSort: false, sortMode: 'static' },
          filters: {
            enabled: true,
            filterMode: 'static',
            columnFilters: true,
            globalFilter: true,
            dateRangeFilter: {
              enabled: true,
              columnId: 'order_date',
              useMuiDateRangePicker: true,
            },
          },
          export: { enabled: true, fileName: 'kyc-details.csv' },
          loading: isLoading || isDealLoading,
        }}
      />
    </div>
  );
};

export default KYCTable;
