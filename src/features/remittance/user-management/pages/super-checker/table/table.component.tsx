import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSuperCheckerTableColumns from './column.component';
import { SuperCheckerData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';

const sampleSuperCheckers: SuperCheckerData[] = [
  {
    id: '1',
    fullName: 'John Doe',
    emailId: 'john.doe@example.com',
    phoneNo: '9876543210',
    productType: 'Remittance',
    productSubType: 'International Transfer',
    status: 'Active',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    emailId: 'jane.smith@example.com',
    phoneNo: '9876543211',
    productType: 'Forex',
    productSubType: 'Currency Exchange',
    status: 'Inactive',
  },
  {
    id: '3',
    fullName: 'Mike Johnson',
    emailId: 'mike.johnson@example.com',
    phoneNo: '9876543212',
    productType: 'Remittance',
    productSubType: 'Domestic Transfer',
    status: 'Active',
  },
];

// Extended data with location for form editing
const extendedSuperCheckers = sampleSuperCheckers.map(item => ({
  ...item,
  location: 'Mumbai, India' // Add location field for form
}));

const SuperCheckerTable = () => {
  const navigate = useNavigate();
  const [superCheckers, setSuperCheckers] = useState<SuperCheckerData[]>(extendedSuperCheckers);
  const [loading, setLoading] = useState(false);

  

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
        columnId: 'status',
      },
    },
    loading,
  };

  // Table data
  const tableData: TableData<SuperCheckerData> = {
    data: superCheckers,
    totalCount: superCheckers.length,
    pageCount: Math.ceil(superCheckers.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };


  const handleEdit = (superChecker: SuperCheckerData) => {
    navigate('/admin/users/super-checker-creation', { state: { superChecker } });
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

  // Navigate to super checker creation page
  const handleAddSuperChecker = () => {
    navigate('/admin/users/super-checker-creation');
  };
   // Define columns matching the screenshot
  const columns = GetSuperCheckerTableColumns({
    handleEdit,
  });
  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Dataseed Super Checker</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddSuperChecker} size="sm">
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