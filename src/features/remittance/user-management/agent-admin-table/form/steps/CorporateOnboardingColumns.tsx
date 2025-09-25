import { ActionButtons, TableColumn } from '@/components/table';

export interface CorporateData {
  id: string;
  entityName: string;
  panNumber: string;
  dateOfIncorporation: string;
  entityType: string;
  cin: string;
  address: string;
}

const GetCorporateOnboardingColumns = ({
  handleEdit
}: {
  handleEdit: (corporate: CorporateData) => void;
}): TableColumn<CorporateData>[] => {
  return [
    {
      id: 'entityName',
      accessorKey: 'entityName',
      header: 'Entity Name',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'panNumber',
      accessorKey: 'panNumber',
      header: 'Pan Number',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'dateOfIncorporation',
      accessorKey: 'dateOfIncorporation',
      header: 'Date of Incorporation',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'entityType',
      accessorKey: 'entityType',
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