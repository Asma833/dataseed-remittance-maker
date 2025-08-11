import { CustomCheckbox } from '@/components/common/Checkbox';
import { Edit, Trash2 } from 'lucide-react';

export const PurposeDocumentColumn = ({
  handleDelete,
  handleEditDocument,
  handleSelectionChange,
  handleRequirementChange,
  handleBackRequirementChange,
}: {
  handleDelete: (rowData: any) => void;
  handleEditDocument: (rowData: any) => void;
  handleSelectionChange: (rowId: string, isSelected: boolean) => void;
  handleRequirementChange: (rowId: string, isChecked: boolean) => void;
  handleBackRequirementChange: (rowId: string, isChecked: boolean) => void;
}) => {
  return [
    {
      key: 'select',
      id: 'select',
      name: 'Select',
      className: 'min-w-0 p-2',
      cell: (value: boolean, row: any) => {
        return (
          <CustomCheckbox
            rowId={row.id}
            value={row.isSelected ? true : false}
            label=""
            requirementType="select"
            onChange={handleSelectionChange}
          />
        );
      },
    },
    {
      key: 'name',
      id: 'name',
      name: 'Document Name',
      className: 'text-left',
    },
    {
      key: 'requirement',
      id: 'requirement',
      name: 'Mandatory',
      cell: (value: string, row: any) => (
        <CustomCheckbox
          rowId={row.id}
          value={value ? true : false}
          label="Mandatory"
          requirementType="mandatory"
          onChange={handleRequirementChange}
        />
      ),
    },
    {
      key: 'backRequirement',
      id: 'backRequirement',
      name: 'Back Required',
      cell: (value: string, row: any) => (
        <CustomCheckbox
          rowId={row.id}
          value={value ? true : false}
          label="Back Required"
          requirementType="back-required"
          onChange={handleBackRequirementChange}
        />
      ),
    },
    {
      key: 'actions',
      id: 'actions',
      name: 'Action',
      cell: (_: any, rowData: any) => {
        return (
          <div className="flex flex-row items-center justify-center">
            <button className="p-2 rounded-md hover:bg-muted/20" onClick={() => handleEditDocument(rowData)}>
              <Edit className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              className="p-2 rounded-md hover:bg-muted/20"
              onClick={() => {
                handleDelete(rowData);
              }}
            >
              <Trash2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        );
      },
    },
  ];
};
