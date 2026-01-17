import { useMemo } from 'react';
import { DataTable } from '@/components/table/data-table';
import { useNavigate } from 'react-router-dom';
import { KycTableColumnsConfig } from './kyc-table-columns';
import { useGetPaymentDetails } from '../../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../../types/payment.types';
import { mapAllTransactionsToTableRows } from '../../../utils/transaction-utils';

const KYCTable = ({ onUploadClick }: { onUploadClick: (isReupload: boolean, transaction: any) => void }) => {
  const navigate = useNavigate();
  const { data: rawData, isLoading } = useGetPaymentDetails<AllTransaction[]>();

  const mappedData = useMemo(() => {
    return mapAllTransactionsToTableRows(rawData as AllTransaction[]);
  }, [rawData]);

  const handleViewTransaction = (rowData: PaymentData) => {
    if (rowData.deal_booking_id) {
       navigate('/branch_agent_maker/transaction/kyc/view-transactions', { 
           state: { 
               dealId: rowData.deal_booking_id,
               paymentData: rowData
           } 
       });
    }
  };

  const columns = KycTableColumnsConfig({
    navigate,
    onUploadClick: (status: string, transaction: any) => {
      onUploadClick(status === 'REJECTED', transaction);
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
          loading: isLoading,
        }}
      />
    </div>
  );
};

export default KYCTable;
