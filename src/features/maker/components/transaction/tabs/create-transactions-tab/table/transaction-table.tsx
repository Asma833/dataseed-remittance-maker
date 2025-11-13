import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GetTransactionTableColumns from './transaction-table.config';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { useGetTransactions } from '../../../hooks/useGetTransactions';
import { TransactionData } from '../../../types/transaction.types';
import { useCurrentUser } from '@/utils/getUserFromRedux';
import { navigateWithRole } from '@/utils/navigationUtils';


const TransactionTable = ({ onCreate }: { onCreate?: () => void }) => {
  const { data: apiTransactions = [], isLoading } = useGetTransactions();
  const navigate = useNavigate()
  const transactions: TransactionData[] = useMemo(() => {
    return (apiTransactions || []).map((item:TransactionData) => ({
      ...item,
      company_ref_no:  '-',// Not available in API response
      agent_ref_no: '-',// Not available in API response
      order_date: item.created_at ? new Date(item.created_at).toLocaleDateString() : '-',
      expiry_date: '-', // Not available in API response
      applicant_name: '-', // Not available in API response
      applicant_pan_number: '-', // Not available in API response
      transaction_type: item.transaction_type || '-',
      purpose: '-', // Not available in API response
      fx_currency: item.currency_code || '-',
      fx_amount: item.deal_amount || '0',
      settlement_rate: item.settlement_rate || '0',
      customer_rate: item.customer_rate || '0',
      transaction_amount: '0',// Not available in API response
      deal_status: item.booking_status || '-',
      margin_amount: item.margin_amount || '0',
    }));
  }, [apiTransactions]);
   const { getUserRole } = useCurrentUser();
  const userRole = getUserRole();
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
  const handleCreate = onCreate || (() => {
    navigateWithRole(navigate, userRole, '/add-transaction');
  });
  const handleDownload = (transaction: TransactionData) => {
    
  };
  const handleCustomerFillUpLink = (transaction: TransactionData) => {
    
  };
  const columns =  GetTransactionTableColumns({handleCreate,handleDownload,handleCustomerFillUpLink });

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
    </div>
  );
};

export default TransactionTable;