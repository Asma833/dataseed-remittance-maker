import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import GetTransactionTableColumns from './transaction-table.config';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { useGetTransactions } from '../../../hooks/useGetTransactions';
import { TransactionData } from '@/features/maker/types/transaction.types';
import { useCurrentUser } from '@/utils/getUserFromRedux';
import { navigateWithRole } from '@/utils/navigationUtils';


const TransactionTable = ({ onCreate }: { onCreate?: () => void }) => {
  const { data: apiTransactions = [], isLoading } = useGetTransactions();
  const navigate = useNavigate()
  const transactions: TransactionData[] = useMemo(() => {
    const mappedTransactions = (apiTransactions || []).map((item:TransactionData) => ({
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

    // Add dummy data if no API data
    if (mappedTransactions.length === 0) {
      const dummyTransactions: TransactionData[] = [
        {
          id: 'dummy-1',
          temp_id: 'temp-1',
          deal_code: null,
          transaction_type: 'REMITTANCE',
          currency_code: 'USD',
          deal_amount: '1000',
          margin_amount: '0.5',
          settlement_rate: '83.5',
          customer_rate: '84.0',
          booking_status: 'DRAFT',
          created_by: 'dummy-user',
          approved_by: null,
          approved_at: null,
          rejection_reason: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          transactions: [],
          payment_records: [],
          company_ref_no: 'REF001',
          agent_ref_no: 'AGT001',
          order_date: new Date().toLocaleDateString(),
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          applicant_name: 'John Doe',
          applicant_pan_number: 'ABCDE1234F',
          purpose: 'Personal',
          fx_currency: 'USD',
          fx_amount: '1000',
          transaction_amount: '84000',
          deal_status: 'DRAFT',
        },
        {
          id: 'dummy-2',
          temp_id: 'temp-2',
          deal_code: null,
          transaction_type: 'REMITTANCE',
          currency_code: 'EUR',
          deal_amount: '500',
          margin_amount: '0.5',
          settlement_rate: '90.2',
          customer_rate: '90.7',
          booking_status: 'PENDING',
          created_by: 'dummy-user',
          approved_by: null,
          approved_at: null,
          rejection_reason: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          transactions: [],
          payment_records: [],
          company_ref_no: 'REF002',
          agent_ref_no: 'AGT002',
          order_date: new Date().toLocaleDateString(),
          expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          applicant_name: 'Jane Smith',
          applicant_pan_number: 'FGHIJ5678G',
          purpose: 'Business',
          fx_currency: 'EUR',
          fx_amount: '500',
          transaction_amount: '45350',
          deal_status: 'PENDING',
        },
      ];
      return dummyTransactions;
    }

    return mappedTransactions;
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