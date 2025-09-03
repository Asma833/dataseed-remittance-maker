"use client";

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
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';
import { TableConfig, TableColumn, TableData, TableActions } from './types';
import { defaultTableConfig } from './config';

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: TableData<T>;
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
  // Merge configuration
  const config = useMemo(() => ({
    ...defaultTableConfig,
    ...configOverride,
    pagination: { ...defaultTableConfig.pagination, ...configOverride.pagination },
    search: { ...defaultTableConfig.search, ...configOverride.search },
    filters: { ...defaultTableConfig.filters, ...configOverride.filters },
    sorting: { ...defaultTableConfig.sorting, ...configOverride.sorting },
    rowSelection: { ...defaultTableConfig.rowSelection, ...configOverride.rowSelection },
  }), [configOverride]);

  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: data.currentPage ? data.currentPage - 1 : 0,
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

  // Calculate total data for static pagination
  const tableData = useMemo(() => {
    if (config.paginationMode === 'static') {
      return data.data;
    }
    return data.data;
  }, [data.data, config.paginationMode]);

  // Table instance
  const tableOptions: any = {
    data: tableData,
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
    pageCount: config.paginationMode === 'dynamic' ? data.pageCount : undefined,
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

  // Handle dynamic actions
  useEffect(() => {
    if (config.paginationMode === 'dynamic' && actions.onPaginationChange) {
      actions.onPaginationChange(pagination);
    }
  }, [pagination, config.paginationMode, actions]);

  useEffect(() => {
    if (config.sorting.sortMode === 'dynamic' && actions.onSortingChange) {
      actions.onSortingChange(sorting);
    }
  }, [sorting, config.sorting.sortMode, actions]);

  useEffect(() => {
    if (config.search.searchMode === 'dynamic' && actions.onGlobalFilterChange) {
      const timeoutId = setTimeout(() => {
        actions.onGlobalFilterChange!(globalFilter);
      }, config.search.debounceMs);
      return () => clearTimeout(timeoutId);
    }
  }, [globalFilter, config.search.searchMode, config.search.debounceMs, actions]);

  useEffect(() => {
    if (config.filters.filterMode === 'dynamic' && actions.onColumnFiltersChange) {
      actions.onColumnFiltersChange(columnFilters);
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

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filters Header */}
      {(config.search.enabled || config.filters.enabled) && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Global Search */}
            {config.search.enabled && (
              <div className="relative max-w-sm">
                <Input
                  placeholder={config.search.placeholder}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-3"
                />
              </div>
            )}
          </div>
          
          {/* Additional filters can be added here */}
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
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
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
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          <ChevronUpIcon
                            className={cn(
                              'h-3 w-3',
                              header.column.getIsSorted() === 'asc'
                                ? 'text-foreground'
                                : 'text-muted-foreground/30'
                            )}
                          />
                          <ChevronDownIcon
                            className={cn(
                              'h-3 w-3 -mt-1',
                              header.column.getIsSorted() === 'desc'
                                ? 'text-foreground'
                                : 'text-muted-foreground/30'
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
              table.getRowModel().rows.map((row, index) => (
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
                  {row.getVisibleCells().map((cell) => (
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
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {config.pagination.enabled && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            {config.paginationMode === 'dynamic' && data.totalCount !== undefined ? (
              <>
                Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
                {Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.totalCount)} of{' '}
                {data.totalCount} entries
              </>
            ) : (
              <>
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{' '}
                of {table.getFilteredRowModel().rows.length} entries
              </>
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
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
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
      )}
    </div>
  );
}
