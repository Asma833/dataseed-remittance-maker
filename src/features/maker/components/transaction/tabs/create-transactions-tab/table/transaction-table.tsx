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
    if (apiTransactions.length === 0) {
      // Dummy data when no API data
      return [
        {
          company_ref_no: 'COMP001',
          agent_ref_no: 'AGENT001',
          order_date: new Date().toLocaleDateString(),
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          applicant_name: 'John Doe',
          applicant_pan_number: 'ABCDE1234F',
          transaction_type: 'Education',
          purpose: 'Tuition Fee',
          fx_currency: 'USD',
          fx_amount: 5000,
          settlement_rate: 83.50,
          customer_rate: 84.00,
          transaction_amount: 5000 * 84.00,
          deal_status: 'Pending',
        },
        {
          company_ref_no: 'COMP002',
          agent_ref_no: 'AGENT002',
          order_date: new Date().toLocaleDateString(),
          expiry_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          applicant_name: 'Jane Smith',
          applicant_pan_number: 'FGHIJ5678K',
          transaction_type: 'Travel',
          purpose: 'Medical Treatment',
          fx_currency: 'EUR',
          fx_amount: 3000,
          settlement_rate: 90.25,
          customer_rate: 91.00,
          transaction_amount: 3000 * 91.00,
          deal_status: 'Approved',
        },
      ];
    }

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