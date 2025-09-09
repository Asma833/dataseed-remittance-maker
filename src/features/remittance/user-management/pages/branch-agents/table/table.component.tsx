import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetBranchAgentTableColumns from './column.component';
import { BranchAgentData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusIcon, UploadIcon } from 'lucide-react';

const sampleBranchAgents: BranchAgentData[] = [
  {
    id: '1',
    agentVendorCode: 'AVC001',
    agentEntityName: 'ABC Financial Services',
    fullName: 'John Doe',
    emailId: 'john.doe@abc.com',
    role: 'Branch Manager',
    phoneNo: '9876543210',
    checker: 'Jane Smith',
    branch: 'Mumbai Central',
    status: 'Active',
  },
  {
    id: '2',
    agentVendorCode: 'AVC002',
    agentEntityName: 'XYZ Money Transfer',
    fullName: 'Mike Johnson',
    emailId: 'mike.johnson@xyz.com',
    role: 'Agent',
    phoneNo: '9876543211',
    checker: 'Bob Wilson',
    branch: 'Delhi North',
    status: 'Active',
  },
  {
    id: '3',
    agentVendorCode: 'AVC003',
    agentEntityName: 'Global Remittance Ltd',
    fullName: 'Sarah Davis',
    emailId: 'sarah.davis@global.com',
    role: 'Senior Agent',
    phoneNo: '9876543212',
    checker: 'Alice Brown',
    branch: 'Bangalore South',
    status: 'Inactive',
  },
];

const BranchAgentTable = () => {
  const navigate = useNavigate();
  const [branchAgents, setBranchAgents] = useState<BranchAgentData[]>(sampleBranchAgents);
  const [loading, setLoading] = useState(false);

  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search branch agents...',
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
        columnId: 'status',
      },
    },
    loading,
  };

  // Table data
  const tableData: TableData<BranchAgentData> = {
    data: branchAgents,
    totalCount: branchAgents.length,
    pageCount: Math.ceil(branchAgents.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (branchAgent: BranchAgentData) => {
    navigate('/admin/users/branch-agent-creation', { state: { branchAgent } });
  };

  // Dynamic table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },

    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      //console.log('Sorting changed:', sorting);
    },
    onGlobalFilterChange: (filter: string) => {
      //console.log('Global filter changed:', filter);
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      //console.log('Column filters changed:', filters);
    },
  };

  // Navigate to branch agent creation page
  const handleCreateBranchAgent = () => {
    navigate('/admin/users/branch-agent-creation');
  };

  // Handle bulk upload
  const handleBulkUpload = () => {
    // TODO: Implement bulk upload functionality
    console.log('Bulk upload clicked');
  };

  // Define columns matching the requirements
  const columns = GetBranchAgentTableColumns({
    handleEdit,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Branch Agents</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleBulkUpload} variant="outline" size="sm">
            <UploadIcon className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          <Button onClick={handleCreateBranchAgent} size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
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
          export: { enabled: true, fileName: 'branch-agents.csv', includeHeaders: true },
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default BranchAgentTable;