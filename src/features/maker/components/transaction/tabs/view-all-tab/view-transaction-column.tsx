import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import { StatusBadge } from '@/components/common/status-badge';
import { AmountCell } from '@/components/common/amount-cell';
import { PaymentData } from '../../types/payment.types';
import { useState } from 'react';
import { useGetPresignedUrls } from '../../hooks/useGetPresignedUrls';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

export const GetViewAllTransactionTableColumns = () => {
  return [
    {
      id: 'ref_no',
      header: 'Company Ref. No',
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
      cell: ({ row }: { row: any }) => <AmountCell value={row.fx_amount} />,
    },
    {
      id: 'fx_rate',
      header: 'FX Rate',
      accessorKey: 'fx_rate',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <AmountCell value={row.fx_rate} />,
    },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <AmountCell value={row.settlement_rate} />,
    },
    {
      id: 'customer_rate',
      header: 'Customer Rate',
      accessorKey: 'customer_rate',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <AmountCell value={row.customer_rate} />,
    },
    {
      id: 'payment_status',
      header: 'Payment Status',
      accessorKey: 'payment_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <StatusBadge status={row.payment_status} />,
    },
    {
      id: 'kyc_status',
      header: 'KYC Status',
      accessorKey: 'kyc_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <StatusBadge status={row.kyc_status} />,
    },
    {
      id: 'transaction_status',
      header: 'Transaction Status',
      accessorKey: 'transaction_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <StatusBadge status={row.transaction_status} />,
    },
    {
      id: 'swift_copy',
      header: 'Swift Copy',
      accessorKey: 'swift_copy',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => <SwiftCopyDownloadCell row={row} />, // Render custom cell
    }
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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            disabled={isLoading || !swiftCopy}
            className={cn('text-primary hover:text-primary/80', !swiftCopy && 'text-gray-400 opacity-50')}
            title={swiftCopy ? 'Download Swift Copy' : 'Swift Copy Not Available'}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent className="bg-gray-400/20 backdrop-blur-sm border-0 px-3 py-2 text-xs font-medium rounded-md shadow-xl shadow-black/20 text-foreground">
        {swiftCopy ? 'Download Swift Copy' : 'Swift Copy Not Available'}
      </TooltipContent>
    </Tooltip>
  );
};



