import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { BranchAgentData } from './types';

const GetBranchAgentTableColumns = ({
  handleEdit,
}: {
  handleEdit: (user: BranchAgentData) => void;
}): TableColumn<BranchAgentData>[] => {
  return [
    {
      id: 'agent_vendor_code',
      header: 'Agent Vendor Code',
      accessorKey: 'agent_vendor_code',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agent_entity_name',
      header: 'Agent Entity Name',
      accessorKey: 'agent_entity_name',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'full_name',
      header: 'Full Name',
      accessorKey: 'full_name',
      sortable: true,
      filterable: true,
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
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
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

export default GetBranchAgentTableColumns;
