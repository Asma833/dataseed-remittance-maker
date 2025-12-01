import { DataTable } from "@/components/table/data-table";
import { TableColumn } from "@/components/table/types";
import { useState } from "react";
import { formatDateWithFallback } from '@/utils/formatDateWithFallback';
import EsignStatusCell from '@/components/cell/table/EsignStatusCell';
import VKycStatusCell from '@/components/cell/table/VKycStatusCell';
import { SignLinkButton } from '@/components/common/single-link-button';
import TooltipActionButton from '@/components/common/tooltip-action-button';
import { Eye } from 'lucide-react';

type KYCData = {
  company_reference_no: string;
  agent_reference_no: string;
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
  v_kyc_status: string;
  v_kyc_link: string | null;
  is_esign_required: boolean;
  is_v_kyc_required: boolean;
};

const KYCPage = () => {
  const [loadingOrderId, setLoadingOrderId] = useState<string>('');

  const dummyKYCData: KYCData[] = [
    {
      company_reference_no: 'NIUM001234',
      agent_reference_no: 'AGT123456',
      created_date: '2024-06-01T10:00:00Z',
      expiry_date: '2024-07-01T10:00:00Z',
      applicant_name: 'John Doe',
      applicant_pan: 'ABCDE1234F',
      transaction_type: 'Remittance',
      purpose: 'Family Maintenance',
      kyc_type: 'VKYC',
      kyc_status: 'Completed',
      e_sign_status: 'completed',
      e_sign_link: 'https://esign.example.com/NIUM001234',
      v_kyc_status: 'completed',
      v_kyc_link: 'https://vkyc.example.com/NIUM001234',
      is_esign_required: true,
      is_v_kyc_required: true
    },
    {
      company_reference_no: 'NIUM005678',
      agent_reference_no: 'AGT789012',
      created_date: '2024-06-05T14:30:00Z',
      expiry_date: '2024-07-05T14:30:00Z',
      applicant_name: 'Jane Smith',
      applicant_pan: 'XYZAB6789C',
      transaction_type: 'Loan Repayment',
      purpose: 'Personal Loan',
      kyc_type: 'Physical',
      kyc_status: 'completed',
      e_sign_status: 'pending',
      e_sign_link: null,
      v_kyc_status: 'N/A',
      v_kyc_link: null,
      is_esign_required: true,
      is_v_kyc_required: true
    },
    {
      company_reference_no: 'NIUM009999',
      agent_reference_no: 'AGT345678',
      created_date: '2024-06-10T09:45:00Z',
      expiry_date: '2024-07-10T09:45:00Z',
      applicant_name: 'Alice Johnson',
      applicant_pan: 'LMNOP1234Q',
      transaction_type: 'Investment',
      purpose: 'Mutual Fund',
      kyc_type: 'VKYC',
      kyc_status: 'pending',
      e_sign_status: 'expired',
      e_sign_link: 'https://esign.example.com/NIUM009999',
      v_kyc_status: 'expired',
      v_kyc_link: 'https://vkyc.example.com/NIUM009999',
      is_esign_required: true,
      is_v_kyc_required: true
    },
  ];

  const handleRegenerateEsignLink = (rowData: KYCData): void => {
    // Placeholder for esign link regeneration
    console.log('Regenerate esign link for:', rowData.company_reference_no);
  };

  const handleRegenerateVkycLink = (rowData: KYCData): void => {
    // Placeholder for vkyc link regeneration
    console.log('Regenerate vkyc link for:', rowData.company_reference_no);
  };

  const columns: TableColumn<KYCData>[] = [
    {
      id: 'company_reference_no',
      header: 'Nium Ref.No',
      accessorKey: 'company_reference_no',
    },
    {
      id: 'agent_reference_no',
      header: 'Agent Ref.No.',
      accessorKey: 'agent_reference_no',
    },
    {
      id: 'created_date',
      header: 'Created Date',
      accessorKey: 'created_date',
      cell: ({ value }) => <span>{formatDateWithFallback(value as string)}</span>,
    },
    {
      id: 'expiry_date',
      header: 'Expiry Date',
      accessorKey: 'expiry_date',
      cell: ({ value }) => <span>{formatDateWithFallback(value as string)}</span>,
    },
    {
      id: 'applicant_name',
      header: 'Applicant Name',
      accessorKey: 'applicant_name',
    },
    {
      id: 'applicant_pan',
      header: 'Applicant PAN Number',
      accessorKey: 'applicant_pan',
    },
    {
      id: 'transaction_type',
      header: 'Transaction Type',
      accessorKey: 'transaction_type',
    },
    {
      id: 'purpose',
      header: 'Purpose',
      accessorKey: 'purpose',
    },
    {
      id: 'kyc_type',
      header: 'KYC Type',
      accessorKey: 'kyc_type',
    },
    {
      id: 'kyc_status',
      header: 'KYC Status',
      accessorKey: 'kyc_status',
      cell: ({ row }) => <VKycStatusCell rowData={row} />,
    },
    {
      id: 'e_sign_status',
      header: 'E Sign Status',
      accessorKey: 'e_sign_status',
      cell: ({ row }) => <EsignStatusCell rowData={row} />,
    },
    {
      id: 'e_sign_link',
      header: 'E Sign Link',
      accessorKey: 'e_sign_link',
      cell: ({ row }) => {
        const data = row as KYCData;
        const { company_reference_no, e_sign_link, e_sign_status, is_esign_required } = data;

        if (!is_esign_required) {
          return <span>N/A</span>;
        }

        const needsGeneration = e_sign_status === 'expired' || e_sign_status === 'rejected' || !e_sign_link;

        return (
          <SignLinkButton
            id={company_reference_no}
            copyLinkUrl={e_sign_link || ''}
            loading={false}
            toastInfoText="E Sign link copied successfully!"
            disabled={e_sign_status === 'completed' && !needsGeneration}
            {...(needsGeneration ? { onClick: () => handleRegenerateEsignLink(data) } : {})}
            tooltipText={needsGeneration ? 'Generate E Sign Link' : 'Copy E Sign Link'}
            buttonType={needsGeneration ? 'refresh' : 'copy_link'}
            buttonIconType={needsGeneration ? 'refresh' : 'copy_link'}
          />
        );
      },
    },
    {
      id: 'v_kyc_status',
      header: 'VKYC Status',
      accessorKey: 'v_kyc_status',
      cell: ({ row }) => <VKycStatusCell rowData={row} />,
    },
    {
      id: 'v_kyc_link',
      header: 'VKYC Link',
      accessorKey: 'v_kyc_link',
      cell: ({ row }) => {
        const data = row as KYCData;
        const { company_reference_no, v_kyc_status, v_kyc_link, is_v_kyc_required } = data;

        if (!is_v_kyc_required) {
          return <span>N/A</span>;
        }

        const needsGeneration = v_kyc_status === 'expired' || v_kyc_status === 'N/A' || !v_kyc_link;

        return (
          <SignLinkButton
            id={company_reference_no}
            copyLinkUrl={v_kyc_link || ''}
            loading={false}
            toastInfoText="VKYC Link copied successfully!"
            disabled={v_kyc_status === 'completed' && !needsGeneration}
            {...(needsGeneration ? { onClick: () => handleRegenerateVkycLink(data) } : {})}
            tooltipText={needsGeneration ? 'Generate VKYC Link' : 'Copy VKYC Link'}
            buttonType={needsGeneration ? 'refresh' : 'copy_link'}
            buttonIconType={needsGeneration ? 'refresh' : 'copy_link'}
          />
        );
      },
    },
    {
      id: 'view_action',
      header: 'View',
      accessorKey: 'view_action',
      cell: ({ row }) => {
        const data = row as KYCData;
        return (
          <TooltipActionButton
            onClick={() => console.log('View transaction:', data.agent_reference_no)}
            icon={<Eye size={16} />}
            tooltipText="View"
            variant="view"
          />
        );
      },
    },
  ];

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={columns}
        data={dummyKYCData}
        config={{
          search: { enabled: true, searchMode: "static" },
          pagination: { enabled: true, pageSize: 10, pageSizeOptions: [5, 10, 20, 50, 100], showPageSizeSelector: true },
          sorting: { enabled: true, multiSort: false, sortMode: "static" },
        }}
      />
    </div>
  );
};

export default KYCPage;
