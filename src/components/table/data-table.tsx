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
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { TableConfig, TableColumn, TableData, TableActions } from './types';
import { defaultTableConfig } from './config';

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

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<string>('all');
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

  // Calculate total data for static pagination with manual status filtering
  const tableData = useMemo(() => {
    let filteredData = safeData.data || [];

    // Apply manual status filtering if a specific status is applied
    if (appliedStatusFilter !== 'all' && config.filters.statusFilter?.enabled) {
      const columnId = config.filters.statusFilter?.columnId || 'status';
      filteredData = filteredData.filter((item: any) => {
        const itemValue = item[columnId];
        return itemValue === appliedStatusFilter;
      });
      console.log(`Applied filter for ${appliedStatusFilter}:`, filteredData.length, 'records');
    }

    if (config.paginationMode === 'static') {
      return filteredData;
    }
    return filteredData;
  }, [safeData.data, config.paginationMode, appliedStatusFilter, config.filters.statusFilter]);

  // Helper function to clear all filters
  const clearAllFilters = () => {
    setGlobalFilter('');
    setColumnFilters([]);
    setSelectedStatusFilter('all');
    setAppliedStatusFilter('all');
  };

  // Helper function to apply filters (for manual submission)
  const applyFilters = () => {
    // Apply the selected status filter
    setAppliedStatusFilter(selectedStatusFilter);

    if (selectedStatusFilter === 'all') {
      // Clear all filters to show all data
      setGlobalFilter('');
      setColumnFilters([]);
      console.log('Applied "All Status" filter - showing all data');
    } else {
      // Clear global filter and apply status filter
      setGlobalFilter('');
      setColumnFilters([]);

      console.log('Applied status filter:', selectedStatusFilter);
    }
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
      console.error('Error in pagination change handler:', error);
    }
  }, [pagination, config.paginationMode, actions]);

  useEffect(() => {
    try {
      if (config.sorting.sortMode === 'dynamic' && actions.onSortingChange) {
        actions.onSortingChange(sorting);
      }
    } catch (error) {
      console.error('Error in sorting change handler:', error);
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
      console.error('Error in global filter change handler:', error);
    }
    return undefined;
  }, [globalFilter, config.search.searchMode, config.search.debounceMs, actions]);

  useEffect(() => {
    try {
      if (config.filters.filterMode === 'dynamic' && actions.onColumnFiltersChange) {
        actions.onColumnFiltersChange(columnFilters);
      }
    } catch (error) {
      console.error('Error in column filters change handler:', error);
    }
  }, [columnFilters, config.filters.filterMode, actions]);

  // Render loading state
  if (config.loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Render error state
  if (config.error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-destructive">{config.error}</div>
      </div>
    );
  }

  // Wrap the entire table rendering in error boundary
  try {
    return (
      <div className={cn('space-y-4 mb-20', className)}>
        {/* Search and Filters Header */}
        {(config.search.enabled || config.filters.enabled) && (
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Filters */}
            <div className="flex items-center gap-2">
              {/* Status Filter */}
              {config.filters.statusFilter?.enabled && (
                <>
                  <div className="relative">
                    <Select
                      value={selectedStatusFilter}
                      onValueChange={(value) => {
                        setSelectedStatusFilter(value);
                      }}
                    >
                      <SelectTrigger className="w-32 bg-[#ECEEFF] border-[#ECEEFF]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        {config.filters.statusFilter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Arrow Right Button for Filter Submission */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={applyFilters}
                    className="h-9 w-9 p-0 bg-[#ECEEFF] hover:bg-[#ECEEFF]/80 border-[#ECEEFF]"
                    title="Apply Filters"
                  >
                    <ArrowRightIcon className="h-4 w-4 text-[#2C81E8]" />
                  </Button>

                  {/* Refresh Button to Clear Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-9 w-9 p-0 bg-[#ECEEFF] hover:bg-[#ECEEFF]/80 border-[#ECEEFF]"
                    title="Clear All Filters"
                  >
                    <RefreshCwIcon className="h-4 w-4 text-[#2C81E8]" />
                  </Button>
                </>
              )}
            </div>

            {/* Right side - Search */}
            <div className="flex items-center gap-4">
              {/* Global Search */}
              {config.search.enabled && (
                <div className="relative max-w-sm">
                  <Input
                    placeholder={config.search.placeholder}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="pl-3 pr-10 bg-[#ECEEFF] border-[#ECEEFF]"
                  />
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2C81E8]" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md">
          <Table className="tanstack-table-border table-striped">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'select-none',
                        header.column.getCanSort() && 'cursor-pointer hover:bg-muted/50',
                        header.column.columnDef.meta?.headerAlign === 'center' && 'text-center',
                        header.column.columnDef.meta?.headerAlign === 'right' && 'text-right',
                        header.column.columnDef.meta?.className
                      )}
                      style={{
                        width: header.getSize() !== 150 ? header.getSize() : undefined,
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
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
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
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
                            console.error('Error rendering cell:', cellError, cell);
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
                    console.error('Error rendering row:', rowError, row);
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

        {/* Pagination */}
        {config.pagination.enabled && (
          <div className="flex items-center justify-between px-2">
            <div>{config?.export?.enabled && <Button>Export</Button>}</div>
            <div className="flex flex-1 items-center justify-end gap-5">
              <div className="flex items-center gap-2">
                {config.pagination.enabled && config.pagination.showPageSizeSelector && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Rows per page:</p>
                    <Select
                      value={table.getState().pagination.pageSize.toString()}
                      onValueChange={(value) => {
                        table.setPageSize(Number(value));
                      }}
                    >
                      <SelectTrigger className="h-8 w-16">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {config.pagination.pageSizeOptions.map((pageSize) => (
                          <SelectItem key={pageSize} value={pageSize.toString()}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronsLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronsRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering DataTable:', error);
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-destructive">
          An error occurred while rendering the table. Please check the data format.
        </div>
      </div>
    );
  }
}
