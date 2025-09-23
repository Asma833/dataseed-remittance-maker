import { Edit, Trash2 } from 'lucide-react';

export const PurposeDocumentTableConfig = () => {
  return [
    {
      key: 'select',
      id: 'select',
      name: 'Select',
      className: 'min-w-0 p-2',
      cell: (value: boolean, row: any) => {
        return (
          <input
            type="checkbox"
            checked={value}
            //   onChange={(e) => handleSelectionChange(row.partner_order_id, e.target.checked)}
            className="relative h-5 w-5 cursor-pointer rounded-sm border-2 transition-all duration-300 inline-block align-middle accent-[#E53888]"
          />
        );
      },
    },
    {
      key: 'documentName',
      id: 'documentName',
      name: 'Document Name',
    },
    {
      key: 'requirement',
      id: 'requirement',
      name: 'Mandatory/Non-mandatory',
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
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-muted/20"
              // onClick={() => {}}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        );
      },
    },
  ];
};
