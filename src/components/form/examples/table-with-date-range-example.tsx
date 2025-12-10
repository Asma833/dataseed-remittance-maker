import React, { useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { TableColumn, TableData, TableConfig } from '@/components/table/types';

// Sample data interface
interface SampleData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

// Sample data
const sampleData: SampleData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: '2024-02-20T14:45:00Z',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    createdAt: '2024-03-10T09:15:00Z',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    createdAt: '2024-12-01T16:20:00Z',
    status: 'Active',
  },
];

export const TableWithDateRangeExample: React.FC = () => {
  const [data] = useState<SampleData[]>(sampleData);

  // Define table columns
  const columns: TableColumn<SampleData>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
    },
    {
      id: 'createdAt',
      header: 'Created Date',
      accessorKey: 'createdAt',
      sortable: true,
      cell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: ({ value }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // Table configuration with MuiDateRangePicker enabled
  const tableConfig: Partial<TableConfig> = {
    pagination: {
      enabled: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 20],
      showPageSizeSelector: true,
    },
    search: {
      enabled: true,
      placeholder: 'Search users...',
      searchMode: 'static',
    },
    filters: {
      enabled: true,
      filterMode: 'static',
      columnFilters: true,
      globalFilter: true,
      // Enable date range filtering with MuiDateRangePicker
      dateRangeFilter: {
        enabled: true,
        columnId: 'createdAt', // Column to filter by date
        useMuiDateRangePicker: true, // Use our custom MuiDateRangePicker
      },
      // Optional: Add status filter
      statusFilter: {
        enabled: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ],
        columnId: 'status',
        columnName: 'Status',
      },
    },
    sorting: {
      enabled: true,
      multiSort: false,
      sortMode: 'static',
    },
    export: {
      enabled: true,
      fileName: 'users-export.csv',
      includeHeaders: true,
    },
    striped: true,
    hover: true,
  };

  // Table data
  const tableData: TableData<SampleData> = {
    data: data,
    totalCount: data.length,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Table with MuiDateRangePicker Example
          </h1>
          <p className="text-gray-600 mt-2">
            This example demonstrates how to use the MuiDateRangePicker component 
            for date range filtering in data tables.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={tableData}
            config={tableConfig}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">How to Enable Date Range Filtering:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>1. Configure the table:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`const tableConfig: Partial<TableConfig> = {
  filters: {
    enabled: true,
    dateRangeFilter: {
      enabled: true,
      columnId: 'createdAt', // Column to filter by
      useMuiDateRangePicker: true, // Enable our custom picker
    },
  },
};`}
            </pre>
            
            <p><strong>2. Pass the config to DataTable:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`<DataTable
  columns={columns}
  data={tableData}
  config={tableConfig}
/>`}
            </pre>

            <p><strong>3. Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Integrated date range picker in table filters</li>
              <li>Automatic filtering based on selected date range</li>
              <li>Works with both static and dynamic filtering modes</li>
              <li>Configurable column ID for date filtering</li>
              <li>Combines with other filters (status, search, etc.)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithDateRangeExample;