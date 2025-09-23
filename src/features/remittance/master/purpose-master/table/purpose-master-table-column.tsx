import { ActionButtons, TableColumn } from '@/components/table';
import { PurposeData } from '@/features/admin/types/purpose.types';
import { MapPin } from 'lucide-react';

const GetPurposeMasterTableColumns = ({
  handleEdit,
  handleDelete,
}: {
  handleEdit: (purpose: PurposeData) => void;
  handleDelete: (purpose: PurposeData) => void;
}): TableColumn<PurposeData>[] => {
  return [
    {
      id: 'purposeName',
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
      id: 'purposeCode',
      header: 'Purpose Code',
      accessorKey: 'purpose_code',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'mappedTransactionTypes',
      header: 'Mapped Transaction Types',
      accessorKey: 'mappedTransactionTypes',
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'mappedTransaction',
      header: 'Mapped Transaction',
      cell: () => (
        <div className="flex justify-center">
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </div>
      ),
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionButtons row={row} onEdit={handleEdit} onDelete={handleDelete} />,
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
