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
import DynamicTabs from '@/components/remittance/dynamic-tabs';
import { dummyPurposeData } from '../data/dummy-purpose-data';

const PurposeMasterTablePage = () => {
  const navigate = useNavigate();
  // const { data, isLoading, error, refetch } = useGetData({
  //   endpoint: API.PURPOSE.GET_PURPOSES,
  //   queryKey: ['getPurposeList'],
  // });

  const [purposes, setPurposes] = useState<PurposeData[]>([]);
  const [activeTab, setActiveTab] = useState<string>('card');
  const formattedDataArray = dummyPurposeData;
  // const formattedDataArray = useMemo(() => {
  //   if (!data) return [];

  //   // Check if data has a 'data' property (API response structure)
  //   if (data && typeof data === 'object' && 'data' in data) {
  //     const apiData = data.data;
  //     if (Array.isArray(apiData)) {
  //       return apiData.filter((item) => item != null);
  //     }
  //   }

  //   // Fallback: if data is directly an array
  //   if (Array.isArray(data)) {
  //     return data.filter((item) => item != null);
  //   }

  //   return [];
  // }, [data]);

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
    },
    loading: false,
  };

  // Filter data based on active tab
  const filteredData = useMemo(() => {
    if (!formattedDataArray.length) return [];

    switch (activeTab) {
      case 'card':
        return formattedDataArray.filter((item: PurposeData) =>
          item.mappedTransactionTypes?.includes('card') || item.purpose_name?.toLowerCase().includes('card')
        );
      case 'currency':
        return formattedDataArray.filter((item: PurposeData) =>
          item.mappedTransactionTypes?.includes('currency') || item.purpose_name?.toLowerCase().includes('currency')
        );
      case 'remittance':
        return formattedDataArray.filter((item: PurposeData) =>
          item.mappedTransactionTypes?.includes('remittance') || item.purpose_name?.toLowerCase().includes('remittance')
        );
      default:
        return formattedDataArray;
    }
  }, [formattedDataArray, activeTab]);

  // Table data
  const tableData: TableData<PurposeData> = {
    data: filteredData,
    totalCount: filteredData.length,
    pageCount: Math.ceil(filteredData.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (purpose: PurposeData) => {
    navigate('/admin/master/purpose-master/update/:id', { state: { purpose } });
  };

  const handleDelete = (purpose: PurposeData) => {
    // Implement delete functionality
  };

  const handleInactivate = (purpose: PurposeData) => {
    // Implement inactivate functionality
  };

  const handleCreatePurpose = () => {
    navigate('/admin/master/purpose-master/add-purpose');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Define tabs for filtering
  const tabs = [
    { value: 'card', label: 'Card' },
    { value: 'currency', label: 'Currency' },
    { value: 'remittance', label: 'Remittance' },
  ];

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
    handleInactivate,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with Create Button */}
     
      <div className="flex justify-between items-center">
          <TableTitle title="Purpose Master" />
        <Button onClick={handleCreatePurpose} className="bg-primary text-white hover:bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Purpose
        </Button>
      </div>

     <DataTable
       columns={columns}
       data={tableData}
       config={{
         ...config,
         export: {
           enabled: true,
           fileName: 'purpose-master-data.csv',
           includeHeaders: true,
         },
         tabFilters: {
           enabled: true,
           tabs: tabs,
           defaultValue: activeTab,
           onTabChange: handleTabChange,
         },
       }}
       actions={tableActions}
       className="rounded-lg"
     />
    </div>
  );
};

export default PurposeMasterTablePage;
