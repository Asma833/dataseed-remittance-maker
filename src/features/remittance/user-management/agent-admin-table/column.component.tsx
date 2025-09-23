import { ActionButtons, StatusBadge, TableColumn, UserData } from '@/components/table';

const GetAgentListTableColumns = ({
  handleView,
  handleEdit,
  handleDelete,
}: {
  handleView: (user: UserData) => void;
  handleEdit: (user: UserData) => void;
  handleDelete: (user: UserData) => void;
}): TableColumn<UserData>[] => {
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
      accessorKey: 'email',
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
      id: 'status',
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
      cell: ({ row }) => <ActionButtons row={row} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'right',
        cellAlign: 'right',
      },
    },
  ];
};

export default GetAgentListTableColumns;
