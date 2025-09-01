import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from 'primereact/button';
import { SetFilters, FilterConfig, RenderFilterOptions, DateRange } from '@/components/types/filter.types';
import GenericTableSearch from './GenericTableSearch.tsx';
import GenericTableDateRangeFilter from './GenericTableDateRangeFilter.tsx';
import GenericTableStatusFilter from './GenericTableStatusFilter.tsx';
import GenericTableCustomSelectFilter from './GenericTableCustomSelectFilter.tsx';

interface GenericTableFiltersProps {
  filters: SetFilters;
  filterConfig: FilterConfig;
  setFilters: React.Dispatch<React.SetStateAction<SetFilters>>;
  onFilter?: () => void;
  onReset?: () => void;
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

  // Store filter values locally to avoid applying them immediately
  const [localDateRange, setLocalDateRange] = useState<DateRange>(filters.dateRange);
  const [localStatus, setLocalStatus] = useState<string>(filters.status);
  const [localCustomFilters, setLocalCustomFilters] = useState<Record<string, string>>(filters.customFilterValues);
  const [localSearch, setLocalSearch] = useState<string>(filters.search);

  // Update local states when filters change externally
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
        const result = await operation();
        return result;
      } catch (error) {
        console.error('Operation failed:', error);
        return null;
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
    setLocalCustomFilters(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setLocalSearch(search);
    setFilters(prev => ({ ...prev, search }));
  }, [setFilters]);

  const handleApplyFilters = useCallback(async () => {
    // Update the filters in the parent component
    const updatedFilters: SetFilters = {
      ...filters,
      dateRange: localDateRange,
      status: localStatus,
      customFilterValues: localCustomFilters,
      search: localSearch,
    };

    setFilters(updatedFilters);

    // Always call onFilter regardless of pagination state
    if (onFilter) await onFilter();

    if (mode === 'dynamic' && dynamicCallbacks?.onFilterApply && setDynamicData) {
      const result = await executeAsyncOperation(
        () => dynamicCallbacks.onFilterApply!(updatedFilters) ?? Promise.resolve([])
      );
      if (result) setDynamicData(result);
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

    // Always call onReset regardless of pagination state
    if (onReset) onReset();

    if (mode === 'dynamic' && dynamicCallbacks?.onFilterApply && setDynamicData) {
      const result = await executeAsyncOperation(
        () => dynamicCallbacks.onFilterApply!(resetFilters) ?? Promise.resolve([])
      );
      if (result) setDynamicData(result);
    }
  }, [
    mode,
    dynamicCallbacks,
    onReset,
    setDynamicData,
    setFilters,
    executeAsyncOperation,
  ]);

  // Check if any filters are present
  const hasFilters = renderFilterOptions.dateRange || renderFilterOptions.status || (renderFilterOptions.selects && renderFilterOptions.selects.length > 0);

  return (
    <div className="flex flex-col gap-4 w-full p-4 bg-gray-50 rounded-lg">
      {/* Mobile/Tablet Layout */}
      <div className="block lg:hidden space-y-4">
        {/* Filters Section */}
        {hasFilters && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              {/* Date Range Filter */}
              {renderFilterOptions.dateRange && (
                <GenericTableDateRangeFilter
                  dateRange={localDateRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              )}

              {/* Status Filter */}
              {renderFilterOptions.status && (
                <GenericTableStatusFilter
                  status={localStatus}
                  statusConfig={renderFilterOptions.status}
                  onStatusChange={handleStatusChange}
                />
              )}

              {/* Custom Select Filters */}
              {renderFilterOptions.selects &&
                renderFilterOptions.selects.map((select) => (
                  <GenericTableCustomSelectFilter
                    key={select.id}
                    selectConfig={select}
                    value={localCustomFilters[select.id] || 'all'}
                    onValueChange={handleCustomFilterChange}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Buttons and Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
          {/* Action Buttons */}
          {renderFilterOptions.applyAction && renderFilterOptions.resetAction && (
            <div className="flex gap-2 flex-1 sm:flex-none">
              {renderFilterOptions.applyAction && (
                <Button
                  label="Apply Filters"
                  icon="pi pi-check"
                  onClick={handleApplyFilters}
                  className="p-button-primary flex-1 sm:flex-none"
                  style={{ height: '40px', fontWeight: '500' }}
                />
              )}
              {renderFilterOptions.resetAction && (
                <Button
                  label="Reset"
                  icon="pi pi-refresh"
                  onClick={handleResetFilters}
                  className="p-button-secondary flex-1 sm:flex-none"
                  style={{ height: '40px', fontWeight: '500' }}
                />
              )}
            </div>
          )}

          {/* Search Filter */}
          {renderFilterOptions.search && (
            <div className="flex-1 sm:flex-none sm:w-80">
              <GenericTableSearch
                value={localSearch}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full"
                showClearButton={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-end gap-4">
        {/* Left side - Filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-end gap-4 flex-1">
            {/* Date Range Filter */}
            {renderFilterOptions.dateRange && (
              <GenericTableDateRangeFilter
                dateRange={localDateRange}
                onDateRangeChange={handleDateRangeChange}
              />
            )}

            {/* Status Filter */}
            {renderFilterOptions.status && (
              <GenericTableStatusFilter
                status={localStatus}
                statusConfig={renderFilterOptions.status}
                onStatusChange={handleStatusChange}
              />
            )}

            {/* Custom Select Filters */}
            {renderFilterOptions.selects &&
              renderFilterOptions.selects.map((select) => (
                <GenericTableCustomSelectFilter
                  key={select.id}
                  selectConfig={select}
                  value={localCustomFilters[select.id] || 'all'}
                  onValueChange={handleCustomFilterChange}
                />
              ))}
          </div>
        )}

        {/* Right side - Buttons and Search */}
        <div className="flex items-end gap-4 ml-auto">
          {/* Action Buttons */}
          {renderFilterOptions.applyAction && renderFilterOptions.resetAction && (
            <div className="flex gap-2">
              {renderFilterOptions.applyAction && (
                <Button
                  label="Apply Filters"
                  icon="pi pi-check"
                  onClick={handleApplyFilters}
                  className="p-button-primary"
                  style={{ height: '40px', fontWeight: '500' }}
                />
              )}
              {renderFilterOptions.resetAction && (
                <Button
                  label="Reset"
                  icon="pi pi-refresh"
                  onClick={handleResetFilters}
                  className="p-button-secondary"
                  style={{ height: '40px', fontWeight: '500' }}
                />
              )}
            </div>
          )}

          {/* Search Filter - always after reset button */}
          {renderFilterOptions.search && (
            <GenericTableSearch
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-80"
              showClearButton={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericTableFilters;