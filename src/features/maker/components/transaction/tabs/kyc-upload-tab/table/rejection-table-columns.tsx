import { formatDateWithFallback } from '@/utils/formatDateWithFallback';

export const RejectionTableColumnsConfig = () => {
  return [
    {
      accessorKey: 'rejected_by',
      id: 'rejected_by',
      header: 'User',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      accessorKey: 'document_name',
      id: 'document_name',
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
      accessorKey: 'rejection_reason',
      id: 'rejection_reason',
      header: 'Reason',
      meta: { className: 'min-w-0 p-2 text-red-500' },
    },
  ];
};
