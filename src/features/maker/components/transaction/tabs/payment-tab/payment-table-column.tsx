import { useState } from 'react';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import KycStatusCell from '@/components/cell/table/KycStatusCell';
import PaymentStatusCell from '@/components/cell/table/PaymentStatusCell';
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';

interface PaymentData {
  ref_no: string;
  order_id?: string;
  agent_ref_no: string;
  created_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  e_sign_status: string;
  e_sign_link: string | null;
  e_sign_link_status?: string;
  v_kyc_status: string;
  v_kyc_link: string | null;
  payment_status: string;
  payment_link: string | null;
  payment_screenshot: string | null;
  is_esign_required: boolean;
  is_v_kyc_required: boolean;
  merged_document?: any;
}

export const GetPaymentTableColumn = ({ handlePayment }: { handlePayment: (rowData: any) => void }) => {
  const [hasGeneratedLink, setHasGeneratedLink] = useState(false);
  return [
    { id: 'ref_no', header: 'Ref. No', accessorKey: 'ref_no', meta: { className: 'min-w-0 p-2' } },
    { id: 'agent_ref_no', header: 'Agent Ref. No', accessorKey: 'agent_ref_no', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'order_date',
      header: 'Order Date',
      accessorKey: 'order_date',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <span>{formatDateWithFallback(row.created_date)}</span>,
    },
    { id: 'expiry_date', header: 'Expiry Date', accessorKey: 'expiry_date', meta: { className: 'min-w-0 p-2' } },
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
    { id: 'purpose', header: 'Purpose', accessorKey: 'purpose', meta: { className: 'min-w-0 p-2' } },
    { id: 'kyc_type', header: 'KYC Type', accessorKey: 'kyc_type', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'kyc_status',
      header: 'KYC Status',
      accessorKey: 'kyc_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <KycStatusCell rowData={row} />,
    },
    { id: 'fx_currency', header: 'FX Currency', accessorKey: 'fx_currency', meta: { className: 'min-w-0 p-2' } },
    { id: 'fx_amount', header: 'FX Amount', accessorKey: 'fx_amount', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'settlement_rate',
      header: 'Settlement Rate',
      accessorKey: 'settlement_rate',
      meta: { className: 'min-w-0 p-2' },
    },
    { id: 'customer_rate', header: 'Customer Rate', accessorKey: 'customer_rate', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'transaction_amount',
      header: 'Transaction Amount',
      accessorKey: 'transaction_amount',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'payment_status',
      header: 'Payment Status',
      accessorKey: 'payment_status',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => <PaymentStatusCell rowData={row} />,
    },
    {
      id: 'payment_link',
      header: 'Payment Link',
      accessorKey: 'payment_link',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => {
        const { ref_no, payment_link } = row;
        return (
          <SignLinkButton
            id={ref_no}
            copyLinkUrl={payment_link || ''}
            toastInfoText="Payment link copied successfully!"
            tooltipText="Copy payment link"
            buttonType="copy_link"
            buttonIconType="copy_link"
          />
        );
      },
    },

    {
      id: 'payment_screenshot',
      header: 'Payment Screenshot',
      accessorKey: 'payment_screenshot',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.ref_no}
          onClick={() => handlePayment(row)}
          tooltipText="Upload Payment Screenshot"
          buttonType="upload"
          buttonIconType="upload"
          disabled={row.payment_screenshot !== null}
          className="group"
          iconClassName="text-primary group-hover:text-white group-disabled:text-gray-400"
        />
      ),
    },
    { id: 'comments', header: 'Comments', accessorKey: 'comments', meta: { className: 'min-w-0 p-2' } },
    {
      id: 'view_action',
      header: 'View',
      accessorKey: 'view_action',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: PaymentData }) => (
        <SignLinkButton
          id={row.ref_no}
          // onClick={() => }
          tooltipText="View"
          buttonType="view"
          buttonIconType="view"
        />
      ),
    },
  ];
};
