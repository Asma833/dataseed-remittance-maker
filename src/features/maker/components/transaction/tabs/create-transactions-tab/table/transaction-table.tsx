import { useMemo, useState } from 'react';
import GetTransactionTableColumns from './transaction-table.config';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { useGetTransactions } from '../../../hooks/useGetTransactions';
import { TransactionData } from '../../../types/transaction.types';

// Placeholder for dialog
// import TransactionDialog from '../transaction-dialog';

const TransactionTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  const { data: apiTransactions = [], isLoading } = useGetTransactions();

  const transactions: TransactionData[] = useMemo(() => {
    return (apiTransactions || []).map((item: any) => ({
      company_ref_no: item.company_ref_no || '-',
      agent_ref_no: item.agent_ref_no || '-',
      order_date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-',
      expiry_date: '-', // Not available in API response
      applicant_name: item.applicant_name || '-',
      applicant_pan_number: item.applicant_pan || '-',
      transaction_type: item.transaction_type || '-',
      purpose: item.purpose || '-',
      fx_currency: item.fx_currency || '-',
      fx_amount: parseFloat(item.fx_amount || '0') || 0,
      settlement_rate: parseFloat(item.settlement_rate || '0') || 0,
      customer_rate: parseFloat(item.customer_rate || '0') || 0,
      transaction_amount: (parseFloat(item.fx_amount || '0') * (parseFloat(item.customer_rate || '0') || 0)) || 0,
      deal_status: item.status || '-',
    }));
  }, [apiTransactions]);

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
    loading: isLoading,
  };

  const tableData: TableData<TransactionData> = {
    data: transactions,
    totalCount: transactions.length,
    pageCount: Math.ceil(transactions.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (transaction: TransactionData) => {
    // Map back to original data if needed, but for now use transformed
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedTransaction(null);
    setIsDialogOpen(true);
  };

  const columns = useMemo(() => GetTransactionTableColumns({ handleEdit }), [handleEdit]);

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