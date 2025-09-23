import { ActionButtons, TableColumn } from '@/components/table';
import { CurrencyData } from './types';

const GetCurrencyTableColumns = ({
  handleEdit
}: {
  handleEdit: (currency: CurrencyData) => void;
}): TableColumn<CurrencyData>[] => {
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
      id: 'ttMargin10_12',
      header: 'TT Margin 10-12',
      accessorKey: 'ttMargin10_12',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttMargin12_02',
      header: 'TT Margin 12-02',
      accessorKey: 'ttMargin12_02',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttMargin02_3_30',
      header: 'TT Margin 02-3.30',
      accessorKey: 'ttMargin02_3_30',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttMargin03_30end',
      header: 'TT Margin 03-30 End',
      accessorKey: 'ttMargin03_30end',
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
      id: 'ttWeekendMargin',
      header: 'TT Weekend Margin',
      accessorKey: 'ttWeekendMargin',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ttUpperCircuit',
      header: 'TT Upper Circuit',
      accessorKey: 'ttUpperCircuit',
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

export default GetCurrencyTableColumns;