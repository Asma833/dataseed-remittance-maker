
import { Edit, Trash2 } from 'lucide-react';

import { TableColumn } from '@/components/table/types';
import { CustomCheckbox } from '@/components/checkbox/checkbox';

export const DocumentMappingTableConfig = ({
  handleEditDocument,
  handleSelectionChange,
  handleMandatoryChange,
  handleBackMandatoryChange,
  disabled: isDisabled = false,
}: {
  handleEditDocument: (rowData: any) => void;
  handleSelectionChange: (rowId: string, isSelected: boolean) => void;
  handleMandatoryChange: (rowId: string, isChecked: boolean) => void;
  handleBackMandatoryChange: (rowId: string, isChecked: boolean) => void;
  disabled?: boolean;
}): TableColumn[] => {
  return [
    {
      id: 'select',
      header: 'Select',
      cell: ({ row }) => (
        <CustomCheckbox
          rowId={row.id}
          value={row.isSelected ?? false}
          label=""
          requirementType="select"
          onChange={handleSelectionChange}
          disabled={isDisabled}
        />
      ),
      meta: {
        className: 'min-w-0 p-2',
      },
    },
    {
      id: 'name',
      header: 'Document Name',
      accessorKey: 'name',
      meta: {
        className: 'text-left',
      },
    },
    {
      id: 'requirement',
      header: 'Mandatory',
      cell: ({ row }) => (
        <CustomCheckbox
          rowId={row.id}
          value={row.requirement ?? false}
          label="Mandatory"
          requirementType="mandatory"
          onChange={handleMandatoryChange}
          disabled={!row.isSelected}
        />
      ),
    },
    {
      id: 'backRequirement',
      header: 'Back Required',
      cell: ({ row }) => (
        <CustomCheckbox
          rowId={row.id}
          value={row.backRequirement ?? false}
          label="Back Required"
          requirementType="back-required"
          onChange={handleBackMandatoryChange}
          disabled={!row.isSelected}
        />
      ),
    },
    // {
    //   id: 'actions',
    //   header: 'Action',
    //   cell: ({ row }) => (
    //     <div className="flex flex-row items-center justify-center">
    //       <button className="p-2 rounded-md hover:bg-muted/20" onClick={() => handleEditDocument(row)}>
    //         <Edit className="w-5 h-5 text-muted-foreground" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];
};