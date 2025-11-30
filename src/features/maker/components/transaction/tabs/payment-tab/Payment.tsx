
// import { useDynamicPagination } from "@/components/common/dynamic-table/hooks/useDynamicPagination";
// import { Order } from "@/features/checker/types/updateIncident.types";
import { useMemo, useState } from "react";
// import { useSendEsignLink } from "@/features/checker/hooks/useSendEsignLink";
// import { useSendVkycLink } from "@/features/checker/hooks/useSendVkycLink";
//import useGetAllOrders from "@/features/admin/hooks/useGetAllOrders";
import { PaymentTableColumn } from "./payment-table-column";
// import { DialogWrapper } from "@/components/common/DialogWrapper";
// import Payments from "@/features/admin/components/transaction/tabs/deal-booking/sections/payments/Payments";
import { useSendEsignLink } from "@/hooks/common/useSendEsignLink";
import { useSendVkycLink } from "@/hooks/common/useSendVkycLink";
import { DialogWrapper } from "@/components/common/dialog-wrapper";
import { Order } from "@/types/common/updateIncident.types";
import Payments from "@/components/payments/Payments";
const PaymentStatus = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [loadingOrderId, setLoadingOrderId] = useState<string>('');
       const { mutate: sendEsignLink, isSendEsignLinkLoading } = useSendEsignLink();
       const { mutate: sendVkycLink, isSendVkycLinkLoading } = useSendVkycLink();
      //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
    

      const dummyPaymentTableData = [
          {
            nium_ref_no: 'NIUM123456',
            agent_ref_no: 'AGENT7890',
            created_date: '2024-06-01T12:30:00Z',
            expiry_date: '2024-07-01T12:30:00Z',
            applicant_name: 'John Doe',
            applicant_pan: 'ABCDE1234F',
            transaction_type: 'Remittance',
            purpose: 'Family Maintenance',
            kyc_type: 'Physical',
            kyc_status: 'Completed',
            e_sign_status: 'completed',
            e_sign_link: 'https://esign.example.com/NIUM123456',
            v_kyc_status: 'pending',
            v_kyc_link: null,
            payment_status: 'pending',
            payment_link: 'https://payment.example.com/NIUM123456',
            payment_screenshot: null,
            is_esign_required:true,
            is_v_kyc_required: true
          },
          {
            nium_ref_no: 'NIUM654321',
            agent_ref_no: 'AGENT0987',
            created_date: '2024-06-05T09:15:00Z',
            expiry_date: '2024-07-05T09:15:00Z',
            applicant_name: 'Jane Smith',
            applicant_pan: 'XYZAB6789C',
            transaction_type: 'Investment',
            purpose: 'Mutual Fund',
            kyc_type: 'VKYC',
            kyc_status: 'Pending',
            e_sign_status: 'pending',
            e_sign_link: null,
            v_kyc_status: 'pending',
            v_kyc_link: 'https://vkyc.example.com/NIUM987654',
            payment_status: 'Pending',
            payment_link: null,
            payment_screenshot: null,
            is_esign_required:true,
             is_v_kyc_required: true
          },
          {
            nium_ref_no: 'NIUM987654',
            agent_ref_no: 'AGENT5432',
            created_date: '2024-06-10T15:45:00Z',
            expiry_date: '2024-07-10T15:45:00Z',
            applicant_name: 'Alice Johnson',
            applicant_pan: 'LMNOP1234Q',
            transaction_type: 'Loan Repayment',
            purpose: 'Personal Loan',
            kyc_type: 'Physical',
            kyc_status: 'pending',
            e_sign_status: 'expired',
            e_sign_link: 'https://esign.example.com/NIUM987654',
            v_kyc_status: 'expired',
            v_kyc_link: 'https://vkyc.example.com/NIUM987654',
            payment_status: 'completed',
            payment_link: 'https://payment.example.com/NIUM987654',
            payment_screenshot: null,
            is_esign_required:true,
            is_v_kyc_required: false
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
        const handlePayment = (rowData: Order) => {
          if (rowData.nium_order_id) {
           setLoadingOrderId(rowData.nium_order_id);
         }
        setIsModalOpen(true);
        };
       const isPaginationDynamic = false;
     
       // Use the dynamic pagination hook for fallback
      //  const pagination = useDynamicPagination({
      //    endpoint: '',
      //    initialPageSize: 10,
      //    dataPath: 'transactions',
      //    totalRecordsPath: 'totalRecords',
      //  });
     
       // Table columns
       const tableColumns = PaymentTableColumn({
         isSendEsignLinkLoading,
         isSendVkycLinkLoading,
         loadingOrderId,
         handleRegenerateEsignLink,
         handleRegenerateVkycLink,
         navigate: (path: string) => {},
         handlePayment,
       });
     
   return (
  <div className="dynamic-table-wrap">
       {/* <DynamicTable
         columns={tableColumns}
         data={dummyPaymentTableData}
         defaultSortColumn="created_at"
         defaultSortDirection="desc"
         //loading={isLoading}
         //refreshAction={{
           //isRefreshButtonVisible: false,
          //  onRefresh: refreshData,
          //  isLoading: isLoading,
          //  hasError: error,
        // }}
        //  paginationMode={'static'}
        //  onPageChange={
        //    isPaginationDynamic ? pagination.handlePageChange : async (_page: number, _pageSize: number) => []
        //  }
      
       /> */}
       {isModalOpen && (
             <DialogWrapper title="Upload Payment Screen Shot" isOpen={isModalOpen} setIsOpen={setIsModalOpen} renderContent={<Payments setIsOpen={setIsModalOpen} uploadScreen={false} /> } />
      )}
     </div>
   )
};

export default PaymentStatus;
