import React, { useState } from 'react';
import { DataTable } from './data-table';
import { StatusBadge } from './status-badge';
import { ActionButtons } from './action-buttons';
import { TableColumn, TableData, UserData, TableConfig } from './types';
import { tableConfigPresets } from './config';
import { Button } from '@/components/ui/button';

// Sample data matching your design reference
const sampleUsers: UserData[] = [
  {
    id: '1',
    fullName: 'Melvin Bell',
    emailId: 'Pevijjgbo@maiillnator.com',
    phoneNo: '8085863317',
    status: 'Active',
  },
  {
    id: '2',
    fullName: 'Manojsuperchecker',
    emailId: 'manojsuperchecker@gmail.com',
    phoneNo: '5227676767',
    status: 'Inactive',
  },
  {
    id: '3',
    fullName: 'Pruthvi Checker',
    emailId: 'pruthvi@dataseedtech.com',
    phoneNo: '7795775728',
    status: 'Inactive',
  },
];

export function UserManagementTable() {
  const [users, setUsers] = useState<UserData[]>(sampleUsers);
  const [loading, setLoading] = useState(false);

  // Define columns matching your design
  const columns: TableColumn<UserData>[] = [
    {
      id: 'fullName',
      header: 'Full Name',
      accessorKey: 'fullName',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'emailId',
      header: 'Email Id',
      accessorKey: 'emailId',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'phoneNo',
      header: 'Phone No.',
      accessorKey: 'phoneNo',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      cell: ({ value }) => <StatusBadge status={value} />,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionButtons row={row} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];

  // Table configuration - static mode
  const staticConfig: Partial<TableConfig> = {
    ...tableConfigPresets.userManagement,
    paginationMode: 'static',
    search: {
      enabled: true,
      placeholder: 'Search...',
      searchMode: 'static',
    },
    filters: {
      enabled: true,
      filterMode: 'static',
      columnFilters: true,
      globalFilter: true,
    },
    loading,
  };

  // Dynamic configuration example
  const dynamicConfig: Partial<TableConfig> = {
    ...tableConfigPresets.userManagement,
    paginationMode: 'dynamic',
    search: {
      enabled: true,
      placeholder: 'Search...',
      searchMode: 'dynamic',
    },
    filters: {
      enabled: true,
      filterMode: 'dynamic',
      columnFilters: true,
      globalFilter: true,
    },
    loading,
  };

  // Current mode selector
  const [mode, setMode] = useState<'static' | 'dynamic'>('static');
  const currentConfig = mode === 'static' ? staticConfig : dynamicConfig;

  // Table data
  const tableData: TableData<UserData> = {
    data: users,
    totalCount: users.length,
    pageCount: Math.ceil(users.length / (currentConfig.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  // Action handlers
  function handleView(user: UserData) {
    alert(`Viewing user: ${user.fullName}`);
  }

  function handleEdit(user: UserData) {
    alert(`Editing user: ${user.fullName}`);
  }

  function handleDelete(user: UserData) {
    if (confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    }
  }

  function handleRowClick(user: UserData) {}

  // Dynamic table actions (when using dynamic mode)
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      // Here you would typically make an API call
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      // Here you would typically make an API call
    },
    onGlobalFilterChange: (filter: string) => {
      // Here you would typically make an API call
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      // Here you would typically make an API call
    },
    onRowClick: handleRowClick,
  };

  // Sample function to add new user
  const addSampleUser = () => {
    const newUser: UserData = {
      id: Date.now().toString(),
      fullName: `User ${users.length + 1}`,
      emailId: `user${users.length + 1}@example.com`,
      phoneNo: `99999${users.length + 1}`,
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    };
    setUsers((prev) => [...prev, newUser]);
  };

  // Export function
  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage your users and their access levels</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mode:</span>
            <Button variant={mode === 'static' ? 'default' : 'outline'} size="sm" onClick={() => setMode('static')}>
              Static
            </Button>
            <Button variant={mode === 'dynamic' ? 'default' : 'outline'} size="sm" onClick={() => setMode('dynamic')}>
              Dynamic
            </Button>
          </div>

          {/* Action buttons */}
          <Button onClick={addSampleUser} size="sm">
            Add User
          </Button>
          <Button variant="outline" onClick={handleExport} size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Status indicator */}
      <div className="rounded-lg border p-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <span className={mode === 'static' ? 'text-blue-600' : 'text-green-600'}>
              {mode === 'static' ? 'Static Filtering & Pagination' : 'Dynamic Filtering & Pagination'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Total Records:</span>
            <span>{users.length}</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={currentConfig}
        actions={tableActions}
        className="rounded-lg border"
      />
    </div>
  );
}
