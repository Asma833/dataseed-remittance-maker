import { useState } from 'react';
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import { SignLinkButton } from '@/components/cell/table/SignLinkButton';
import VKycStatusCell from '@/components/cell/table/VKycStatusCell';
import EsignStatusCell from '@/components/cell/table/EsignStatusCell';
import PaymentStatusCell from '@/components/cell/table/PaymentStatusCell';
import KycStatusCell from '@/components/cell/table/KycStatusCell';

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

export const GetViewAllTransactionTableColumns = () => {
  return [
    {
      id: 'ref_no',
      header: 'Ref. No',
      accessorKey: 'ref_no',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'ref_no',
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
      id: 'transaction_status',
      header: 'Transaction Status',
      accessorKey: 'transaction_status',
      meta: { className: 'min-w-0 p-2' },
    },
    {
      id: 'swift_copy',
      header: 'Swift Copy',
      accessorKey: 'swift_copy',
      meta: { className: 'min-w-0 p-2' },
      cell: ({ row }: { row: any }) => (
        <SignLinkButton
          id={row.company_reference_no}
          onClick={() => {}}
          tooltipText="Download Swift Copy"
          buttonType="download"
          buttonIconType="download"
          iconClassName="text-primary group-hover:text-white group-disabled:text-gray-400"
          className="group"
        />
      ),
    },
  ];
};
