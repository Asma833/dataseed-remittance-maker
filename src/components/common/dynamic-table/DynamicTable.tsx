import { useState, useEffect, useRef } from 'react';
import { FileX2 } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column as PrimeColumn } from 'primereact/column';
import { Button } from '@/components/ui/button';
import TableSearchFilter from '@/components/filter/TableSearchFilter';
import { cn } from '@/utils/cn';
import { useTableSorting } from '@/components/common/dynamic-table/hooks/useTableSorting';
import { Column, DynamicTableProps } from '@/components/types/common-components.types';
import { SetFilters } from '@/components/types/filter.types';
import TableDataLoader from './TableDataLoader';
import GenericTableSearch from './GenericTableSearch';
import GenericTableFilters from './GenericTableFilters';
import { useCurrentUser } from '@/utils/getUserFromRedux';
import './DynamicTable.css';

const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const getCellContent = <T extends Record<string, any>>(row: any, column: Column<T>) => {
  if (column.cell) {
    return column.cell(row[column.id], row);
  }

  // Handle nested property paths with dot notation
  let value;
  if (column.id.includes('.')) {
    const parts = column.id.split('.');
    let nestedValue: any = row;
    for (const part of parts) {
      nestedValue = nestedValue?.[part];
      if (nestedValue === undefined) break;
    }
    value = nestedValue || '-';
  } else {
    value = row[column.id] || '-';
  }

  if (value instanceof Date) {
    return formatDate(value);
  }

  if (typeof value === 'string') {
    const datePattern = /^\d{4}-\d{2}-\d{2}|^\d{2}[-/]\d{2}[-/]\d{4}/;
    if (datePattern.test(value) && !isNaN(Date.parse(value))) {
      return formatDate(value);
    }
  }

  if (typeof value === 'object' && value !== null) {
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }

  return String(value ?? '');
};

