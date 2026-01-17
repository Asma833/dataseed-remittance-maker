import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import { StatusBadge } from '@/components/common/status-badge';
import { AmountCell } from '@/components/common/amount-cell';
import { formatDateWithFallback, formatDateForCsv } from '@/utils/formatDateWithFallback';
import { PaymentData } from '../../types/payment.types';

export const GetPaymentTableColumn = ({
  handlePayment,
  handleViewTransaction,
}: {
  handlePayment: (rowData: PaymentData) => void;
  handleViewTransaction: (rowData: PaymentData) => void;
}) => {
  return [
    { id: 'ref_no', header: 'Company Ref. No', accessorKey: 'ref_no', meta: { className: 'min-w-0 p-2' } },
    { id: 'agent_ref_no', header: 'Agent Ref. No', accessorKey: 'agent_ref_no', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'order_date',
      header: 'Order Date',
      accessorKey: 'order_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <span>{formatDateWithFallback(row.order_date)}</span>,
      exportFormatter: formatDateForCsv,
    },
    {
      id: 'expiry_date',
      header: 'Expiry Date',
      accessorKey: 'expiry_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <span>{formatDateWithFallback(row.expiry_date)}</span>,
      exportFormatter: formatDateForCsv,
    },
    {
      id: 'applicant_name',
      header: 'Applicant Name',
      accessorKey: 'applicant_name',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'applicant_pan',
      header: 'Applicant PAN Number',
      accessorKey: 'applicant_pan',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'transaction_type',
      header: 'Transaction Type',
      accessorKey: 'transaction_type',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'purpose',
      header: 'Purpose',
      accessorKey: 'purpose',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'kyc_type',
      header: 'KYC Type',
      accessorKey: 'kyc_type',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'kyc_status',
      header: 'KYC Status',
      accessorKey: 'kyc_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <KycStatusCell rowData={row} />,
    },
    {
      id: 'fx_currency',
      header: 'FX Currency',
      accessorKey: 'fx_currency',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'fx_amount',
      header: 'FX Amount',
      accessorKey: 'fx_amount',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <AmountCell value={row.fx_amount} />,
    },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <AmountCell value={row.settlement_rate} />,
    },
    {
      id: 'customer_rate',
      header: 'Customer Rate',
      accessorKey: 'customer_rate',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <AmountCell value={row.customer_rate} />,
    },
    {
      id: 'transaction_amount',
      header: 'Transaction Amount',
      accessorKey: 'transaction_amount',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <AmountCell value={row.transaction_amount} />,
    },
    {
      id: 'payment_status',
      header: 'Payment Status',
      accessorKey: 'payment_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <StatusBadge status={row.payment_status} />,
    },
    // {
    //   id: 'payment_link',
    //   header: 'Payment Link',
    //   accessorKey: 'payment_link',
    //   meta: { className: 'min-w-0 p-2' },
    //   cell: ({ row }: { row: PaymentData }) => {
    //     const { ref_no, payment_link } = row;
    //     return (
    //       <SignLinkButton
    //         id={ref_no}
    //         copyLinkUrl={payment_link || ''}
    //         toastInfoText="Payment link copied successfully!"
    //         tooltipText="Copy payment link"
    //         buttonType="copy_link"
    //         buttonIconType="copy_link"
    //       />
    //     );
    //   },
    // },
    {
      id: 'rejection_reason',
      header: 'Comments',
      accessorKey: 'rejection_reason',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'payment_screenshot',
      header: 'Payment Screenshot',
      accessorKey: 'payment_screenshot',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => {
        const paymentStatus = (row.payment_status || '').toUpperCase();
        const hasChallan = !!row.payment_challan_url;

        // Enable upload if it's FAILED, or if it's INITIATED but has no challan yet.
        // Disable if challan is available and NOT failed.
        const canUpload = paymentStatus === 'FAILED' || (paymentStatus === 'INITIATED' && !hasChallan);

        let tooltipText = 'Upload';
        if (hasChallan) {
          tooltipText = paymentStatus === 'FAILED' ? 'Re-upload' : 'Uploaded';
        } else if (!canUpload) {
          tooltipText = `Payment Status: ${row.payment_status || 'N/A'}`;
        }

        return (
          <SignLinkButton
            id={row.ref_no}
            onClick={() => handlePayment(row)}
            disabled={!canUpload}
            tooltipText={tooltipText}
            buttonIconType={hasChallan ? 'file_text' : 'upload'}
            buttonType={hasChallan ? 'file_text' : 'upload'}
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            iconClassName="text-gray-600 hover:text-gray-800 group-disabled:text-gray-400"
          />
        );
      },
    },

    {
      id: 'view_action',
      header: 'View',
      accessorKey: 'view_action',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.ref_no}
          onClick={() => handleViewTransaction(row)}
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        />
      ),
    },
  ];
};
