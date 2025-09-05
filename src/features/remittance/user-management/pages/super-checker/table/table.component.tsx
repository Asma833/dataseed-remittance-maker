import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetSuperCheckerTableColumns from './column.component';
import { SuperCheckerData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { ROUTES } from '@/core/constant/route-paths';

// Sample data matching the screenshot columns
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

const SuperCheckerTable = () => {
  const navigate = useNavigate();
  const [superCheckers, setSuperCheckers] = useState<SuperCheckerData[]>(sampleSuperCheckers);
  const [loading, setLoading] = useState(false);

  // Define columns matching the screenshot
  const columns = GetSuperCheckerTableColumns({
    handleEdit,
  });

  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search super checkers...',
      enabled: true,
      searchMode: 'static' as const,
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


  function handleEdit(superChecker: SuperCheckerData) {
    console.log('Edit super checker:', superChecker);
    alert(`Editing super checker: ${superChecker.fullName}`);
  }

  function handleRowClick(superChecker: SuperCheckerData) {
    console.log('Row clicked:', superChecker);
  }

  // Dynamic table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      console.log('Pagination changed:', pagination);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      console.log('Sorting changed:', sorting);
    },
    onGlobalFilterChange: (filter: string) => {
      console.log('Global filter changed:', filter);
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      console.log('Column filters changed:', filters);
    },
    onRowClick: handleRowClick,
  };

  // Navigate to super checker creation page
  const handleAddSuperChecker = () => {
    navigate('/admin/users/super-checker-creation');
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Dataseed Super Checker</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleAddSuperChecker} size="sm">
            Add Super Checker
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={config}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default SuperCheckerTable;