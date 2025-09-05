import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { SuperCheckerData } from './types';

const GetSuperCheckerTableColumns = ({
  handleView,
  handleEdit,
  handleDelete,
}: {
  handleView: (user: SuperCheckerData) => void;
  handleEdit: (user: SuperCheckerData) => void;
  handleDelete: (user: SuperCheckerData) => void;
}): TableColumn<SuperCheckerData>[] => {
  return [
    {
      id: 'fullName',
      header: 'Full Name',
      accessorKey: 'fullName',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'emailId',
      header: 'Email Id',
      accessorKey: 'emailId',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'phoneNo',
      header: 'Phone No.',
      accessorKey: 'phoneNo',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'productType',
      header: 'Product Type',
      accessorKey: 'productType',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'productSubType',
      header: 'Product Sub Type',
      accessorKey: 'productSubType',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      filterable: true,
      cell: ({ value }) => <StatusBadge status={value} />,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionButtons row={row}  onEdit={handleEdit} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];
};

export default GetSuperCheckerTableColumns;