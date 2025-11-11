import { useMemo, useState } from 'react';
import GetTransactionTableColumns, { TransactionData } from './transaction-table.config';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TableTitle } from '@/features/auth/components/table-title';

// Placeholder for actual data fetching hook
// import { useGetTransactions } from '@/features/maker/hooks/useGetTransactions';
// Placeholder for dialog
// import TransactionDialog from '../transaction-dialog';

const TransactionTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  // Placeholder data - replace with actual hook like useGetTransactions()
  const transactions: TransactionData[] = []; // Example: fetch from API

  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search...',
      enabled: true,
      searchMode: 'static' as const,
    },
    filters: {
      ...staticConfig.filters,
      enabled: true,
      filterMode: 'static' as const,
      columnFilters: true,
      globalFilter: true,
    },
    loading: false, // Set to true if loading
  };

  const tableData: TableData<TransactionData> = {
    data: transactions,
    totalCount: transactions.length,
    pageCount: Math.ceil(transactions.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedTransaction(null);
    setIsDialogOpen(true);
  };

  const columns = useMemo(() => GetTransactionTableColumns({ handleEdit }), []);

  return (
    <div className="space-y-4 w-full">
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
          export: {
            enabled: true,
            fileName: 'transactions.csv',
            includeHeaders: true,
          },
        }}
        actions={{
          onPaginationChange: () => {},
          onSortingChange: () => {},
          onGlobalFilterChange: () => {},
          onColumnFiltersChange: () => {},
        }}
        className="rounded-lg"
      />

      {/* Placeholder for dialog */}
      {/* <TransactionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        editData={selectedTransaction}
      /> */}
    </div>
  );
};

export default TransactionTable;