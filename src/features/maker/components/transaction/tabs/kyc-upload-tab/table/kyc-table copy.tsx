import { DataTable } from '@/components/table/data-table';
import { useNavigate } from 'react-router-dom';
import { KycTableColumnsConfig } from './kyc-table-columns';
import { useGetPaymentDetails } from '../../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../../types/payment.types';
import { useMemo } from 'react';
import { mapRowDataToInitialData } from '../../../utils/transaction-utils';

type KycTableRow = {
  company_reference_no: string;
  agent_reference_no: string;
  order_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  deal: AllTransaction;
};

const KYCTable = ({ onUploadClick }: { onUploadClick: (isReupload: boolean) => void }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPaymentDetails();

  const mappedData: KycTableRow[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return (data as AllTransaction[]).flatMap((deal: AllTransaction) =>
      deal.transactions.map((transaction) => ({
        company_reference_no: transaction.company_ref_number || '-',
        agent_reference_no: transaction.agent_ref_number || '-',
        order_date: transaction.order_date || deal.created_at || '-',
        expiry_date: transaction.order_expiry || '-',
        applicant_name: transaction.kyc_details?.applicant_name || '-',
        applicant_pan: transaction.kyc_details?.applicant_pan || '-',
        transaction_type: deal.transaction_type || '-',
        purpose: transaction.purpose || '-',
        kyc_type: 'VKYC',
        kyc_status: transaction.kyc_status || 'pending',
        deal,
      }))
    );
  }, [data]);
const handleViewTransaction = (rowData: AllTransaction)=> {
    const initialData = mapRowDataToInitialData(rowData);
    return navigate('../create-transactions', { state: { initialData } });
  };
  const columns = KycTableColumnsConfig({
    navigate,
    onUploadClick: (isReupload: boolean) => {
      // Pass the isReupload to parent
      onUploadClick(isReupload);
    },
    handleViewTransaction
  });

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={columns}
        data={mappedData ?? []}
        config={{
          loading: isLoading,
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
        }}
      />
    </div>
  );
};

export default KYCTable;
