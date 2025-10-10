import { ActionButtons, TableColumn } from '@/components/table';
import { BankAccount } from '../../../api/bankAccounts';

const GetBankTableColumns = ({
  handleEdit,
  handleDelete,
}: {
  handleEdit: (bank: BankAccount) => void;
  handleDelete: (id: string) => void;
}): TableColumn<BankAccount>[] => {
  return [
    {
      id: 'bankName',
      header: 'Bank Name',
      accessorKey: 'bank_name',
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
      accessorKey: 'bank_branch',
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
      accessorKey: 'account_holder_name',
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
      accessorKey: 'account_number',
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
      accessorKey: 'ifsc_code',
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

export default GetBankTableColumns;
