import { ActionButtons, TableColumn } from '@/components/table';
import { CardData } from './types';

const GetCardTableColumns = ({
  handleEdit
}: {
  handleEdit: (card: CardData) => void;
}): TableColumn<CardData>[] => {
  return [
    {
      id: 'sno',
      header: 'Sl.No',
      accessorKey: 'sno',
      sortable: true,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
    {
      id: 'currency',
      header: 'Currency',
      accessorKey: 'currency',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'working_10_12',
      header: 'Working 10-12',
      accessorKey: 'working_10_12',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'working_12_02',
      header: 'Working 12-02',
      accessorKey: 'working_12_02',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'working_02_3_30',
      header: 'Working 02-3.30',
      accessorKey: 'working_02_3_30',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'workingEnd',
      header: 'Working End',
      accessorKey: 'workingEnd',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttHolidayMargin',
      header: 'TT Holiday Margin',
      accessorKey: 'ttHolidayMargin',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttweekendMargin',
      header: 'TT Weekend Margin',
      accessorKey: 'ttweekendMargin',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'upperCircuit',
      header: 'Upper Circuit',
      accessorKey: 'upperCircuit',
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

export default GetCardTableColumns;