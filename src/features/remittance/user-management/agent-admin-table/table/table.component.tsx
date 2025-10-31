import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetAgentListTableColumns from './column.component';
import { AgentAdminData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, dynamicConfig, staticConfig, TableConfig, tableConfigPresets, TableData } from '@/components/table';
import { useGetAgentAdmins } from '../../hooks/useGetAgentAdmins';
import { getNavPath, ROUTES } from '@/core/constant/route-paths';
import { TableTitle } from '@/features/auth/components/table-title';
import { PlusCircle } from 'lucide-react';
import { useCurrentUser } from '@/utils/getUserFromRedux';

const AgentAdminTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getUserRole } = useCurrentUser();
  const userRole = getUserRole();

  // Navigate to agent admin creation page
  const handleAddAdminAgents = () => {
    navigate(
      getNavPath(userRole?.toUpperCase() as 'ADMIN' | 'BRANCH_AGENT_CHECKER', `/user-management/agent-admin/agent-admin-creation`
      )
    );
  };

  const { data, isLoading: userLoading, error: userError } = useGetAgentAdmins();
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
            { value: 'ADI', label: 'ADI' },
            { value: 'ADII', label: 'ADII' },
            { value: 'FFMC', label: 'FFMC' },
            { value: 'Referral', label: 'Referral' },
          ],
          columnId: 'agent_type',
          columnName: 'Agent Type',
        },
        statusFilter: {
          enabled: true,
          options: [
            { value: 'ACTIVE', label: 'Active' },
            { value: 'INACTIVE', label: 'Inactive' },
          ],
          columnId: 'status',
          columnName: 'Status',
        },
      },
    },
    loading: userLoading,
  };

  const handleEdit = (user: AgentAdminData) => {
    navigate(
      getNavPath(
        userRole?.toUpperCase() as 'ADMIN' | 'BRANCH_AGENT_CHECKER',
        `/user-management/agent-admin/agent-admin-creation`
      ),
      { state: { editData: user } }
    );
  };

  // Define columns matching your design
  const columns = GetAgentListTableColumns({
    handleEdit,
  });

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
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <TableTitle title="Admin Agent List" />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddAdminAgents} size="sm">
            <PlusCircle className="h-4 w-4" />
            Create Admin Agent
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data ?? []}
        config={{
          ...config,
          export: { enabled: true, fileName: 'admin-agent.csv', includeHeaders: true },
        }}
        actions={tableActions}
      />
    </div>
  );
};

export default AgentAdminTable;
