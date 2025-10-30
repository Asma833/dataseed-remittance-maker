import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSuperCheckerTableColumns from './column.component';
import { SuperCheckerData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle } from 'lucide-react';
import { TableTitle } from '@/features/auth/components/table-title';
import { useGetSuperCheckers } from '../../hooks/useGetSuperCheckers';
import { useInactiveUser } from '../../hooks/useInactiveUser';
import { ROUTES, getNavPath } from '@/core/constant/route-paths';
import { useCurrentUser } from '@/utils/getUserFromRedux';

const SuperCheckerTable = () => {
  const navigate = useNavigate();
  const { data: superCheckers = [], isLoading: loading, error } = useGetSuperCheckers();
  const { inactiveUser, isPending: deletePending } = useInactiveUser();
  const { getUserRole } = useCurrentUser();
   const userRole = getUserRole();
  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search...',
      enabled: true,
      searchMode: 'static' as const,
    },
    filters: {
      ...staticConfig.filters,
      enabled: true,
      filterMode: 'static' as const,
      columnFilters: true,
      globalFilter: true,
      statusFilter: {
        enabled: true,
        options: [
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' },
        ],
        columnId: 'is_active',
        columnName: 'Status',
      },
    },
    loading,
  };

  // Table data
  const tableData: TableData<SuperCheckerData> = {
    data: superCheckers,
    totalCount: superCheckers.length,
    pageCount: 1, // Assuming all data is loaded at once
    currentPage: 1,
  };

  const handleEdit = (superChecker: SuperCheckerData) => {
    navigate(getNavPath(userRole?.toUpperCase() as 'ADMIN' | 'BRANCH_AGENT_CHECKER', ROUTES.ADMIN.USER_MANAGEMENT.SUPER_CHECKER_CREATION), { state: { superChecker } });
  };

  const handleInacivate = async (superChecker: SuperCheckerData) => {
    if (`${superChecker.full_name}?`) {
      try {
        await inactiveUser(superChecker.id);
      } catch (error) {
      }
    }
  };

  // Dynamic table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      // Pagination change handled by hook
    },

    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {},
    onGlobalFilterChange: (filter: string) => {},
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {},
  };

  // Navigate to super checker creation page
  const handleAddSuperChecker = () => {
   
    navigate(getNavPath(userRole?.toUpperCase() as 'ADMIN' | 'BRANCH_AGENT_CHECKER', `/user-management/super-checker-table/super-checker-creation`));
  };
  // Define columns matching the screenshot
  const columns = GetSuperCheckerTableColumns({
    handleEdit,
    handleInacivate,
  });
  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <TableTitle title="Super Checker List" />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddSuperChecker} size="sm">
            <PlusCircle className="h-4 w-4" />
            Create Checker
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
          export: { enabled: true, fileName: 'super-checkers.csv', includeHeaders: true },
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default SuperCheckerTable;
