import React, { useState, useEffect } from 'react';
import { DataTable } from '../../components/table/data-table';
import { validateTableData, validateTableColumns, formatTableError, createEmptyTableData } from '../../components/table/utils';
import type { TableColumn, TableData } from '../../components/table/types';

// Example data interface
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

// Example component showing safe DataTable usage
export function SafeDataTableExample() {
  const [data, setData] = useState<TableData<User>>(createEmptyTableData<User>());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define columns with error handling
  const columns: TableColumn<User>[] = [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      sortable: true,
    },
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
  ];

  // Simulate API call with error handling
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API response - this could be undefined, malformed, etc.
      const apiResponse = await new Promise<any>((resolve) => {
        setTimeout(() => {
          // Simulate different types of responses that could cause errors
          const responses = [
            // Normal response
            {
              data: [
                { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
                { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
              ],
              totalCount: 2,
              pageCount: 1,
              currentPage: 1,
            },
            // Undefined response
            undefined,
            // Null response
            null,
            // Response with data as object instead of array
            {
              data: { message: 'This should be an array' },
              totalCount: 0,
            },
            // Response with missing data property
            {
              totalCount: 10,
              pageCount: 2,
            },
            // Response as direct array (legacy format)
            [
              { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
            ],
          ];

          // Randomly pick one of the responses to simulate various error conditions
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          resolve(randomResponse);
        }, 1000);
      });

      // Use the validation utility to ensure safe data
      const validatedData = validateTableData<User>(apiResponse);
      setData(validatedData);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(formatTableError(err));
      setData(createEmptyTableData<User>());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Validate columns before rendering
  if (!validateTableColumns<User>(columns)) {
    return (
      <div className="p-8 text-center text-red-600">
        Invalid table configuration. Please check the console for details.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Safe DataTable Example</h2>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <DataTable
        data={data}
        columns={columns}
        config={{
          loading,
          error: error,
          pagination: {
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50],
            showPageSizeSelector: true,
          },
          search: {
            enabled: true,
            placeholder: 'Search users...',
            searchMode: 'static',
          },
          sorting: {
            enabled: true,
            multiSort: false,
            sortMode: 'static',
          },
          striped: true,
          hover: true,
        }}
        actions={{
          onRowClick: (user) => {
          },
        }}
      />

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Note:</strong> This example demonstrates error-safe DataTable usage.</p>
        <p>The table handles various error conditions:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Undefined or null data</li>
          <li>Data with incorrect structure</li>
          <li>Missing data properties</li>
          <li>Non-array data.data property</li>
          <li>Legacy array format</li>
        </ul>
        <p>Click "Refresh Data" to see different scenarios (responses are randomized).</p>
      </div>
    </div>
  );
}

// Example of how to handle API errors when using the DataTable
export async function fetchUsersWithErrorHandling(): Promise<TableData<User>> {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData = await response.json();
    
    // Always validate the response data
    return validateTableData<User>(apiData);
    
  } catch (error) {
    console.error('Failed to fetch users:', error);
    
    // Return empty data instead of throwing
    return createEmptyTableData<User>();
  }
}

// Example of handling different data formats
export function handleVariousDataFormats(apiResponse: any): TableData<User> {
  // The validateTableData function handles all these cases safely:
  
  // Case 1: Normal API response
  // { data: [...], totalCount: 10, pageCount: 2, currentPage: 1 }
  
  // Case 2: Direct array (legacy)
  // [{ id: '1', name: 'John' }, ...]
  
  // Case 3: Null/undefined
  // null, undefined
  
  // Case 4: Malformed response
  // { data: 'not an array' } or { someOtherProperty: ... }
  
  return validateTableData<User>(apiResponse);
}
