import { ActionButtons, TableColumn } from '@/components/table';
import { BankAccount } from '../steps/FinanceDetailsStep';

const GetBankTableColumns = ({
  handleEdit,
  handleDelete
}: {
  handleEdit: (bank: BankAccount) => void;
  handleDelete: (id: string) => void;
}): TableColumn<BankAccount>[] => {
  return [
    {
      id: 'bankName',
      header: 'Bank Name',
      accessorKey: 'bankName',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'branchName',
      header: 'Branch Name',
      accessorKey: 'branchName',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'accountHolder',
      header: 'Account Holder',
      accessorKey: 'accountHolder',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'accountNumber',
      header: 'Account Number',
      accessorKey: 'accountNumber',
      sortable: true,
      filterable: true,
      meta: {
        headerAlign: 'left',
        cellAlign: 'left',
      },
    },
    {
      id: 'ifscCode',
      header: 'IFSC Code',
      accessorKey: 'ifscCode',
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
      cell: ({ row }) => <ActionButtons row={row} onEdit={handleEdit} onDelete={() => handleDelete(row.id)} />,
      sortable: false,
      filterable: false,
      meta: {
        headerAlign: 'center',
        cellAlign: 'center',
      },
    },
  ];
};

export default GetBankTableColumns;