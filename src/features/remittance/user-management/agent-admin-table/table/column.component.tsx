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
      id: 'vendorCode',
      header: 'Vendor Code',
      accessorKey: 'vendorCode',
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
      header: 'Email',
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
      header: 'Phone',
      accessorKey: 'phoneNo',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agentType',
      header: 'Agent Type',
      accessorKey: 'agentType',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agentBranchCity',
      header: 'Branch City',
      accessorKey: 'agentBranchCity',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ebixRMName',
      header: 'RM Name',
      accessorKey: 'ebixRMName',
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
      id: 'agreementValid',
      header: 'Agreement Valid',
      accessorKey: 'agreementValid',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'rbiLicenseValidity',
      header: 'RBI License Validity',
      accessorKey: 'rbiLicenseValidity',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
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
