import { Row } from '@tanstack/react-table';
import { TableColumn } from './types';

/**
 * Export table data to CSV format
 * @param rows - Filtered rows from the table
 * @param columns - Table column definitions
 * @param options - Export options
 */
export const exportTableToCSV = <T>(
  rows: Row<T>[],
  columns: TableColumn<T>[],
  options: {
    fileName?: string;
    includeHeaders?: boolean;
  } = {}
): void => {
  try {
    if (rows.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Get column headers (exclude action columns and non-filterable columns)
    const exportableColumns = columns.filter((col) => col.id !== 'action' && col.filterable !== false);

    const headers = exportableColumns.map((col) => col.header);

    // Get row data
    const csvRows = rows.map((row) => {
      return exportableColumns
        .map((col) => {
          const rowData = row.original as any;
          const value = rowData[col.accessorKey as string];

          return formatCellValue(value);
        })
        .join(',');
    });

    // Combine headers and rows
    const csvContent = [options.includeHeaders ? headers.join(',') : null, ...csvRows].filter(Boolean).join('\n');

    // Download the CSV file
    downloadCSV(csvContent, options.fileName || 'export.csv');
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};

/**
 * Format cell value for CSV export
 * @param value - Cell value to format
 * @returns Formatted string value
 */
const formatCellValue = (value: any): string => {
  // Handle null or undefined
  if (value === null || value === undefined) {
    return '';
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return `"${value.join(', ')}"`;
  }

  // Handle booleans
  if (typeof value === 'boolean') {
    return value ? 'Active' : 'Inactive';
  }

  // Handle strings with commas or quotes
  if (typeof value === 'string') {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      // Escape quotes and wrap in quotes
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  // Handle numbers and other types
  return String(value);
};

/**
 * Download CSV content as a file
 * @param content - CSV content string
 * @param fileName - Name of the file to download
 */
const downloadCSV = (content: string, fileName: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
};
