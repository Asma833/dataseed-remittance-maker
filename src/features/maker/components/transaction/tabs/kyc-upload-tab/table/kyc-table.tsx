import { DataTable } from "@/components/table/data-table";
import { useNavigate } from "react-router-dom";
import { KycTableColumnsConfig } from "./kyc-table-columns";

const KYCTable = ({ onUploadClick }: { onUploadClick: (isReupload: boolean) => void }) => {
  const navigate = useNavigate();
  
  const dummyKYCData = [
    {
      company_reference_no: 'NIUM001234',
      agent_reference_no: 'AGT123456',
      order_date: '2024-06-01T10:00:00Z',
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
      is_v_kyc_required: true,
      merged_document: 'doc1.pdf',
      nium_order_id: 'NIUM001234',
      e_sign_link_status: 'active'
    },
    {
      company_reference_no: 'NIUM005678',
      agent_reference_no: 'AGT789012',
      order_date: '2024-06-05T14:30:00Z',
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
      is_v_kyc_required: true,
      merged_document: null,
      nium_order_id: 'NIUM005678',
      e_sign_link_status: 'pending'
    },
    {
      company_reference_no: 'NIUM009999',
      agent_reference_no: 'AGT345678',
      order_date: '2024-06-10T09:45:00Z',
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
      is_v_kyc_required: true,
      merged_document: 'doc3.pdf',
      nium_order_id: 'NIUM009999',
      e_sign_link_status: 'expired'
    },
  ];

  const columns = KycTableColumnsConfig({
    navigate,
    onUploadClick: (isReupload: boolean) => {
      // Pass the isReupload to parent
      onUploadClick(isReupload);
    },
  });

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={columns}
        data={dummyKYCData}
        config={{
          search: { enabled: true, searchMode: "static" },
          pagination: { enabled: true, pageSize: 10, pageSizeOptions: [5, 10, 20, 50, 100], showPageSizeSelector: true },
          sorting: { enabled: true, multiSort: false, sortMode: "static" },
          filters: {
            enabled: true,
            filterMode: "static",
            columnFilters: true,
            globalFilter: true,
            dateRangeFilter: {
              enabled: true,
              columnId: 'order_date',
              useMuiDateRangePicker: true,
            },
          },
          export: { enabled: true, fileName: 'kyc-details.csv' },
        }}
      />
    </div>
  );
};

export default KYCTable;
