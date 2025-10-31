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
  ];
};
