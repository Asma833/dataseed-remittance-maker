import { ActionButtons, TableColumn } from '@/components/table';
import { AgentCorporate } from '../../../types/agentCorporate.types';

export type CorporateData = AgentCorporate;

const GetCorporateOnboardingColumns = ({
  handleEdit,
}: {
  handleEdit: (corporate: CorporateData) => void;
}): TableColumn<CorporateData>[] => {
  return [
    {
      id: 'entity_name',
      accessorKey: 'entity_name',
      header: 'Entity Name',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'pan_number',
      accessorKey: 'pan_number',
      header: 'Pan Number',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'date_of_incorporation',
      accessorKey: 'date_of_incorporation',
      header: 'Date of Incorporation',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'entity_type',
      accessorKey: 'entity_type',
      header: 'Entity Type',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'cin',
      accessorKey: 'cin',
      header: 'CIN',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Address',
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

export default GetCorporateOnboardingColumns;
