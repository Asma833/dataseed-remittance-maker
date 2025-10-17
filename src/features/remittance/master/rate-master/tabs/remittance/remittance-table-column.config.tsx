import { ActionButtons, TableColumn } from '@/components/table';
import { RemittanceData } from './types';

export const RemittanceTableColumnConfig = ({
  handleEdit,
}: {
  handleEdit: (remittance: RemittanceData) => void;
}): TableColumn<RemittanceData>[] => {
  return [
    {
      id: 'currency',
      header: 'Currency',
      accessorKey: 'currency',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'left', cellAlign: 'left' },
    },
    {
      id: 'ttMargin10-12',
      header: 'TT Margin 10–12',
      accessorKey: 'ttMargin10-12',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'ttMargin12-02',
      header: 'TT Margin 12–02',
      accessorKey: 'ttMargin12-02',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'ttMargin02-3-30',
      header: 'TT Margin 02–3:30',
      accessorKey: 'ttMargin02-3-30',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'ttMargin03-30end',
      header: 'TT 03:30 – End',
      accessorKey: 'ttMargin03-30end',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'ttHolidayMargin',
      header: 'TT Holiday Margin',
      accessorKey: 'ttHolidayMargin',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'ttWeekendMargin',
      header: 'TT Weekend Margin',
      accessorKey: 'ttWeekendMargin',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
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
    }
  ];
};
