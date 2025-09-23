import { Edit, Trash2 } from 'lucide-react';

export const HolidayListTableColumnConfig = ({}) => {
  return [
    {
      key: 'sno',
      id: 'sno',
      name: 'Sl.No',
      className: 'min-w-0 p-2',
      // Note: If your table renderer supports row index via context, replace accordingly.
      // For now, expects data to include a sequential 'sno' field or your renderer to inject index.
    },
    {
      key: 'created_at',
      id: 'created_at',
      name: 'Date',
      className: 'min-w-0 p-2',
    },
    {
      key: 'holiday_name',
      id: 'holiday_name',
      name: 'Holiday',
      className: 'min-w-0 p-2',
    },
    {
      key: 'actions',
      id: 'actions',
      name: 'Action',
      className: 'min-w-0 p-2',
      cell: (_: any, _rowData: any) => {
        return (
          <div className="flex flex-row items-center justify-center">
            <button
              className="p-2 rounded-md hover:bg-muted/20"
              //  onClick={() => {}}
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-muted/20"
              //  onClick={() => {}}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        );
      },
    },
  ];
};
