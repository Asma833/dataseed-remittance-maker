import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetBranchAgentTableColumns from './column.component';
import { BranchAgentData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle, UploadIcon } from 'lucide-react';
import { TableTitle } from '@/features/auth/components/table-title';
import { useGetBranchAgents } from '../../hooks/useGetBranchAgents';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useAlert } from '@/hooks/useAlert';

const BranchAgentTable = () => {
  const navigate = useNavigate();
  const { data: branchAgents = [], isLoading } = useGetBranchAgents();
  const { deleteUser, isPending: deletePending } = useDeleteUser();
  const { showAlert } = useAlert();

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
        //   statusFilter: {
        //   enabled: true,
        //   options: [
        //     { value: 'Active', label: 'Active' },
        //     { value: 'Inactive', label: 'Inactive' },
        //   ],
        //   columnId: 'is_active',
        //   columnName:'Status'
        // },
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
    navigate('/admin/user-management/branch-agent-creation', { state: { branchAgent } });
  };

  const handleDelete = async (branchAgent: BranchAgentData) => {
    if (window.confirm(`Are you sure you want to delete ${branchAgent.full_name}?`)) {
      try {
        await deleteUser(branchAgent.id!);
        showAlert({
          title: 'Branch Agent deleted successfully',
          description: 'The branch agent has been removed from the system.',
        });
      } catch (error) {
        showAlert({
          title: 'Failed to delete Branch Agent',
          description: 'An error occurred while deleting the branch agent.',
        });
      }
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
    navigate('/admin/user-management/branch-agent-creation');
  };

  // Handle bulk upload
  const handleBulkUpload = () => {
    // TODO: Implement bulk upload functionality
  };

  // Define columns matching the requirements
  const columns = GetBranchAgentTableColumns({
    handleEdit,
    handleDelete,
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
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default BranchAgentTable;
