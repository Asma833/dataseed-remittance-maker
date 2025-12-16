import { DataTable } from '@/components/table/data-table';
import { RejectionTableColumnsConfig } from './rejection-table-columns';

interface RejectionTableProps {
  data?: any[];
}

const RejectionTable = ({ data = [] }: RejectionTableProps) => {
  const dummyRejectionData = [
    {
      user: 'John Doe',
      document: 'Passport.pdf',
      rejection_date: '2024-06-15T10:00:00Z',
      reason: 'Document is blurry and unreadable',
    },
    {
      user: 'John Doe',
      document: 'Address Proof.pdf',
      rejection_date: '2024-06-16T14:30:00Z',
      reason: 'Address proof is expired',
    },
  ];

  const columns = RejectionTableColumnsConfig();
  const tableData = data.length > 0 ? data : dummyRejectionData;

  return (
    <div className="rejection-table-wrap">
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          search: { enabled: false, searchMode: 'static' },
          pagination: {
            enabled: false,
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
        }}
      />
    </div>
  );
};

export default RejectionTable;
