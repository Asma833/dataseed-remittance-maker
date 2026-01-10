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
      accessorKey: 'created_at',
      id: 'created_at',
      header: 'Rejection Date',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: any; value: any }) => <span>{formatDateWithFallback(props.value)}</span>,
    },
    {
      accessorKey: 'rejection_reason',
      id: 'rejection_reason',
      header: 'Reason',
      meta: { className: 'min-w-0 p-2' },
      cell: (props: { row: any; value: any }) => {
        const remarks = props.row.original?.remarks;
        return <span>{remarks || props.value || '-'}</span>;
      },
    },
  ];
};
