import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { BranchAgentData } from './types';

const GetBranchAgentTableColumns = ({
  handleEdit
}: {
  handleEdit: (user: BranchAgentData) => void;
}): TableColumn<BranchAgentData>[] => {
  return [
    {
      id: 'agentVendorCode',
      header: 'Agent Vendor Code',
      accessorKey: 'agentVendorCode',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agentEntityName',
      header: 'Agent Entity Name',
      accessorKey: 'agentEntityName',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
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
      header: 'Email ID',
      accessorKey: 'emailId',
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
      id: 'phoneNo',
      header: 'Phone No',
      accessorKey: 'phoneNo',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'checker',
      header: 'Checker',
      accessorKey: 'checker',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'branch',
      header: 'Branch',
      accessorKey: 'branch',
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