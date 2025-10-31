import { ActionButtons, TableColumn } from '@/components/table';
import { PurposeData } from '@/features/admin/types/purpose.types';

const GetPurposeMasterTableColumns = ({
  handleEdit,
  handleDelete,
  handleInactivate,
}: {
  handleEdit: (purpose: PurposeData) => void;
  handleDelete: (purpose: PurposeData) => void;
  handleInactivate: (purpose: PurposeData) => void;
}): TableColumn<PurposeData>[] => {
  return [
    {
      id: 'purpose_name',
      header: 'Purpose Name',
      accessorKey: 'purpose_name',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'mapped_documents',
      header: 'Mapped Documents',
      accessorKey: 'mapped_documents',
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
      cell: ({ row }) => <ActionButtons row={row} onEdit={handleEdit} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];
};

export default GetPurposeMasterTableColumns;
