import { ActionButtons, TableColumn } from '@/components/table';
import { DocumentData } from '../types/document.types';

const GetDocumentMasterTableColumns = ({
  handleEdit,
  handleInactivate,
}: {
  handleEdit: (document: DocumentData) => void;
  handleInactivate: (document: DocumentData) => void;
}): TableColumn<DocumentData>[] => {
  return [
    {
      id: 'name',
      header: 'Document Name',
      accessorKey: 'name',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
     {
      id: 'is_backrequired',
      header: 'Back Required',
      accessorKey: 'is_backrequired',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionButtons row={row} onEdit={handleEdit} onInactivate={handleInactivate} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];
};

export default GetDocumentMasterTableColumns;