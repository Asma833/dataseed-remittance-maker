import { ActionButtons, StatusBadge, TableColumn } from '@/components/table';
import { AgentAdminData } from './types';

const GetAgentListTableColumns = ({
  handleEdit,
}: {
  handleEdit: (user: AgentAdminData) => void;
}): TableColumn<AgentAdminData>[] => {
  return [
    {
      id: 'agent_code',
      header: 'Agent Vendor Code',
      accessorKey: 'agent_code',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value || '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'system_code',
      header: 'System Code',
      accessorKey: 'system_code',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value || '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'entity_name',
      header: 'Agent Entity Name',
      accessorKey: 'entity_name',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value || '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'agent_type',
      header: 'Agent Type',
      accessorKey: 'agent_type',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value || '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    
    {
      id: 'rm_name',
      header: 'RM',
      accessorKey: 'rm_name',
      sortable: true,
      filterable: true,
      cell: ({ value }) => value || '-',
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },

    {
      id: 'documents.agreementValid',
      header: 'Agreement Expiry Date',
      accessorKey: 'documents',
      sortable: false,
      filterable: false,
      cell: ({ value }: { value: any }) => {
        const agreementValid = value?.agreementValid;
        return agreementValid ? new Date(agreementValid).toLocaleDateString() : '-';
      },
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'documents.rbiLicenseValidity',
      header: 'RBI License Expiry Date',
      accessorKey: 'documents',
      sortable: false,
      filterable: false,
      cell: ({ value }: { value: any }) => {
        const rbiLicenseValidity = value?.rbiLicenseValidity;
        return rbiLicenseValidity ? new Date(rbiLicenseValidity).toLocaleDateString() : '-';
      },
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
        headerAlign: 'right',
        cellAlign: 'right',
      },
    },
  ];
};

export default GetAgentListTableColumns;
