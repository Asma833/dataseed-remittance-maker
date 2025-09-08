import { useState } from 'react';
import GetAgentListTableColumns from './column.component';
import { UserData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, dynamicConfig, staticConfig, TableConfig, tableConfigPresets, TableData } from '@/components/table';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';
import { queryKeys } from '@/core/constant/query-keys';
import { User } from '@/features/auth/types/auth.types';

const AgentAdminTable = () => {
  const [loading, setLoading] = useState(false);

  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useGetData<User[]>({
    endpoint: API.NUSERS.USER.LIST,
    queryKey: queryKeys.user.allUsers,
    dataPath: '',
  });

  // Define columns matching your design
  const columns = GetAgentListTableColumns({
    handleView,
    handleEdit,
    handleDelete,
  });

  // Current mode selector
  const [mode, setMode] = useState<'static' | 'dynamic'>('static');

  // Table data
  // const tableData: TableData<UserData> = {
  //   data: users,
  //   totalCount: users.length,
  //   pageCount: Math.ceil(users.length / (currentConfig.pagination?.pageSize || 10)),
  //   currentPage: 1,
  // };

  // Action handlers
  function handleView(user: UserData) {
    //console.log('View user:', user);
    alert(`Viewing user: ${user.fullName}`);
  }

  function handleEdit(user: UserData) {
    //console.log('Edit user:', user);
    alert(`Editing user: ${user.fullName}`);
  }

  function handleDelete(user: UserData) {
    //console.log('Delete user:', user);
    if (confirm(`Are you sure you want to delete ${user.fullName}?`)) {
    }
  }

  function handleRowClick(user: UserData) {
    //console.log('Row clicked:', user);
  }

  // Dynamic table actions (when using dynamic mode)
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      //console.log('Pagination changed:', pagination);
      // Here you would typically make an API call
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      //console.log('Sorting changed:', sorting);
      // Here you would typically make an API call
    },
    onGlobalFilterChange: (filter: string) => {
      //console.log('Global filter changed:', filter);
      // Here you would typically make an API call
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      //console.log('Column filters changed:', filters);
      // Here you would typically make an API call
    },
    onRowClick: handleRowClick,
  };

  //console.log('Fetched users:', data, userLoading, userError);
  //console.log('Type of data:', typeof data);
  const valuesArray = Object.values(data || {});
  //console.log('valuesArray:', valuesArray);
  //console.log('Type of valuesArray:', typeof valuesArray);
  //console.log('Type of valuesArray:', typeof ['a', 'b']);

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">User Management</h2>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={(valuesArray as any) ?? []}
        config={{
          ...staticConfig,
          export: { enabled: true, fileName: 'agent-admins.csv', includeHeaders: true },
        }}
        actions={tableActions}
      />
    </div>
  );
};

export default AgentAdminTable;
