import { useMemo, useState, useEffect } from 'react';
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
import CreatePurposeMasterDialog from '../form/create-purpose-master-dialog';
import { useGetTransactionTypes } from '../hooks/useGetTransactionTypes';

const PurposeMasterTablePage = () => {
  const { data: transactionTypesData, isLoading: transactionTypesLoading } = useGetTransactionTypes();
  const [activeTab, setActiveTab] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<PurposeData | null>(null);

  const { data, isLoading, error, refetch } = useGetData<PurposeData[]>({
    endpoint: API.PURPOSE.GET_PURPOSES(activeTab),
    queryKey: ['getPurposeList', activeTab],
  });

  // Transform API data to match PurposeData interface
  const formattedDataArray = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: item.id,
      purpose_code: item.purpose_code,
      purpose_name: item.purpose_name,
      transaction_type_id: item.transaction_type_id,
      mapped_documents: item.documents?.map((doc: any) => doc.name) || [],
    }));
  }, [data]);

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

  // Table data
  const tableData: TableData<PurposeData> = {
    data: formattedDataArray,
    totalCount: formattedDataArray.length,
    pageCount: Math.ceil(formattedDataArray.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (purpose: PurposeData) => {
    setSelectedPurpose(purpose);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = (purpose: PurposeData) => {
    // Implement delete functionality
  };

  const handleInactivate = (purpose: PurposeData) => {
    // Implement inactivate functionality
  };

  const handleCreatePurpose = () => {
    setIsCreateDialogOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Set initial active tab when transaction types are loaded (default to Remittance)
  useEffect(() => {
    console.log(transactionTypesData, 'transactionTypesData+++++++++++');
    if (transactionTypesData && transactionTypesData.length > 0 && !activeTab) {
      const remittanceType = transactionTypesData.find(
        (type: any) => type.transaction_name.toLowerCase() === 'remittance'
      );
      if (remittanceType) {
        setActiveTab(remittanceType.transaction_type_id);
      } else if (transactionTypesData.length > 0) {
        setActiveTab(transactionTypesData[0].transaction_type_id);
      }
    }
  }, [transactionTypesData, activeTab]);

  // Define tabs for filtering based on transaction types from API
  const tabs = useMemo(() => {
    if (!transactionTypesData || !Array.isArray(transactionTypesData)) {
      return [];
    }

    const groupedTabs = transactionTypesData.reduce((acc: any[], transaction: any) => {
      const name = transaction.transaction_name.toLowerCase();

      if (name) {
        acc.push({
          value: transaction.transaction_type_id,
          label: transaction.transaction_name,
        });
      }

      return acc;
    }, []);

    return groupedTabs;
  }, [transactionTypesData]);

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
            activeTab: activeTab,
            onTabChange: handleTabChange,
          },
        }}
        actions={tableActions}
        className="rounded-lg"
      />

      <CreatePurposeMasterDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />

      <CreatePurposeMasterDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          setSelectedPurpose(null);
        }}
        isEditMode={true}
        purposeData={
          selectedPurpose
            ? {
                id: selectedPurpose.id,
                purpose_name: selectedPurpose.purpose_name,
                purpose_code: selectedPurpose.purpose_code,
                transaction_type_id: selectedPurpose.transaction_type_id || '',
              }
            : undefined
        }
      />
    </div>
  );
};

export default PurposeMasterTablePage;
