import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetBranchAgentTableColumns from './column.component';
import { BranchAgentData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle, UploadIcon } from 'lucide-react';
import { TableTitle } from '@/features/auth/components/table-title';
import { useGetBranchAgents } from '../../hooks/useGetBranchAgents';
import { useInactiveUser } from '../../hooks/useInactiveUser';

const BranchAgentTable = () => {
  const navigate = useNavigate();
  const { data: branchAgents = [], isLoading } = useGetBranchAgents();
  const { inactiveUser, isPending: deletePending } = useInactiveUser();

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
      filter: {
        roleFilter: {
          enabled: true,
          options: [
            { value: 'branch_agent_maker', label: 'Maker' },
            { value: 'branch_agent_checker', label: 'Checker' },
            { value: 'branch_agent_admin', label: 'Admin' },
          ],
          columnId: 'role',
          columnName: 'Role',
        },
          statusFilter: {
          enabled: true,
          options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ],
          columnId: 'is_active',
          columnName:'Status'
        },
      },
    },
    loading: isLoading,
  };

  // Table data
  const tableData: TableData<BranchAgentData> = {
    data: branchAgents,
    totalCount: branchAgents.length,
    pageCount: Math.ceil(branchAgents.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (branchAgent: BranchAgentData) => {
    navigate('/admin/user-management/branch-agents/branch-agent-creation', { state: { branchAgent } });
  };

  const handleInactivate = async (branchAgent: BranchAgentData) => {
    if (`${branchAgent.full_name}?`) {
     await inactiveUser(branchAgent.id!);
    }
  };

  // Dynamic table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      // Pagination handled by static config
    },

    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {},
    onGlobalFilterChange: (filter: string) => {},
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {},
  };

  // Navigate to branch agent creation page
  const handleCreateBranchAgent = () => {
    navigate('/admin/user-management/branch-agents/branch-agent-creation');
  };

  // Handle bulk upload
  const handleBulkUpload = () => {
    // TODO: Implement bulk upload functionality
  };

  // Define columns matching the requirements
  const columns = GetBranchAgentTableColumns({
    handleEdit,
    handleInactivate,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <TableTitle title="Branch Agents" />
        </div>
        <div className="flex items-center gap-2">
          {/* <Button onClick={handleBulkUpload} variant="outline" size="sm" className="btn-light">
            Bulk Upload
            <UploadIcon className="h-4 w-4 mr-2 btn-icon-primary" />
          </Button> */}
          <Button onClick={handleCreateBranchAgent} size="sm">
            <PlusCircle className="h-4 w-4" />
            Create Branch Agent
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
          export: { enabled: true, fileName: 'branch-agent.csv', includeHeaders: true },
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default BranchAgentTable;
