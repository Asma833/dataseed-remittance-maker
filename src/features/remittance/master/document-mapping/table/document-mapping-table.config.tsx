import { Edit, Trash2 } from 'lucide-react';

export const DocumentMappingTableConfig = () => {
  return [
    {
      id: 'select',
      header: 'Select',
      accessorKey: 'selected',
      cell: ({ value }: { value: boolean }) => (
        <input
          type="checkbox"
          checked={value}
          readOnly
          className="relative h-5 w-5 cursor-pointer rounded-sm border-2 transition-all duration-300 inline-block align-middle accent-[#E53888]"
        />
      ),
    },
    {
      id: 'documentName',
      header: 'Document Name',
      accessorKey: 'documentName',
    },
    {
      id: 'requirement',
      header: 'Mandatory/Non-mandatory',
      accessorKey: 'requirement',
    },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex flex-row items-center justify-center">
          <button className="p-2 rounded-md hover:bg-muted/20">
            <Edit className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded-md hover:bg-muted/20">
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ),
    },
  ];
};
