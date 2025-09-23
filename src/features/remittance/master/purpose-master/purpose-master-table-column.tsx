import { Edit, Trash2 } from 'lucide-react';
import Switch from '@/components/ui/switch';

export const PurposeMasterTableColumn = () => {
  return [
    {
      key: 'purpose_name',
      id: 'purpose_name',
      name: 'Purpose Name',
    },
    {
      key: 'purpose_code',
      id: 'purpose_code',
      name: 'Purpose Code',
    },
    {
      key: 'transaction_type',
      id: 'transaction_type',
      name: 'Transaction Type',
    },
    {
      key: 'is_active',
      id: 'is_active',
      name: 'Status',
      cell: (_: any, row: any) => {
        return (
          <div className="flex flex-col items-center zoom-in-50">
            <Switch
              checked={row?.is_active}
              onCheckedChange={(checked) => {
                //   handleStatusChange(row, checked);
              }}
            />
          </div>
        );
      },
    },
    {
      key: 'actions',
      id: 'actions',
      name: 'Action',
      cell: (_: any, rowData: any) => {
        return (
          <div className="flex flex-row items-center justify-center">
            <button
              className="p-2 rounded-md hover:bg-muted/20"
              // onClick={() => {}}
            >
              <Edit className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
            className="p-2 rounded-md hover:bg-muted/20"
            // onClick={() => {}}
          >
            <Trash2 className="w-5 h-5 text-muted-foreground" />
          </button>
          </div>
        );
      },
    },
  ];
};
