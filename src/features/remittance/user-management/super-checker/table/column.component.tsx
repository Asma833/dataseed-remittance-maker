import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { SuperCheckerData } from './types';

const GetSuperCheckerTableColumns = ({
  handleEdit
}: {
  handleEdit: (user: SuperCheckerData) => void;
}): TableColumn<SuperCheckerData>[] => {
  return [
    {
      id: 'full_name',
      header: 'Full Name',
      accessorKey: 'full_name',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value == null || value === '' ? '-' : value,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value == null || value === '' ? '-' : value,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'phone_number',
      header: 'Phone No.',
      accessorKey: 'phone_number',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value == null || value === '' ? '-' : value,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'product_types',
      header: 'Product Types',
      accessorKey: 'product_types',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value && value.length > 0 ? value.join(', ') : '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'is_active',
      header: 'Status',
      accessorKey: 'is_active',
      sortable: true,
      filterable: true,
      cell: ({ value }) => <StatusBadge status={value ? 'Active' : 'Inactive'} />,
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