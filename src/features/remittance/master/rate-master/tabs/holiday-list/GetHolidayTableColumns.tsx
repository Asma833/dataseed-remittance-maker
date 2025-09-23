import { ActionButtons, TableColumn } from '@/components/table';
import { HolidayData } from './types';

const GetHolidayTableColumns = ({
  handleEdit
}: {
  handleEdit: (holiday: HolidayData) => void;
}): TableColumn<HolidayData>[] => {
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
      id: 'created_at',
      header: 'Date',
      accessorKey: 'created_at',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'holiday_name',
      header: 'Holiday',
      accessorKey: 'holiday_name',
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

export default GetHolidayTableColumns;