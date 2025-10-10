// Utility functions for DataTable error handling and data validation

import { TableData } from './types';

/**
 * Validates and sanitizes data for DataTable component
 * @param data - The data to validate (can be array, object, or any other type)
 * @returns Sanitized TableData object
 */
export function validateTableData<T>(data: any): TableData<T> {
  // Handle null or undefined
  if (data === null || data === undefined) {
    console.warn('DataTable: Received null or undefined data, using empty array');
    return {
      data: [],
      totalCount: 0,
      pageCount: 1,
      currentPage: 1,
    };
  }

  // Handle direct array input (legacy support)
  if (Array.isArray(data)) {
    return {
      data: data,
      totalCount: data.length,
      pageCount: Math.ceil(data.length / 10), // Assuming default page size of 10
      currentPage: 1,
    };
  }

  // Handle object input
  if (typeof data === 'object') {
    const result: TableData<T> = {
      data: [],
      totalCount: 0,
      pageCount: 1,
      currentPage: 1,
    };

    // Validate data.data property
    if (Array.isArray(data.data)) {
      result.data = data.data;
    } else if (data.data === null || data.data === undefined) {
      console.warn('DataTable: data.data is null or undefined, using empty array');
      result.data = [];
    } else {
      console.error('DataTable: data.data should be an array, received:', typeof data.data);
      result.data = [];
    }

    // Validate totalCount
    if (typeof data.totalCount === 'number' && data.totalCount >= 0) {
      result.totalCount = data.totalCount;
    } else {
      result.totalCount = result.data.length;
    }

    // Validate pageCount
    if (typeof data.pageCount === 'number' && data.pageCount >= 1) {
      result.pageCount = data.pageCount;
    } else {
      result.pageCount = Math.ceil((result.totalCount || 0) / 10); // Assuming default page size of 10
    }

    // Validate currentPage
    if (typeof data.currentPage === 'number' && data.currentPage >= 1) {
      result.currentPage = Math.min(data.currentPage, result.pageCount || 1);
    } else {
      result.currentPage = 1;
    }

    return result;
  }

  // Handle primitive types or other invalid inputs
  console.error('DataTable: Invalid data type, expected array or object, received:', typeof data);
  return {
    data: [],
    totalCount: 0,
    pageCount: 1,
    currentPage: 1,
  };
}

/**
 * Validates table columns
 * @param columns - The columns array to validate
 * @returns Boolean indicating if columns are valid
 */
export function validateTableColumns<T>(columns: any): columns is import('./types').TableColumn<T>[] {
  if (!Array.isArray(columns)) {
    console.error('DataTable: columns must be an array');
    return false;
  }

  if (columns.length === 0) {
    console.error('DataTable: columns array cannot be empty');
    return false;
  }

  // Check each column for required properties
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    if (!column || typeof column !== 'object') {
      console.error(`DataTable: column at index ${i} must be an object`);
      return false;
    }

    if (!column.id || typeof column.id !== 'string') {
      console.error(`DataTable: column at index ${i} must have a valid 'id' property`);
      return false;
    }

    if (!column.header || typeof column.header !== 'string') {
      console.error(`DataTable: column at index ${i} must have a valid 'header' property`);
      return false;
    }
  }

  return true;
}

/**
 * Creates a safe error message for display
 * @param error - The error to format
 * @returns User-friendly error message
 */
export function formatTableError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    if (error.message) {
      return `Table Error: ${error.message}`;
    }

    if (error.toString && typeof error.toString === 'function') {
      return `Table Error: ${error.toString()}`;
    }
  }

  return 'An unknown error occurred while loading the table';
}

/**
 * Creates default empty state for DataTable
 */
export function createEmptyTableData<T>(): TableData<T> {
  return {
    data: [],
    totalCount: 0,
    pageCount: 1,
    currentPage: 1,
  };
}

/**
 * Type guard to check if data is a valid TableData object
 */
export function isTableData<T>(data: any): data is TableData<T> {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.data) &&
    (data.totalCount === undefined || typeof data.totalCount === 'number') &&
    (data.pageCount === undefined || typeof data.pageCount === 'number') &&
    (data.currentPage === undefined || typeof data.currentPage === 'number')
  );
}
