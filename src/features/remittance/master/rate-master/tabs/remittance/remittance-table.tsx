import { RemittanceTableColumnConfig } from './remittance-table-column.config';
import { DataTable, staticConfig, TableData } from '@/components/table';
import { useState } from 'react';
import type { RemittanceData } from './types';
import SegmentedToggle from '@/components/segment/segment-toggle';
import { RemittanceEditDialog } from './form/RemittanceEditDialog';
import { useGetCurrencyRates } from '../../hooks/useCurrencyRate';
import { CurrencyRate } from '../../types/currency-rate.types';
import { useQueryClient } from '@tanstack/react-query';

const Remittance = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'inr' | 'percentage'>('inr');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRemittance, setSelectedRemittance] = useState<RemittanceData | null>(null);
  // Fetch currency rates from API
  const {
    data: currencyRates,
    isLoading: isLoadingRates,
    error: ratesError,
  } = useGetCurrencyRates(unit === 'inr' ? 'number' : 'percentage');
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
  const remittanceData: RemittanceData[] = currencyRates
    ? currencyRates.map((rate: CurrencyRate) => ({
        id: rate.id,
        currency: rate.currency_code || '-',
        'ttMargin10-12': rate.time_wise_margin?.['10-12'] || '-',
        'ttMargin12-02': rate.time_wise_margin?.['12-02'] || '-',
        'ttMargin02-3-30': rate.time_wise_margin?.['02-3.30'] || '-',
        'ttMargin03-30end': rate.time_wise_margin?.['3.30End'] || '-',
        ttHolidayMargin: rate.time_wise_margin?.holiday || '-',
        ttWeekendMargin: rate.time_wise_margin?.weekend || '-',
        ttUpperCircuit: rate.time_wise_margin?.upper_circuit || '-',
        margin_type: rate.time_wise_margin?.margin_type || '-',
      }))
    : [];

  // Table data in the same shape used by Super Checker table
  const tableData: TableData<RemittanceData> = {
    data: remittanceData,
    totalCount: remittanceData.length,
    pageCount: Math.ceil(remittanceData.length / ((config.pagination?.pageSize as number) || 10)),
    currentPage: 1,
  };

  const isPaginationDynamic = false;

  const handleEdit = (remittance: RemittanceData) => {
    setSelectedRemittance(remittance);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedRemittance: RemittanceData) => {
    // Invalidate and refetch currency rates to update the table
    queryClient.invalidateQueries({ queryKey: ['currencyRates'] });
    setEditDialogOpen(false);
    setSelectedRemittance(null);
  };

  // Table columns
  const tableColumns = RemittanceTableColumnConfig({ handleEdit });
  return (
    <div className="dynamic-table-wrap">
      <div className="flex gap-6 justify-center">
        <SegmentedToggle
          value={unit}
          onChange={(v) => setUnit(v as 'inr' | 'percentage')}
          options={[
            { label: 'INR', value: 'inr' },
            { label: 'Percentage', value: 'percentage' },
          ]}
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

      <RemittanceEditDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedRemittance(null);
        }}
        editData={selectedRemittance}
        onEdit={handleEditSubmit}
        unit={unit}
      />
    </div>
  );
};

export default Remittance;
