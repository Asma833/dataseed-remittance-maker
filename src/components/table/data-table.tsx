import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  RowData,
  Row,
} from '@tanstack/react-table';

// Extend ColumnMeta to include custom properties
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerAlign?: 'left' | 'center' | 'right';
    cellAlign?: 'left' | 'center' | 'right';
    className?: string;
  }
}
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ArrowRightIcon,
  RefreshCwIcon,
  SearchIcon,
  DownloadIcon,
  Loader2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipButton } from '@/components/common/tooltip-button';
import { cn } from '@/utils/cn';
import { TableConfig, TableColumn, TableData, TableActions } from './types';
import { defaultTableConfig } from './config';
import { exportTableToCSV } from './csv-export.utils';
import { Pagination } from './pagination';

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: TableData<T> | T[]; // Support both TableData object and direct array
  config?: Partial<TableConfig>;
  actions?: TableActions<T>;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  config: configOverride = {},
  actions = {},
  className,
}: DataTableProps<T>) {
  // Early error handling for invalid data
  if (!data) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-destructive">Error: No data provided to table</div>
      </div>
    );
  }

  // Ensure data.data is always an array
  const safeData = useMemo(() => {
    let processedData: T[] = [];

    if (Array.isArray(data)) {
      // If data is directly an array (legacy support)
      processedData = data;
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.data)) {
        processedData = data.data;
      } else if (data.data === null || data.data === undefined) {
        processedData = [];
      } else {
        // If data.data exists but is not an array, log warning and use empty array
        console.warn('DataTable: data.data should be an array, received:', typeof data.data, data.data);
        processedData = [];
      }
    } else {
      // If data is not an object or array
      console.warn('DataTable: data should be an object with data property or an array, received:', typeof data, data);
      processedData = [];
    }

    return {
      data: processedData,
      totalCount: data && typeof data === 'object' && !Array.isArray(data) ? data.totalCount : processedData.length,
      pageCount: data && typeof data === 'object' && !Array.isArray(data) ? data.pageCount : undefined,
      currentPage: data && typeof data === 'object' && !Array.isArray(data) ? data.currentPage : undefined,
    };
  }, [data]);

  // Early error handling for invalid columns
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-destructive">Error: No columns provided to table</div>
      </div>
    );
  }

  // Merge configuration
  const config = useMemo(
    () => ({
      ...defaultTableConfig,
      ...configOverride,
      pagination: { ...defaultTableConfig.pagination, ...configOverride.pagination },
      search: { ...defaultTableConfig.search, ...configOverride.search },
      filters: { ...defaultTableConfig.filters, ...configOverride.filters },
      sorting: { ...defaultTableConfig.sorting, ...configOverride.sorting },
      rowSelection: { ...defaultTableConfig.rowSelection, ...configOverride.rowSelection },
    }),
    [configOverride]
  );

  // Get filter configurations (support both nested and direct properties)
  const statusFilterConfig = config.filters.filter?.statusFilter || config.filters.statusFilter;
  const roleFilterConfig = config.filters.filter?.roleFilter || config.filters.roleFilter;

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<string>('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [appliedRoleFilter, setAppliedRoleFilter] = useState<string>('all');

  // State for custom filters
  const [selectedCustomFilters, setSelectedCustomFilters] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    config.filters.customFilters?.forEach((filter) => {
      initialFilters[filter.columnId] = 'all';
    });
    return initialFilters;
  });
  const [appliedCustomFilters, setAppliedCustomFilters] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    config.filters.customFilters?.forEach((filter) => {
      initialFilters[filter.columnId] = 'all';
    });
    return initialFilters;
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: safeData.currentPage ? safeData.currentPage - 1 : 0,
    pageSize: config.pagination.pageSize,
  });

  // Convert our column format to TanStack format
  const tanstackColumns = useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((col) => {
        const baseDef = {
          id: col.id,
          header: col.header,
          accessorKey: col.accessorKey as string,
          enableSorting: col.sortable ?? config.sorting.enabled,
          enableColumnFilter: col.filterable ?? config.filters.columnFilters,
          enableHiding: col.enableHiding ?? true,
        };

        const optionalDef: Partial<ColumnDef<T>> = {};

        if (typeof col.width === 'number') {
          optionalDef.size = col.width;
        }

        if (col.minWidth !== undefined) {
          optionalDef.minSize = col.minWidth;
        }

        if (col.maxWidth !== undefined) {
          optionalDef.maxSize = col.maxWidth;
        }

        if (col.meta !== undefined) {
          optionalDef.meta = col.meta;
        }

        if (col.cell) {
          optionalDef.cell = ({ row, getValue }) => col.cell!({ row: row.original, value: getValue() });
        }

        return { ...baseDef, ...optionalDef };
      }),
    [columns, config.sorting.enabled, config.filters.columnFilters]
  );

  // Calculate total data for static pagination with manual filtering
  const tableData = useMemo(() => {
    let filteredData = safeData.data || [];

    // Apply manual status filtering if a specific status is applied
    if (appliedStatusFilter !== 'all' && statusFilterConfig?.enabled) {
      const columnId = statusFilterConfig?.columnId || 'status';
      filteredData = filteredData.filter((item: any) => {
        const itemValue = item[columnId];

        // Handle boolean values (e.g., is_active field)
        if (typeof itemValue === 'boolean') {
          // Convert boolean to 'Active'/'Inactive' string for comparison
          const statusString = itemValue ? 'Active' : 'Inactive';
          return statusString === appliedStatusFilter;
        }

        // Handle string values directly
        return itemValue === appliedStatusFilter;
      });
    }

    // Apply manual role filtering if a specific role is applied
    if (appliedRoleFilter !== 'all' && roleFilterConfig?.enabled) {
      const columnId = roleFilterConfig?.columnId || 'role';
      filteredData = filteredData.filter((item: any) => {
        const itemValue = item[columnId];

        // Handle boolean values
        if (typeof itemValue === 'boolean') {
          const statusString = itemValue ? 'Active' : 'Inactive';
          return statusString === appliedRoleFilter;
        }

        // Handle string values directly
        return itemValue === appliedRoleFilter;
      });
    }

    // Apply custom filters
    if (config.filters.customFilters) {
      config.filters.customFilters.forEach((filter) => {
        const appliedValue = appliedCustomFilters[filter.columnId];
        if (appliedValue && appliedValue !== 'all' && filter.enabled) {
          filteredData = filteredData.filter((item: any) => {
            const itemValue = item[filter.columnId];

            // Handle boolean values
            if (typeof itemValue === 'boolean') {
              const statusString = itemValue ? 'Active' : 'Inactive';
              return statusString === appliedValue;
            }

            // Handle string values directly
            return itemValue === appliedValue;
          });
        }
      });
    }

    if (config.paginationMode === 'static') {
      return filteredData;
    }
    return filteredData;
  }, [
    safeData.data,
    config.paginationMode,
    appliedStatusFilter,
    appliedRoleFilter,
    appliedCustomFilters,
    statusFilterConfig,
    roleFilterConfig,
    config.filters.customFilters,
  ]);

  // Helper function to export data to CSV
  const exportToCSV = () => {
    // Get the currently visible/filtered rows from the table
    const rows = table.getFilteredRowModel().rows as Row<T>[];

    exportTableToCSV(rows, columns, {
      fileName: config.export?.fileName || 'export.csv',
      includeHeaders: config.export?.includeHeaders ?? true,
    });
  };

  // Helper function to clear all filters
  const clearAllFilters = () => {
    setGlobalFilter('');
    setColumnFilters([]);
    setSelectedStatusFilter('all');
    setAppliedStatusFilter('all');
    setSelectedRoleFilter('all');
    setAppliedRoleFilter('all');

    // Clear custom filters
    const clearedFilters: Record<string, string> = {};
    config.filters.customFilters?.forEach((filter) => {
      clearedFilters[filter.columnId] = 'all';
    });
    setSelectedCustomFilters(clearedFilters);
    setAppliedCustomFilters(clearedFilters);
  };

  // Helper function to apply filters (for manual submission)
  const applyFilters = () => {
    // Apply the selected status filter
    setAppliedStatusFilter(selectedStatusFilter);

    // Apply the selected role filter
    setAppliedRoleFilter(selectedRoleFilter);

    // Apply custom filters
    setAppliedCustomFilters(selectedCustomFilters);

    // Clear global filter when applying column filters
    setGlobalFilter('');
    setColumnFilters([]);

  };

  // Table instance with error handling
  const tableOptions: any = {
    data: Array.isArray(tableData) ? tableData : [],
    columns: tanstackColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    enableMultiSort: config.sorting.multiSort,
    manualPagination: config.paginationMode === 'dynamic',
    manualSorting: config.sorting.sortMode === 'dynamic',
    manualFiltering: config.filters.filterMode === 'dynamic',
    pageCount: config.paginationMode === 'dynamic' ? safeData.pageCount : undefined,
  };

  if (config.pagination.enabled) {
    tableOptions.getPaginationRowModel = getPaginationRowModel();
  }

  if (config.sorting.enabled) {
    tableOptions.getSortedRowModel = getSortedRowModel();
  }

  if (config.filters.enabled) {
    tableOptions.getFilteredRowModel = getFilteredRowModel();
  }

  const table = useReactTable(tableOptions);

  // Handle dynamic actions with error boundaries
  useEffect(() => {
    try {
      if (config.paginationMode === 'dynamic' && actions.onPaginationChange) {
        actions.onPaginationChange(pagination);
      }
    } catch (error) {
    }
  }, [pagination, config.paginationMode, actions]);

  useEffect(() => {
    try {
      if (config.sorting.sortMode === 'dynamic' && actions.onSortingChange) {
        actions.onSortingChange(sorting);
      }
    } catch (error) {
    }
  }, [sorting, config.sorting.sortMode, actions]);

  useEffect(() => {
    try {
      if (config.search.searchMode === 'dynamic' && actions.onGlobalFilterChange) {
        const timeoutId = setTimeout(() => {
          actions.onGlobalFilterChange!(globalFilter);
        }, config.search.debounceMs);
        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
    }
    return undefined;
  }, [globalFilter, config.search.searchMode, config.search.debounceMs, actions]);

  useEffect(() => {
    try {
      if (config.filters.filterMode === 'dynamic' && actions.onColumnFiltersChange) {
        actions.onColumnFiltersChange(columnFilters);
      }
    } catch (error) {
    }
  }, [columnFilters, config.filters.filterMode, actions]);

  // Wrap the entire table rendering in error boundary
  try {
    return (
      <div className={cn('space-y-4 mb-20', className)}>
        {/* Search and Filters Header */}
        {(config.search.enabled || config.filters.enabled) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Filters */}
              <div className="flex items-end gap-3">
                {/* Role Filter */}
                {roleFilterConfig?.enabled && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-600 px-1 h-5 flex items-center">
                      Select {roleFilterConfig.columnName || 'Role'}
                    </p>
                    <Select value={selectedRoleFilter} onValueChange={(value) => setSelectedRoleFilter(value)}>
                      <SelectTrigger className="w-40 bg-[var(--color-table-header-bg)]">
                        <SelectValue placeholder={roleFilterConfig.columnName || 'Role'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {roleFilterConfig.columnName || 'Role'}</SelectItem>
                        {roleFilterConfig.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Status Filter */}
                {statusFilterConfig?.enabled && (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-600 px-1 h-5 flex items-center">
                     Select {statusFilterConfig.columnName || 'Status'}
                    </p>
                    <Select value={selectedStatusFilter} onValueChange={(value) => setSelectedStatusFilter(value)}>
                      <SelectTrigger className="w-40 bg-[var(--color-table-header-bg)]">
                        <SelectValue placeholder={statusFilterConfig.columnName || 'Status'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {statusFilterConfig.columnName || 'Status'}</SelectItem>
                        {statusFilterConfig.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Custom Filters */}
                {config.filters.customFilters?.map(
                  (filter) =>
                    filter.enabled && (
                      <div key={filter.columnId} className="flex flex-col gap-1">
                        <p className="text-xs text-gray-600 px-1 h-5 flex items-center">{filter.columnName}</p>
                        <Select
                          value={selectedCustomFilters[filter.columnId] || 'all'}
                          onValueChange={(value) =>
                            setSelectedCustomFilters((prev) => ({ ...prev, [filter.columnId]: value }))
                          }
                        >
                          <SelectTrigger className="w-40 bg-[var(--color-table-header-bg)]">
                            <SelectValue placeholder={filter.columnName} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All {filter.columnName}</SelectItem>
                            {filter.options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )
                )}

                {/* Actions */}
                {(statusFilterConfig?.enabled ||
                  roleFilterConfig?.enabled ||
                  (config.filters.customFilters && config.filters.customFilters.some((f) => f.enabled))) && (
                  <div className="flex flex-col gap-1">
                    {/* invisible label spacer to match the selects’ label row */}
                    <div className="h-5" />
                    <div className="flex gap-2">
                      <TooltipButton
                        variant="outline"
                        size="sm"
                        onClick={applyFilters}
                        className="h-9 w-10 p-0 bg-[var(--color-background-icon)] hover:bg-[var(--color-background-icon)]/80"
                        tooltip="Apply Filters"
                      >
                        <ArrowRightIcon className="h-4 w-4 text-[var(--color-title)]" />
                      </TooltipButton>

                      <TooltipButton
                        variant="outline"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-9 w-10 p-0 bg-[var(--color-background-icon)] hover:bg-[var(--color-background-icon)]/80"
                        tooltip="Clear All Filters"
                      >
                        <RefreshCwIcon className="h-4 w-4 text-[var(--color-title)]" />
                      </TooltipButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - Search */}
              <div className="flex items-center pt-4 gap-2">
                {/* Global Search */}
                {config.search.enabled && (
                  <div className="relative max-w-sm">
                    <Input
                      placeholder={config.search.placeholder}
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="pl-3 pr-10 bg-[var(--color-table-header-bg)]"
                    />
                    {globalFilter ? (
                      <button
                        onClick={() => setGlobalFilter('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-title)] hover:text-[var(--color-title)]/70 transition-colors cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : (
                      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-title)] pointer-events-none" />
                    )}
                  </div>
                )}
                {config.export?.enabled && (
                  <TooltipButton
                    variant="outline"
                    size="sm"
                    onClick={exportToCSV}
                    className="h-9 w-10 p-0 text-[var(--color-white)] bg-[var(--color-title)] hover:bg-[var(--color-title)] hover:opacity-90 hover:text-[var(--color-white)] transition-opacity"
                    tooltip="Download CSV"
                  >
                    <DownloadIcon className="h-4 w-4 text-[var(--color-white)]" />
                  </TooltipButton>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md shadow-sm">
          <Table className="border-collapse [&_th]:border [&_th]:border-white [&_th]:p-3 [&_th]:text-center [&_th]:bg-[var(--color-table-header-bg)] [&_th]:text-black [&_th]:font-semibold [&_th]:border-b-2 [&_th]:border-b-white [&_td]:border [&_td]:border-white [&_td]:p-3 [&_td]:text-center [&_tbody_tr:nth-child(even)]:bg-[var(--color-table-striped)] [&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:hover]:bg-[var(--color-table-striped)]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'select-none text-center',
                        // header.column.getCanSort() && 'cursor-pointer hover:bg-muted/50',
                        header.column.columnDef.meta?.headerAlign === 'left' && 'text-left',
                        header.column.columnDef.meta?.headerAlign === 'right' && 'text-right',
                        header.column.columnDef.meta?.className
                      )}
                      style={{
                        width: header.getSize() !== 150 ? header.getSize() : undefined,
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {/* {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <ChevronUpIcon
                              className={cn(
                                'h-3 w-3',
                                header.column.getIsSorted() === 'asc' ? 'text-foreground' : 'text-muted-foreground/30'
                              )}
                            />
                            <ChevronDownIcon
                              className={cn(
                                'h-3 w-3 -mt-1',
                                header.column.getIsSorted() === 'desc' ? 'text-foreground' : 'text-muted-foreground/30'
                              )}
                            />
                          </div>
                        )} */}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {config.loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-64">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Loader2 className="h-8 w-8 animate-spin text-[var(--color-title)]" />
                      <div className="text-sm font-medium text-[var(--color-title)]">Loading data...</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : config.error ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="text-sm text-destructive">{config.error}</div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => {
                  // Add error handling for individual row rendering
                  try {
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className={cn(
                          config.hover && 'hover:bg-muted/50',
                          config.striped && index % 2 === 0 && 'bg-muted/25',
                          actions.onRowClick && 'cursor-pointer',
                          config.compact && 'h-8'
                        )}
                        onClick={() => actions.onRowClick?.(row.original as T)}
                      >
                        {row.getVisibleCells().map((cell) => {
                          // Add error handling for individual cell rendering
                          try {
                            return (
                              <TableCell
                                key={cell.id}
                                className={cn(
                                  cell.column.columnDef.meta?.cellAlign === 'center' && 'text-center',
                                  cell.column.columnDef.meta?.cellAlign === 'right' && 'text-right',
                                  cell.column.columnDef.meta?.className,
                                  config.compact && 'py-2'
                                )}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            );
                          } catch (cellError) {
                            return (
                              <TableCell
                                key={cell.id}
                                className={cn(
                                  cell.column.columnDef.meta?.cellAlign === 'center' && 'text-center',
                                  cell.column.columnDef.meta?.cellAlign === 'right' && 'text-right',
                                  cell.column.columnDef.meta?.className,
                                  config.compact && 'py-2'
                                )}
                              >
                                <span className="text-destructive text-xs">Error</span>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  } catch (rowError) {
                    return (
                      <TableRow key={`error-${index}`}>
                        <TableCell colSpan={columns.length} className="text-center text-destructive text-xs">
                          Error rendering row
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {safeData.data.length === 0 ? 'No data available.' : 'No results found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        
        {config.pagination.enabled && (
        <Pagination
          table={table}
          showPageSizeSelector={config.pagination.showPageSizeSelector}
          pageSizeOptions={config.pagination.pageSizeOptions}
          rowsLabel="Rows per Page:"
        />
      )}

      </div>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-destructive">
          An error occurred while rendering the table. Please check the data format.
        </div>
      </div>
    );
  }
}
