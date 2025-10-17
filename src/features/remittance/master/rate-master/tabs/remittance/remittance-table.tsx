import { RemittanceTableColumnConfig } from './remittance-table-column.config';
import { DataTable, staticConfig, TableData } from '@/components/table';
import { useState } from 'react';
import type { RemittanceData } from './types';
import SegmentedToggle from '@/components/segment/segment-toggle';

const Remittance = () => {
  //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
  const [loading, setLoading] = useState(false);
  // const [txn, setTxn] = useState<"buy" | "sell">("buy");
  const [unit, setUnit] = useState<"inr" | "percentage">("inr");
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

  const dummyKYCData: RemittanceData[] = [
    {
      id: 1,
      currency: 'USD',
      'ttMargin10-12': 1.25,
      'ttMargin12-02': 1.15,
      'ttMargin02-3-30': 1.1,
      'ttMargin03-30end': 1.3,
      ttHolidayMargin: 1.4,
      ttWeekendMargin: 1.5,
      ttUpperCircuit: '4.0%',
    },
    {
      id: 2,
      currency: 'EUR',
      'ttMargin10-12': 1.35,
      'ttMargin12-02': 1.25,
      'ttMargin02-3-30': 1.2,
      'ttMargin03-30end': 1.3,
      ttHolidayMargin: 1.45,
      ttWeekendMargin: 1.55,
      ttUpperCircuit: '4.0%',
    },
    {
      id: 3,
      currency: 'GBP',
      'ttMargin10-12': 1.4,
      'ttMargin12-02': 1.3,
      'ttMargin02-3-30': 1.25,
      'ttMargin03-30end': 1.35,
      ttHolidayMargin: 1.5,
      ttWeekendMargin: 1.6,
      ttUpperCircuit: '4.0%',
    },
  ];
  // Table data in the same shape used by Super Checker table
  const tableData: TableData<RemittanceData> = {
    data: dummyKYCData,
    totalCount: dummyKYCData.length,
    pageCount: Math.ceil(dummyKYCData.length / ((config.pagination?.pageSize as number) || 10)),
    currentPage: 1,
  };
  
  const isPaginationDynamic = false;

  const handleEdit = (remittance: RemittanceData) => {
    // Implement edit logic here
    console.log('Edit remittance:', remittance);
  };

  // Table columns
  const tableColumns = RemittanceTableColumnConfig({ handleEdit });
  return (
    <div className="dynamic-table-wrap">
      <div className="flex gap-6 justify-center">
        <SegmentedToggle
        value={unit}
        onChange={(v) => setUnit(v as "inr" | "percentage")}
        options={[{label:'INR', value:'inr'}, {label:'Percentage', value:'percentage'}]}
        size="md"
        segmentWidthPx={100} // make each pill wider
      />
      </div>
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
