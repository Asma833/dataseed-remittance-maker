
import { ViewAllTransactionTableColumns } from "./view-transaction-column";

import { useMemo, useState, useEffect } from "react";

import { useDeleteTransaction } from "@/features/maker/hooks/useDeleteTransaction";
import { Order } from "@/types/common/updateIncident.types";
import { useSendEsignLink } from "@/hooks/common/useSendEsignLink";
import { useSendVkycLink } from "@/hooks/common/useSendVkycLink";
import { DataTable } from "@/components/table/data-table";
import { staticConfig } from "@/components/table/config";

const ViewAllTransactions = () => {
      const [loadingOrderId, setLoadingOrderId] = useState<string>('');
      const [isLoading, setIsLoading] = useState(true); // Temporary loading state for demo
      const { mutate: sendEsignLink, isSendEsignLinkLoading } = useSendEsignLink();
      const { mutate: sendVkycLink, isSendVkycLinkLoading } = useSendVkycLink();

      // Simulate loading for demo purposes
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 5000); // Show loader for 5 seconds
        return () => clearTimeout(timer);
      }, []);

        // Temporary: using dummy data for now

        const dummyTransactionData = [
      {
        company_reference_no: 'NIUM-0001',
        agent_reference_no: 'AGENT-1001',
        created_date: '2024-06-10T10:30:00Z',
        expiry_date: '2024-07-10T10:30:00Z',
        applicant_name: 'John Doe',
        transaction_type: 'Remittance',
        purpose: 'Family Support',
        fx_currency: 'USD',
        fx_amount: '1000',
        fx_rate: '74.25',
        settlement_rate: '74.10',
        customer_rate: '74.50',
        payment_status: 'pending',
        payment_link: 'https://payment.example.com/NIUM-0001',
        e_sign_status: 'completed',
        e_sign_link: 'https://esign.example.com/NIUM-0001',
        kyc_type: 'VKYC',
        kyc_upload_status: 'Uploaded',
        v_kyc_status: 'completed',
        v_kyc_link: 'https://vkyc.example.com/NIUM-0001',
        completion_date: '2024-06-15T12:00:00Z',
        swift_copy: 'https://files.example.com/swift/NIUM-0001.pdf',
        is_esign_required:true,
        is_v_kyc_required: true
      },
      {
        company_reference_no: 'NIUM-0002',
        agent_reference_no: 'AGENT-1002',
        created_date: '2024-06-11T09:00:00Z',
        expiry_date: '2024-07-11T09:00:00Z',
        applicant_name: 'Jane Smith',
        transaction_type: 'Investment',
        purpose: 'Equity Purchase',
        fx_currency: 'EUR',
        fx_amount: '5000',
        fx_rate: '82.00',
        settlement_rate: '81.75',
        customer_rate: '82.25',
        payment_status: 'Pending',
        payment_link: 'https://payment.example.com/NIUM-0002',
        e_sign_status: 'pending',
        e_sign_link: null,
        kyc_type: 'Physical',
        kyc_upload_status: 'Pending',
        v_kyc_status: 'N/A',
        v_kyc_link: null,
        completion_date: null,
        swift_copy: null,
        is_esign_required:true,
        is_v_kyc_required: true
      },
      {
        company_reference_no: 'NIUM-0003',
        agent_reference_no: 'AGENT-1003',
        created_date: '2024-06-12T14:20:00Z',
        expiry_date: '2024-07-12T14:20:00Z',
        applicant_name: 'Alice Johnson',
        transaction_type: 'Loan Repayment',
        purpose: 'Car Loan',
        fx_currency: 'GBP',
        fx_amount: '2000',
        fx_rate: '92.50',
        settlement_rate: '92.30',
        customer_rate: '92.80',
        payment_status: 'completed',
        payment_link: 'https://payment.example.com/NIUM-0003',
        e_sign_status: 'expired',
        e_sign_link: 'https://esign.example.com/NIUM-0003',
        kyc_type: 'VKYC',
        kyc_upload_status: 'Failed',
        v_kyc_status: 'expired',
        v_kyc_link: 'https://vkyc.example.com/NIUM-0003',
        completion_date: '2024-06-17T16:00:00Z',
        swift_copy: 'https://files.example.com/swift/NIUM-0003.pdf',
        is_esign_required:true,
        is_v_kyc_required: true
      },
    ];

      const handleRegenerateEsignLink = (rowData: Order): void => {
        if (rowData.nium_order_id) {
          setLoadingOrderId(rowData.nium_order_id);
        }
        sendEsignLink(
          { partner_order_id: rowData.partner_order_id || '' },
          {
            onSuccess: () => {
              setLoadingOrderId('');
            },
            onError: () => {
              setLoadingOrderId('');
            },
          }
        );
      };
      const handleRegenerateVkycLink = (rowData: Order): void => {
        if (rowData.nium_order_id) {
          setLoadingOrderId(rowData.nium_order_id);
        }
        sendVkycLink(
          { partner_order_id: rowData.partner_order_id || '' },
          {
            onSuccess: () => {
              setLoadingOrderId('');
            },
            onError: () => {
              setLoadingOrderId('');
            },
          }
        );
      };
      const isPaginationDynamic = false;

      // Use the dynamic pagination hook for fallback




      // Table columns
      const tableColumns = ViewAllTransactionTableColumns({
        isSendEsignLinkLoading,
        isSendVkycLinkLoading,
        loadingOrderId,
        handleRegenerateEsignLink,
        handleRegenerateVkycLink
      });

      // Table config
      const tableConfig = {
        ...staticConfig,
        loading: isLoading,
        export: { enabled: true, fileName: 'view-all-transactions.csv' },
      };

      // Table actions
      const tableActions = {};

  return (
 <div className="data-table-wrap">
     <DataTable
       columns={tableColumns}
       data={dummyTransactionData}
       config={tableConfig}
       actions={tableActions}
     />

   </div>
 )
};

export default ViewAllTransactions;
