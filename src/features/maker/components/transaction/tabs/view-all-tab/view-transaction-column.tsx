import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import PaymentStatusCell from '@/components/cell/table/PaymentStatusCell';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import { PaymentData } from '../../types/payment.types';
import { useState } from 'react';
import { useGetPresignedUrls } from '../../hooks/useGetPresignedUrls';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';

export const GetViewAllTransactionTableColumns = () => {
  return [
    {
      id: 'ref_no',
      header: 'Ref. No',
      accessorKey: 'ref_no',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'agent_ref_no',
      header: 'Agent Ref. No',
      accessorKey: 'agent_ref_no',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'order_date',
      header: 'Order Date',
      accessorKey: 'order_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <span>{formatDateWithFallback(row.order_date)}</span>,
    },
    {
      id: 'expiry_date',
      header: 'Expiry Date',
      accessorKey: 'expiry_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <span>{formatDateWithFallback(row.expiry_date)}</span>,
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
    },
    {
      id: 'fx_rate',
      header: 'FX Rate',
      accessorKey: 'fx_rate',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'customer_rate',
      header: 'Customer Rate',
      accessorKey: 'customer_rate',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'payment_status',
      header: 'Payment Status',
      accessorKey: 'payment_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <PaymentStatusCell rowData={row} />,
    },
    {
      id: 'kyc_status',
      header: 'KYC Status',
      accessorKey: 'kyc_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <KycStatusCell rowData={row} />,
    },
    {
      id: 'swift_copy',
      header: 'Swift Copy',
      accessorKey: 'swift_copy',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <SwiftCopyDownloadCell row={row} />, // Render custom cell
    },
    {
      id: 'transaction_status',
      header: 'Transaction Status',
      accessorKey: 'transaction_status',
      meta: { className: 'min-w-0 p-2' },
    },
  ];
};

const SwiftCopyDownloadCell = ({ row }: { row: PaymentData }) => {
  const { mutateAsync: getPresignedUrls } = useGetPresignedUrls();
  const [isLoading, setIsLoading] = useState(false);
  const swiftCopy = row?.swift_copy;

  const handleDownload = async () => {
    if (!swiftCopy) return;
    try {
      setIsLoading(true);
      const res = await getPresignedUrls([swiftCopy]);
      const url = res?.urls?.[0]?.presigned_url;
      if (!url) throw new Error('URL not found');

      // Fallback to window.open since iframe download is blocked/silent for inline content
      const link = document.createElement('a');
      link.href = url;
      link.download = swiftCopy.split('/').pop() || 'swift_copy';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error('Failed to download file');
    } finally {
      setIsLoading(false);
    }
  };

  if (!swiftCopy) return <div className="p-2">-</div>;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDownload}
      disabled={isLoading}
      className="text-primary hover:text-primary/80"
      title="Download Swift Copy"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
    </Button>
  );
};


