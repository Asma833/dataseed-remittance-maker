import { formatDateWithFallback } from '@/utils/formatDateWithFallback';

export const RejectionTableColumnsConfig = () => {
  return [
    {
      accessorKey: 'user',
      id: 'user',
      header: 'User',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'document',
      id: 'document',
      header: 'Document',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'rejection_date',
      id: 'rejection_date',
      header: 'Rejection Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: any; value: any }) => <span>{formatDateWithFallback(props.row.rejection_date)}</span>,
    },
    {
      accessorKey: 'reason',
      id: 'reason',
      header: 'Reason',
      meta: { className: 'min-w-0 p-2' },
    },
  ];
};