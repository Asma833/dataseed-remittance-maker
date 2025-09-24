import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { AgentAdminData } from './types';

const GetAgentListTableColumns = ({
  handleView,
  handleEdit,
  handleDelete,
}: {
  handleView: (user: AgentAdminData) => void;
  handleEdit: (user: AgentAdminData) => void;
  handleDelete: (user: AgentAdminData) => void;
}): TableColumn<AgentAdminData>[] => {
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
      id: 'systemCode',
      header: 'System Code',
      accessorKey: 'systemCode',
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
      id: 'rm',
      header: 'RM',
      accessorKey: 'rm',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agentExpiryDate',
      header: 'Agent Expiry Date',
      accessorKey: 'agentExpiryDate',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'rbiLicenseExpiryDate',
      header: 'RBI License Expiry Date',
      accessorKey: 'rbiLicenseExpiryDate',
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
      id: 'reasonForInactive',
      header: 'Reason for Inactive',
      accessorKey: 'reasonForInactive',
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
