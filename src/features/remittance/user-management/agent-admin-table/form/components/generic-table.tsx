import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TableColumn } from '@/components/table';

interface GenericTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
}

export function GenericTable<T>({ data, columns, emptyMessage = 'No data available.' }: GenericTableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="rounded-md shadow-sm">
      <Table className="border-collapse [&_th]:border [&_th]:border-white [&_th]:p-3 [&_th]:text-center [&_th]:bg-[var(--color-table-header-bg)] [&_th]:text-black [&_th]:font-semibold [&_th]:border-b-2 [&_th]:border-b-white [&_td]:border [&_td]:border-white [&_td]:p-3 [&_td]:text-center [&_tbody_tr:nth-child(even)]:bg-[var(--color-table-striped)] [&_tbody_tr:nth-child(odd)]:bg-white [&_tbody_tr:hover]:bg-[var(--color-table-striped)]">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id} className="text-center">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.id} className="text-center">
                  {col.cell
                    ? col.cell({ row: item, value: col.accessorKey ? (item as any)[col.accessorKey] : undefined })
                    : col.accessorKey
                      ? (item as any)[col.accessorKey]
                      : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
