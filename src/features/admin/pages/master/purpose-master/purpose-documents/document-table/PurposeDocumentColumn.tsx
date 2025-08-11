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
  handleRequirementChange: (rowId: string, value: string) => void;
  handleBackRequirementChange: (rowId: string, value: string) => void;
}) => {
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
            checked={row.isSelected}
            onChange={(e) => handleSelectionChange(row.id, e.target.checked)}
            className="relative h-5 w-5 cursor-pointer rounded-sm border-2 transition-all duration-300 inline-block align-middle accent-[#E53888]"
          />
        );
      },
    },
    {
      key: 'name',
      id: 'name',
      name: 'Document Name',
    },
    {
      key: 'requirement',
      id: 'requirement',
      name: 'Mandatory',
      cell: (value: string, row: any) => (
        <div className="flex flex-row gap-4 items-center justify-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name={`mandatory-${row.id}`}
              value="mandatory"
              checked={value === 'mandatory'}
              onChange={() => handleRequirementChange(row.id, 'mandatory')}
              style={{
                accentColor: '#E53888',
              }}
            />
            Mandatory
          </label>
        </div>
      ),
    },
    {
      key: 'backRequirement',
      id: 'backRequirement',
      name: 'Back Required',
      cell: (value: string, row: any) => (
        <div className="flex flex-row gap-4 items-center justify-center">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name={`back-required-${row.id}`}
              value="back-required"
              checked={value === 'back-required'}
              onChange={(e) => handleBackRequirementChange(row.id, e.target.value)}
              className="accent-pink-600"
            />
            Back Required
          </label>
        </div>
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
