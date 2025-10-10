import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetPurposeMasterTableColumns from './purpose-master-table-column';
import { PurposeData } from '@/features/admin/types/purpose.types';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';
import { FormTitle } from '@/features/auth/components/form-title';
import { TableTitle } from '@/features/auth/components/table-title';

const PurposeMasterTablePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetData({
    endpoint: API.PURPOSE.GET_PURPOSES,
    queryKey: ['getPurposeList'],
  });

  const [purposes, setPurposes] = useState<PurposeData[]>([]);

  const formattedDataArray = useMemo(() => {
    if (!data) return [];

    // Check if data has a 'data' property (API response structure)
    if (data && typeof data === 'object' && 'data' in data) {
      const apiData = data.data;
      if (Array.isArray(apiData)) {
        return apiData.filter((item) => item != null);
      }
    }

    // Fallback: if data is directly an array
    if (Array.isArray(data)) {
      return data.filter((item) => item != null);
    }

    return [];
  }, [data]);

  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search purposes...',
      enabled: true,
      searchMode: 'static' as const,
    },
    filters: {
      ...staticConfig.filters,
      enabled: true,
      filterMode: 'static' as const,
      columnFilters: true,
      globalFilter: true,
    },
    loading: isLoading,
  };

  // Table data
  const tableData: TableData<PurposeData> = {
    data: formattedDataArray,
    totalCount: formattedDataArray.length,
    pageCount: Math.ceil(formattedDataArray.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (purpose: PurposeData) => {
    navigate('/admin/master/purpose-master/update/:id', { state: { purpose } });
  };

  const handleDelete = (purpose: PurposeData) => {
    // Implement delete functionality
  };

  const handleCreatePurpose = () => {
    navigate('/admin/master/purpose-master/add-purpose');
  };

  // Table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      // Handle pagination
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      // Handle sorting
    },
    onGlobalFilterChange: (filter: string) => {
      // Handle global filter
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      // Handle column filters
    },
  };

  // Define columns
  const columns = GetPurposeMasterTableColumns({
    handleEdit,
    handleDelete,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <TableTitle title="Purpose Master"/>
        <Button onClick={handleCreatePurpose} className="bg-primary text-white hover:bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Purpose
        </Button>
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

export default PurposeMasterTablePage;
