import { useState } from 'react';
import { DataTable, staticConfig, TableData } from '@/components/table';
import type { LiveRateData } from './types';
import { LiveRateTableColumnConfig } from './live-rate-table.config';


const LiveRates = () => {
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
 
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      //console.log('Sorting changed:', sorting);
    },
    onGlobalFilterChange: (filter: string) => {
      //console.log('Global filter changed:', filter);
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      //console.log('Column filters changed:', filters);
    },
  };

  const dummyKYCData: LiveRateData[] = [
    { id: 1, currency: 'USD', remittanceRate: 83.25, currencyRate: 83.1, cardBuyRate: 82.95, cardSellRate: 83.45 },
    { id: 2, currency: 'EUR', remittanceRate: 90.15, currencyRate: 90.05, cardBuyRate: 89.85, cardSellRate: 90.35 },
    { id: 3, currency: 'GBP', remittanceRate: 104.4, currencyRate: 104.25, cardBuyRate: 104.1, cardSellRate: 104.6 },
  ];
  // Table data in the same shape used by Super Checker table
  const tableData: TableData<LiveRateData> = {
    data: dummyKYCData,
    totalCount: dummyKYCData.length,
    pageCount: Math.ceil(dummyKYCData.length / (((config.pagination?.pageSize as number) || 10))),
    currentPage: 1,
  };
  //  const tableData = useMemo(() => {
  //    if (!data) return [];

  //    // If already an array
  //    if (Array.isArray(data)) {
  //      return (data as Order[]).filter(
  //        (item): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //      );
  //    }

  //    // If object with 'orders' property
  //    if (typeof data === 'object' && 'orders' in data) {
  //      const orders = (data as any).orders;
  //      if (Array.isArray(orders)) {
  //        return orders.filter((item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item);
  //      }
  //      if (orders && typeof orders === 'object') {
  //        return Object.values(orders).filter(
  //          (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //        );
  //      }
  //      return [];
  //    }

  //    // If object of objects
  //    if (typeof data === 'object') {
  //      return Object.values(data).filter(
  //        (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //      );
  //    }

  //    return [];
  //  }, [data]);

  //  // Format error message consistently
  //  const errorMessage = useMemo(() => {
  //    if (!error) return '';

  //    if (typeof error === 'string') {
  //      return error;
  //    }

  //    if (error && typeof error === 'object' && 'message' in error) {
  //      return (error as Error).message;
  //    }

  //    return 'An unexpected error occurred';
  //  }, [error]);

  const isPaginationDynamic = false;

  // Table columns
  const tableColumns = LiveRateTableColumnConfig();
 console.log(tableData,"tableData")
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
