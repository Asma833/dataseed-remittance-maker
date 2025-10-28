import React, { useState } from 'react';
import CreatePurposeDocumentPage from '../../document-master/form/create-purpose-document-page';
import { DocumentMappingTableConfig } from './document-mapping-table.config';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { DataTable } from '@/components/table/data-table';
import { TableTitle } from '@/features/auth/components/table-title';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
// import { useDynamicPagination } from '@/components/common/dynamic-table/hooks/useDynamicPagination';

export const PurposeDocumentsTable = () => {
  //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
  const [dialogTitle, setDialogTitle] = useState('');

  const dummyData = [
    {
      id: 1,
      selected: true,
      documentName: 'PAN Card',
      requirement: 'Mandatory',
    },
    {
      id: 2,
      selected: false,
      documentName: 'Aadhar Card',
      requirement: 'Non-mandatory',
    },
    {
      id: 3,
      selected: true,
      documentName: 'Passport',
      requirement: 'Mandatory',
    },
    {
      id: 4,
      selected: false,
      documentName: 'Driving License',
      requirement: 'Non-mandatory',
    },
    {
      id: 5,
      selected: true,
      documentName: 'Voter ID',
      requirement: 'Mandatory',
    },
  ];

  // Handle opening modal for creating purpose document
  const handleAddAdminAgents = () => {
    setIsModalOpen(true);
    setDialogTitle('Create Purpose Document');
  };

  //  const tableData = useMemo(() => {
  //    if (!data) return [];

  //    // If already an array
  //    if (Array.isArray(data)) {
  //      return (data as Order[]).filter(
  //        (item): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //      );
  //    }

  //    // If object with 'orders' property
  //    if (typeof data === 'object' && 'orders' in data) {
  //      const orders = (data as any).orders;
  //      if (Array.isArray(orders)) {
  //        return orders.filter((item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item);
  //      }
  //      if (orders && typeof orders === 'object') {
  //        return Object.values(orders).filter(
  //          (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //        );
  //      }
  //      return [];
  //    }

  //    // If object of objects
  //    if (typeof data === 'object') {
  //      return Object.values(data).filter(
  //        (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
  //      );
  //    }

  //    return [];
  //  }, [data]);

  //  // Format error message consistently
  //  const errorMessage = useMemo(() => {
  //    if (!error) return '';

  //    if (typeof error === 'string') {
  //      return error;
  //    }

  //    if (error && typeof error === 'object' && 'message' in error) {
  //      return (error as Error).message;
  //    }

  //    return 'An unexpected error occurred';
  //  }, [error]);

  const isPaginationDynamic = false;

  const columns = DocumentMappingTableConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Table configuration
  const config = {
    paginationMode: 'static' as const,
    pagination: {
      enabled: true,
      pageSize: 10,
      pageSizeOptions: [5, 10, 20, 50],
      showPageSizeSelector: true,
    },
    search: {
      placeholder: 'Search documents...',
      enabled: true,
      searchMode: 'static' as const,
    },
    filters: {
      enabled: true,
      filterMode: 'static' as const,
      columnFilters: true,
      globalFilter: true,
    },
    sorting: {
      enabled: true,
      multiSort: false,
      sortMode: 'static' as const,
    },
    rowSelection: {
      enabled: true,
      multiple: true,
    },
    export: {
      enabled: true,
      fileName: 'document-mapping.csv',
      includeHeaders: true,
    },
    loading: false,
  };

  // Table data
  const data = dummyData;

  // Table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      // Handle pagination if needed
    },
  };

  return (
  
    <div className="space-y-4 w-full">
          {/* Header with controls */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <TableTitle title="Document Mapping List" />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleAddAdminAgents} size="sm">
                <PlusCircle className="h-4 w-4" />
                Create Purpose Document
              </Button>
            </div>
          </div>
    
          {/* Data Table */}
          <DataTable
            columns={columns}
            data={data}
            config={config}
            actions={tableActions}
          />

          {/* Modal for creating purpose document */}
          <DialogWrapper
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title={dialogTitle}
            renderContent={<CreatePurposeDocumentPage setDialogTitle={setDialogTitle} />}
          />
        </div>
  );
};
