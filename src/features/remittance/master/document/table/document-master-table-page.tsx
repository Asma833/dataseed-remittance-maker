import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetDocumentMasterTableColumns from './document-master-table-column';
import { DocumentData } from '../types/document.types';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TableTitle } from '@/features/auth/components/table-title';
import { useGetDocuments } from '../hooks/useGetDocuments';
import { DocumentCreationDialog } from '../form/document-creation-dialog';

const DocumentMasterTablePage = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);

  // Fetch documents from API
  const { data: apiDocuments = [], isLoading: isLoadingDocuments } = useGetDocuments();
  // Use API data if available
  const documents = apiDocuments.length > 0 ? apiDocuments : [];

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
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const handleInactivate = (document: DocumentData) => {
    // Implement inactivate functionality
    // console.log('Inactivate document:', document);
  };

  const handleCreateDocument = () => {
    setSelectedDocument(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedDocument(null);
  };

  const handleDocumentCreated = (newDocument: DocumentData) => {
    // Handle successful document creation/editing
    // TODO: Refresh table data or update local state
    setIsDialogOpen(false);
    setSelectedDocument(null);
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

      {/* Document Creation Dialog */}
      <DocumentCreationDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        editData={selectedDocument}
        onEdit={handleDocumentCreated}
      />
    </div>
  );
};

export default DocumentMasterTablePage;