export function DynamicTable<T extends Record<string, any>>({
  columns,
  tableWrapperClass,
  renderLeftSideActions,
  renderRightSideActions,
  data: initialData,
  initialPageSize = 10,
  defaultSortColumn = '',
  defaultSortDirection = 'desc',
  pageSizeOption = [10, 15, 20, 25, 50],
  onRowClick,
  filter,
  refreshAction,
  loading: externalLoading,
  renderComponents,
  totalRecords,
  onFilteredDataChange,
}: DynamicTableProps<T>) {
  const [filters, setFilters] = useState<SetFilters>({
    search: '',
    status: 'all',
    role: '',
    dateRange: { from: undefined, to: undefined },
    customFilterValues: {},
  });

  const [internalLoading, setInternalLoading] = useState(false);
  const [dynamicData, setDynamicData] = useState<T[]>([]);

  // Handle search for PrimeReact - moved before filtering logic
  const [globalFilter, setGlobalFilter] = useState<string>('');

  // Add user change detection to clear stale data
  const { getUserHashedKey } = useCurrentUser();
  const currentUserKey = getUserHashedKey();
  const previousUserKeyRef = useRef<string | undefined>(currentUserKey);

  // Clear dynamic data when user changes to prevent data leakage
  useEffect(() => {
    if (previousUserKeyRef.current !== currentUserKey) {
      setDynamicData([]);
      // Reset filters when user changes
      setFilters({
        search: '',
        status: 'all',
        role: '',
        dateRange: { from: undefined, to: undefined },
        customFilterValues: {},
      });
      previousUserKeyRef.current = currentUserKey;
    }
  }, [currentUserKey]);
  // Use dynamic data if in dynamic mode, otherwise use filtered data
  const mode = filter?.mode || 'static';
  const loading = externalLoading || internalLoading;

  // Use either the dynamically fetched data or the original data based on mode
  const dataSource = mode === 'dynamic' && dynamicData.length > 0 ? dynamicData : initialData;

  // For PrimeReact, we'll let it handle sorting and pagination internally
  // But keep the custom sorting hook for backward compatibility if needed
  const { sortedData, sortColumn, sortDirection, toggleSort } = useTableSorting(
    dataSource || [], // Ensure dataSource is an array
    defaultSortColumn as string | undefined,
    defaultSortDirection
  );

  // Ensure sortedData is always an array before filtering
  const dataToFilter = Array.isArray(sortedData) ? sortedData : [];

  // Only filter data in static mode
  const filteredData =
    mode === 'static'
      ? dataToFilter.filter((item) => {
          // Apply search filter (but let PrimeReact handle global search)
          if (filters.search && filter?.filterOption && !globalFilter) {
            const searchTerm = filters.search.toLowerCase();
            const matchesSearch = columns.some((column) => {
              // Try to get the value from the column id, which could be a nested path
              let value: any;

              if (column.id.includes('.')) {
                // Handle nested properties for search as well
                const parts = column.id.split('.');
                let nestedValue: any = item;
                for (const part of parts) {
                  nestedValue = nestedValue?.[part];
                  if (nestedValue === undefined) break;
                }
                value = nestedValue;
              } else {
                value = item[column.id];
              }

              if (value === undefined || value === null) return false;
              return String(value).toLowerCase().includes(searchTerm);
            });
            if (!matchesSearch) return false;
          }

          // Apply date range filter
          if (filter?.dateFilterColumn && filters.dateRange) {
            const dateColumn = filter?.dateFilterColumn as string;
            const itemDate = item[dateColumn] ? new Date(item[dateColumn]) : null;

            if (filters.dateRange.from && itemDate) {
              const fromDate = new Date(filters.dateRange.from);
              if (itemDate < fromDate) return false;
            }

            if (filters.dateRange.to && itemDate) {
              const toDate = new Date(filters.dateRange.to);
              toDate.setHours(23, 59, 59, 999); // End of the day
              if (itemDate > toDate) return false;
            }
          }

          // Apply status filter
          if (filter?.statusFilerColumn && filters.status && filters.status !== 'all') {
            const statusColumn = filter.statusFilerColumn as string;
            if (item[statusColumn] !== filters.status) return false;
          }

          // Apply custom select filters
          for (const [key, value] of Object.entries(filters.customFilterValues)) {
            if (value && value !== 'all') {
              // Handle nested properties with dot notation (e.g., 'purpose_type_name.purpose_name')
              if (key.includes('.')) {
                const parts = key.split('.');
                let nestedValue: any = item;
                // Navigate through the nested objects
                for (const part of parts) {
                  nestedValue = nestedValue?.[part];
                  if (nestedValue === undefined) break;
                }
                // If nestedValue is undefined or doesn't match, filter out
                if (nestedValue === undefined || nestedValue !== value) return false;
              } else if (item[key] !== value) {
                // Standard property check
                return false;
              }
            }
          }

          return true;
        })
      : sortedData; // In dynamic mode, we don't filter locally

  // Use PrimeReact's built-in pagination state
  const [primeCurrentPage, setPrimeCurrentPage] = useState(0);
  const [primePageSize, setPrimePageSize] = useState(initialPageSize);

  // Calculate total records for display
  const totalRecordsForDisplay = mode === 'static' && filters.search ? filteredData.length : totalRecords || filteredData.length;

  // Track previous filtered data to avoid infinite loops
  const prevFilteredDataRef = useRef<T[]>([]);

  // Notify parent component when filtered data changes
  useEffect(() => {
    if (onFilteredDataChange && JSON.stringify(filteredData) !== JSON.stringify(prevFilteredDataRef.current)) {
      prevFilteredDataRef.current = filteredData;
      onFilteredDataChange(filteredData);
    }
  }, [filteredData]); // Only depend on filteredData, not the callback

  // We need to track filter operations separately
  const [lastFiltered, setLastFiltered] = useState<number>(0);

  // Force only one filter operation per 500ms
  const handleFilter = () => {
    const now = Date.now();

    // Always reset to page 1 when filtering, regardless of timing
    setPrimeCurrentPage(0);

    // Only limit frequency of filter operations, not whether they can occur
    if (now - lastFiltered < 500) {
      return;
    }

    setLastFiltered(now);
  };

  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    // Allow reset operations regardless of pagination state
    const now = Date.now();
    if (now - lastFiltered < 500) return;

    setLastFiltered(now);

    setFilters({
      search: '',
      status: 'all',
      role: '',
      dateRange: { from: undefined, to: undefined },
      customFilterValues: {},
    });

    setPrimeCurrentPage(0);

    if (mode === 'dynamic') {
      setDynamicData([]);
    }
    //re-render of filter component
    setResetKey((prev) => prev + 1);
  };
  const handleRefreshWithReset = () => {
    // reset filters
    handleReset();
    // fetch fresh data
    refreshAction?.onRefresh();
  };

  // Handle page change for PrimeReact pagination
  const handlePageChange = (page: number) => {
    setPrimeCurrentPage(page - 1); // Convert to 0-based indexing
  };

  const handleSearchChange = (value: string) => {
    setGlobalFilter(value);
    // Update the filters state for backward compatibility
    setFilters(prev => ({ ...prev, search: value }));
    // Reset to first page when searching
    setPrimeCurrentPage(0);
  };

  // Generate PrimeReact columns from our column definition
  const primeColumns = columns.map((col: Column<T>) => (
    <PrimeColumn
      key={col.id}
      field={col.id}
      header={
        <div className="text-center w-full">
          {col.sortable ? (
            <div className="flex items-center justify-center cursor-pointer" onClick={() => toggleSort(col.id)}>
              <span>{col.name}</span>
              <span className="ml-2">
                {sortColumn === col.id && (
                  <span className="text-primary">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
                {sortColumn !== col.id && (
                  <span className="text-gray-400">↕</span>
                )}
              </span>
            </div>
          ) : (
            <span>{col.name}</span>
          )}
        </div>
      }
      sortable={col.sortable}
      body={(rowData: T) => getCellContent(rowData, col)}
      className={`text-center odz-table-cell ${col.className || ''}`}
      headerClassName="text-center font-medium odz-th"
      bodyClassName="text-center odz-table-cell"
    />
  ));

  return (
    <div className="space-y-4 dynamic-table-container w-full">
      {refreshAction && refreshAction.isRefreshButtonVisible && (
        <div className="flex items-center justify-between">
          <Button onClick={handleRefreshWithReset} variant="outline" size={'sm'}>
            {refreshAction.refreshButtonText ? refreshAction.refreshButtonText : 'Refresh Data'}
          </Button>

          <div>
            {refreshAction.isLoading && <span className="text-blue-500">Loading data...</span>}
            {refreshAction.hasError && <span className="text-red-500">Error loading data</span>}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-end items-center w-full gap-4 md:flex-row flex-col">
        {renderLeftSideActions && <div className="flex-1 py-2">{renderLeftSideActions()}</div>}
        {(filter || renderComponents) && (
          <div className="w-full sm:flex-1 items-center sm:py-2">
            {/* New PrimeReact filters implementation */}
            {filter?.filterOption && (
              <div className="w-full sm:flex-1">
                <GenericTableFilters
                  key={resetKey}
                  filters={filters}
                  filterConfig={filter}
                  setFilters={setFilters}
                  onFilter={handleFilter}
                  onReset={handleReset}
                  setLoading={setInternalLoading}
                  setDynamicData={setDynamicData}
                />
              </div>
            )}
            {renderComponents && <div>{renderComponents}</div>}
          </div>
        )}
        {renderRightSideActions && <div className="flex flex-row justify-end py-2">{renderRightSideActions()}</div>}
      </div>


      <div className={cn('w-full', tableWrapperClass)}>
        <DataTable
          value={filteredData}
          loading={loading}
          globalFilter={globalFilter}
          filterDisplay="menu"
          paginator
          rows={primePageSize}
          first={primeCurrentPage * primePageSize}
          onPage={(e) => {
            setPrimeCurrentPage(e.page || 0);
            setPrimePageSize(e.rows || initialPageSize);
          }}
          totalRecords={totalRecordsForDisplay}
          lazy={mode === 'dynamic'}
          emptyMessage={
            <div className="flex items-center justify-center space-x-2 py-20 text-primary">
              <FileX2 size="20px" />
              <div className="not-data-found-w">Data Not Found</div>
            </div>
          }
          loadingIcon={<TableDataLoader />}
          className="p-datatable-sm odz-table center-aligned-table"
          stripedRows
          showGridlines
          size="small"
          tableClassName="odz-table-body"
          tableStyle={{ textAlign: 'center' }}
          onRowClick={(e) => onRowClick?.(e.data as T)}
          selectionMode={onRowClick ? 'single' : undefined}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rowsPerPageOptions={pageSizeOption}
          currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} entries`}
          globalFilterFields={columns.map(col => col.id)}
        >
          {primeColumns}
        </DataTable>
      </div>
    </div>
  );
}
