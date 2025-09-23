import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCurrencyTableColumns from './currency-table-columns';
import { CurrencyData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle } from 'lucide-react';

const sampleCurrencies: CurrencyData[] = [
  {
    id: '1',
    sno: 1,
    currency: 'USD',
    ttMargin10_12: '1.5%',
    ttMargin12_02: '2.0%',
    ttMargin02_3_30: '1.8%',
    ttMargin03_30end: '3.0%',
    ttHolidayMargin: '0.5%',
    ttWeekendMargin: '1.0%',
    ttUpperCircuit: '5.0%',
  },
  {
    id: '2',
    sno: 2,
    currency: 'EUR',
    ttMargin10_12: '1.2%',
    ttMargin12_02: '1.8%',
    ttMargin02_3_30: '1.5%',
    ttMargin03_30end: '2.5%',
    ttHolidayMargin: '0.3%',
    ttWeekendMargin: '0.8%',
    ttUpperCircuit: '4.0%',
  },
  {
    id: '3',
    sno: 3,
    currency: 'GBP',
    ttMargin10_12: '1.8%',
    ttMargin12_02: '2.2%',
    ttMargin02_3_30: '2.0%',
    ttMargin03_30end: '3.5%',
    ttHolidayMargin: '0.7%',
    ttWeekendMargin: '1.2%',
    ttUpperCircuit: '6.0%',
  },
];

const CurrencyTable = () => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState<CurrencyData[]>(sampleCurrencies);
  const [loading, setLoading] = useState(false);

  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search currencies...',
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

  // Table data
  const tableData: TableData<CurrencyData> = {
    data: currencies,
    totalCount: currencies.length,
    pageCount: Math.ceil(currencies.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (currency: CurrencyData) => {
    navigate('/admin/master/currency-creation', { state: { currency } });
  };

  // Table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      // Handle sorting
    },
    onGlobalFilterChange: (filter: string) => {
      // Handle global filter
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      // Handle column filters
    },
  };

  // Navigate to currency creation page
  const handleAddCurrency = () => {
    navigate('/admin/master/currency-creation');
  };

  // Define columns
  const columns = GetCurrencyTableColumns({
    handleEdit,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--color-title)]">Currency List</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddCurrency} size="sm">
            <PlusCircle className="h-4 w-4" />
            Add Currency
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default CurrencyTable;