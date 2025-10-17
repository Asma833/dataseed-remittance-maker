import { ActionButtons, TableColumn } from '@/components/table';
import { HolidayData } from './types';

export const HolidayListTableColumnConfig = ({
  handleEdit,
  handleDelete,
}: {
  handleEdit: (holiday: HolidayData) => void;
  handleDelete: (holiday: HolidayData) => void;
}): TableColumn<HolidayData>[] => {
  return [
    {
      id: 'sno',
      header: 'Sl.No',
      accessorKey: 'sno',
      sortable: false,
      filterable: false,
      meta: { headerAlign: 'left', cellAlign: 'left' },
    },
    {
      id: 'created_at',
      header: 'Date',
      accessorKey: 'created_at',
      sortable: false,
      filterable: false,
      meta: { headerAlign: 'left', cellAlign: 'left' },
    },
    {
      id: 'holiday_name',
      header: 'Holiday',
      accessorKey: 'holiday_name',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'left', cellAlign: 'left' },
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({ row }) => <ActionButtons row={row} onEdit={handleEdit} onDelete={handleDelete}/>,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];
};
