import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import { SetFilters, FilterConfig, DateRange } from '@/components/types/filter.types';
import GenericTableSearch from './GenericTableSearch.tsx';
import GenericTableDateRangeFilter from './GenericTableDateRangeFilter.tsx';
import GenericTableStatusFilter from './GenericTableStatusFilter.tsx';
import GenericTableCustomSelectFilter from './GenericTableCustomSelectFilter.tsx';

interface GenericTableFiltersProps {
  filters: SetFilters;
  filterConfig: FilterConfig;
  setFilters: React.Dispatch<React.SetStateAction<SetFilters>>;
  onFilter?: () => void | Promise<void>;
  onReset?: () => void | Promise<void>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setDynamicData?: React.Dispatch<React.SetStateAction<any[]>>;
}

const GenericTableFilters: React.FC<GenericTableFiltersProps> = ({
  filters,
  filterConfig,
  setFilters,
  onFilter,
  onReset,
  setLoading,
  setDynamicData,
}) => {
  const { renderFilterOptions, mode, dynamicCallbacks } = filterConfig;

  const [localDateRange, setLocalDateRange] = useState<DateRange>(filters.dateRange);
  const [localStatus, setLocalStatus] = useState<string>(filters.status);
  const [localCustomFilters, setLocalCustomFilters] = useState<Record<string, string>>(filters.customFilterValues);
  const [localSearch, setLocalSearch] = useState<string>(filters.search);

  useEffect(() => {
    setLocalDateRange(filters.dateRange);
    setLocalStatus(filters.status);
    setLocalCustomFilters(filters.customFilterValues);
    setLocalSearch(filters.search);
  }, [filters]);

  const executeAsyncOperation = useCallback(
    async <T,>(operation: () => Promise<T>) => {
      if (setLoading) setLoading(true);
      try {
        return await operation();
      } catch (error) {
        console.error('Operation failed:', error);
        return null as unknown as T;
      } finally {
        if (setLoading) setLoading(false);
      }
    },
    [setLoading]
  );

  const handleDateRangeChange = useCallback((dateRange: DateRange) => {
    setLocalDateRange(dateRange);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setLocalStatus(status);
  }, []);

  const handleCustomFilterChange = useCallback((id: string, value: string) => {
    setLocalCustomFilters(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setLocalSearch(search);
    setFilters(prev => ({ ...prev, search }));
  }, [setFilters]);

  const handleApplyFilters = useCallback(async () => {
    const updatedFilters: SetFilters = {
      ...filters,
      dateRange: localDateRange,
      status: localStatus,
      customFilterValues: localCustomFilters,
      search: localSearch,
    };

    setFilters(updatedFilters);
    if (onFilter) await onFilter();

    if (mode === 'dynamic' && dynamicCallbacks?.onFilterApply && setDynamicData) {
      const result = await executeAsyncOperation(
        () => dynamicCallbacks.onFilterApply!(updatedFilters) ?? Promise.resolve([])
      );
      if (result) setDynamicData(result as any[]);
    }
  }, [
    filters,
    localDateRange,
    localStatus,
    localCustomFilters,
    localSearch,
    mode,
    dynamicCallbacks,
    onFilter,
    setDynamicData,
    setFilters,
    executeAsyncOperation,
  ]);

  const handleResetFilters = useCallback(async () => {
    const resetFilters: SetFilters = {
      search: '',
      status: 'all',
      role: '',
      dateRange: { from: undefined, to: undefined },
      customFilterValues: {},
    };

    setLocalDateRange(resetFilters.dateRange);
    setLocalStatus(resetFilters.status);
    setLocalCustomFilters(resetFilters.customFilterValues);
    setLocalSearch(resetFilters.search);
    setFilters(resetFilters);

    if (onReset) await onReset();

    if (mode === 'dynamic' && dynamicCallbacks?.onFilterApply && setDynamicData) {
      const result = await executeAsyncOperation(
        () => dynamicCallbacks.onFilterApply!(resetFilters) ?? Promise.resolve([])
      );
      if (result) setDynamicData(result as any[]);
    }
  }, [mode, dynamicCallbacks, onReset, setDynamicData, setFilters, executeAsyncOperation]);

  const hasFilters =
    renderFilterOptions.dateRange ||
    renderFilterOptions.status ||
    (renderFilterOptions.selects && renderFilterOptions.selects.length > 0);

  // Responsive slot sizes — tweak to your content
  const slot = 'flex-1 min-w-[220px] max-w-[340px]';         // generic filter slot
  const slotDate = 'flex-1 min-w-[220px] max-w-[340px]';     // date group (internal handles 2 slots)
  const slotButtons = 'shrink-0';                            // buttons never shrink
  const slotSearch = 'w-full md:w-80 md:ml-auto';            // search full-width on small, right on md+

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg">
      {/* Single responsive row that WRAPS (no scroll) */}
      <div className="flex flex-wrap items-end gap-1" role="toolbar" aria-label="Table filters">
        {/* Date range group */}
        {hasFilters && renderFilterOptions.dateRange && (
          <div >
            <GenericTableDateRangeFilter
              dateRange={localDateRange}
              onDateRangeChange={handleDateRangeChange}
              className="w-full"
            />
          </div>
        )}

        {/* Status */}
        {hasFilters && renderFilterOptions.status && (
          <div >
            <GenericTableStatusFilter
              status={localStatus}
              statusConfig={renderFilterOptions.status}
              onStatusChange={handleStatusChange}
              className="w-full"
            />
          </div>
        )}

        {/* Custom Selects */}
        {hasFilters && renderFilterOptions.selects?.map((select) => (
          <div key={select.id} >
            <GenericTableCustomSelectFilter
              selectConfig={select}
              value={localCustomFilters[select.id] || 'all'}
              onValueChange={handleCustomFilterChange}
              className="w-full"
            />
          </div>
        ))}

        {/* Buttons */}
        {(renderFilterOptions.applyAction || renderFilterOptions.resetAction) && (
          <div className={`flex items-end gap-2 ${slotButtons}`}>
            {renderFilterOptions.applyAction && (
              <Button
                label="Apply Filters"
                icon="pi pi-check"
                onClick={handleApplyFilters}
                className="bg-indigo-600 p-2 outline-none text-white"
               
              />
            )}
            {renderFilterOptions.resetAction && (
              <Button
                label="Reset"
                icon="pi pi-refresh"
                onClick={handleResetFilters}
                className="bg-slate-400 p-2 outline-none" 
              />
            )}
          </div>
        )}

        {/* Search — goes to new line on small; floats right on md+ */}
        {renderFilterOptions.search && (
          <div>
            <GenericTableSearch
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full"
              showClearButton
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericTableFilters;
