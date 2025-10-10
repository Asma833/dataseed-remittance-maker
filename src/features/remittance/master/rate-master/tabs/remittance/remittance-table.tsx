import { RemittanceTableColumnConfig } from './remittance-table-column.config';
import { DataTable, staticConfig, TableData } from '@/components/table';
import { useState } from 'react';
import type { RemittanceData } from './types';

const Remittance = () => {
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
    },
    onGlobalFilterChange: (filter: string) => {
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
    },
  };

  const dummyKYCData: RemittanceData[] = [
    {
      id: 1,
      currency: 'USD',
      'ttMargin10-12': 1.25,
      'ttMargin12-02': 1.15,
      'ttMargin02-3-30': 1.1,
      'ttMargin03-30end': 1.3,
      'ttHolidayMargin': 1.4,
      'ttWeekendMargin': 1.5,
    },
    {
      id: 2,
      currency: 'EUR',
      'ttMargin10-12': 1.35,
      'ttMargin12-02': 1.25,
      'ttMargin02-3-30': 1.2,
      'ttMargin03-30end': 1.3,
      'ttHolidayMargin': 1.45,
      'ttWeekendMargin': 1.55,
    },
    {
      id: 3,
      currency: 'GBP',
      'ttMargin10-12': 1.4,
      'ttMargin12-02': 1.3,
      'ttMargin02-3-30': 1.25,
      'ttMargin03-30end': 1.35,
      'ttHolidayMargin': 1.5,
      'ttWeekendMargin': 1.6,
    },
  ];
  // Table data in the same shape used by Super Checker table
  const tableData: TableData<RemittanceData> = {
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
  const tableColumns = RemittanceTableColumnConfig();
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

export default Remittance;
