import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetAgentListTableColumns from './column.component';
import { AgentAdminData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, dynamicConfig, staticConfig, TableConfig, tableConfigPresets, TableData } from '@/components/table';
import { useGetAgentAdmins } from '../../hooks/useGetAgentAdmins';
import { ROUTES } from '@/core/constant/route-paths';
import { TableTitle } from '@/features/auth/components/table-title';
import { PlusCircle } from 'lucide-react';

const AgentAdminTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Navigate to agent admin creation page
  const handleAddAdminAgents = () => {
    navigate(`/admin${ROUTES.ADMIN.AGENT_ADMIN_CREATION}`);
  };

  

  const {
    data,
    isLoading: userLoading,
    error: userError,
  } = useGetAgentAdmins();

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
  function handleView(user: AgentAdminData) {
    //console.log('View user:', user);
    alert(`Viewing agent: ${user.agent_name}`);
  }

  function handleEdit(user: AgentAdminData) {
    //console.log('Edit user:', user);
    alert(`Editing agent: ${user.agent_name}`);
  }

  function handleDelete(user: AgentAdminData) {
    //console.log('Delete user:', user);
    if (confirm(`Are you sure you want to delete ${user.agent_name}?`)) {
    }
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
  };

  //console.log('Fetched agents:', data, userLoading, userError);

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
         <TableTitle title="Admin Agent List"/>
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
          ...staticConfig
        }}
        actions={tableActions}
      />
    </div>
  );
};

export default AgentAdminTable;
