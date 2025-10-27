import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetDocumentMasterTableColumns from './document-master-table-column';
import { DocumentData } from '../types/document.types';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FormTitle } from '@/features/auth/components/form-title';
import { TableTitle } from '@/features/auth/components/table-title';
import { dummyDocumentData } from '../data/dummy-document-data';
import { useGetDocuments } from '../hooks/useGetDocuments';

const DocumentMasterTablePage = () => {
  const navigate = useNavigate();

  // Fetch documents from API
  const { data: apiDocuments = [], isLoading: isLoadingDocuments } = useGetDocuments();

  // Use API data if available, otherwise fallback to dummy data
  const documents = apiDocuments.length > 0 ? apiDocuments : dummyDocumentData;

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
    loading: isLoadingDocuments,
  };

  // Table data
  const tableData: TableData<DocumentData> = {
    data: documents,
    totalCount: documents.length,
    pageCount: Math.ceil(documents.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (document: DocumentData) => {
    navigate('/admin/master/document-master/update/:id', { state: { document } });
  };

  const handleInactivate = (document: DocumentData) => {
    // Implement inactivate functionality
    console.log('Inactivate document:', document);
  };

  const handleCreateDocument = () => {
    navigate('/admin/master/document-master/add-document');
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
  const columns = GetDocumentMasterTableColumns({
    handleEdit,
    handleInactivate,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <TableTitle title="Document Master" />
        <Button onClick={handleCreateDocument} className="bg-primary text-white hover:bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
          export: {
            enabled: true,
            fileName: 'document-master-data.csv',
            includeHeaders: true,
          },
        }}
        actions={tableActions}
        className="rounded-lg"
      />
    </div>
  );
};

export default DocumentMasterTablePage;