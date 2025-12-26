import { DataTable } from '@/components/table/data-table';
import { useNavigate } from 'react-router-dom';
import { KycTableColumnsConfig } from './kyc-table-columns';
import { useGetPaymentDetails } from '../../../hooks/useGetPaymentDetails';

//import { KYCStatusEnum } from '@/types/enums';

const KYCTable = ({ onUploadClick }: { onUploadClick: (isReupload: boolean, transaction: any) => void }) => {
  const navigate = useNavigate();
  const { data: deals, isLoading, } = useGetPaymentDetails();

  const columns = KycTableColumnsConfig({
    navigate,
    onUploadClick: (status: string, transaction: any) => {
      // isReupload is true if status is REJECTED
     // const isReupload = status === KYCStatusEnum.REJECTED;
      onUploadClick(true, transaction);
    },
  });

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={columns}
        data={deals || []}
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
              columnId: 'created_at',
              useMuiDateRangePicker: true,
            },
          },
          export: { enabled: true, fileName: 'deals.csv' },
          loading: isLoading,
        }}
      />
    </div>
  );
};

export default KYCTable;
