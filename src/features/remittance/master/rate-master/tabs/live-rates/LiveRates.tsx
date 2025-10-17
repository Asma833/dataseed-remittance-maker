import { useState } from 'react';
import { DataTable, staticConfig, TableData } from '@/components/table';
import type { LiveRateData } from './types';
import { LiveRateTableColumnConfig } from './live-rate-table.config';
import { useGetCurrencyRates } from '../../hooks/useCurrencyRate';
import { CurrencyRate } from '../../types/currency-rate.types';

const LiveRates = () => {
  // Fetch currency rates from API
  const { data: currencyRates, isLoading: isLoadingRates, error: ratesError } = useGetCurrencyRates();

  //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
  const [loading, setLoading] = useState(false);
  // Table configuration
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
    loading,
  };

  // Dynamic table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },

    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {},
    onGlobalFilterChange: (filter: string) => {},
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {},
  };

  // Transform API data to component format
  const liveRateData: LiveRateData[] = currencyRates ? currencyRates.map((rate: CurrencyRate) => ({
    id: rate.id,
    currency: rate.currency_code || '-',
    remittanceRate:  '-', 
    currencyRate:  '-', 
    cardBuyRate: rate.card_buy_rate || '-',
    cardSellRate: rate.card_sell_rate || '-',
  })) : [];

  
  // Table data in the same shape used by Super Checker table
  const tableData: TableData<LiveRateData> = {
    data: liveRateData,
    totalCount: liveRateData.length,
    pageCount: Math.ceil(liveRateData.length / ((config.pagination?.pageSize as number) || 10)),
    currentPage: 1,
  };
  
  const isPaginationDynamic = false;

  // Table columns
  const tableColumns = LiveRateTableColumnConfig();
  return (
    <div className="dynamic-table-wrap">
      <DataTable
        columns={tableColumns}
        data={tableData}
        config={{
          ...config,
          // export: { enabled: true, fileName: 'super-checkers.csv', includeHeaders: true },
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};
export default LiveRates;
