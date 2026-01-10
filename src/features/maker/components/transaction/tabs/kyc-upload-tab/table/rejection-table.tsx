import { toast } from 'sonner';
import { DataTable } from '@/components/table/data-table';
import { RejectionTableColumnsConfig } from './rejection-table-columns';
import { RejectionTableProps } from '../../../types/rejection-doc-summary.types';

const RejectionTable = ({
  transactionId,
  flattenedRejectionResData,
  isLoading,
  isError,
  error,
}: RejectionTableProps) => {
  const columns = RejectionTableColumnsConfig();
  if (!transactionId || !flattenedRejectionResData || flattenedRejectionResData.length === 0) return null;

  if (isError) {
    console.error('Failed to load rejection summary:', error);
  }

  return (
    <div className="rejection-table-wrap">
      <h3 className="font-bold mt-5">Rejection Summary</h3>
      {/*{isLoading ? <div className="px-2">Loading rejection summary...</div> : null}*/}
      <DataTable
        columns={columns}
        data={flattenedRejectionResData ?? []}
        config={{
          search: { enabled: false, searchMode: 'static' },
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
          },
          export: { enabled: false },
          loading: isLoading,
        }}
      />
    </div>
  );
};

export default RejectionTable;
