import { DynamicTable } from "@/components/common/dynamic-table/DynamicTable";

import { useDynamicPagination } from "@/components/common/dynamic-table/hooks/useDynamicPagination";
import { Order } from "@/features/checker/types/updateIncident.types";
import { useMemo, useState } from "react";
import { useSendEsignLink } from "@/features/checker/hooks/useSendEsignLink";
import { useSendVkycLink } from "@/features/checker/hooks/useSendVkycLink";
import useGetAllOrders from "@/features/admin/hooks/useGetAllOrders";
import { KycTableColumnsConfig } from "./KycTableColumns";

const KYCPage = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [loadingOrderId, setLoadingOrderId] = useState<string>('');
       const { mutate: sendEsignLink, isSendEsignLinkLoading } = useSendEsignLink();
       const { mutate: sendVkycLink, isSendVkycLinkLoading } = useSendVkycLink();
      //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
    
  const dummyKYCData = [
  {
    nium_reference_no: 'NIUM001234',
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
    is_esign_required:true,
    is_v_kyc_required: true
  },
  {
    nium_reference_no: 'NIUM005678',
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
    is_esign_required:true,
    is_v_kyc_required: true
  },
  {
    nium_reference_no: 'NIUM009999',
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
    is_esign_required:true,
    is_v_kyc_required: true
  },
];


      //  const tableData = useMemo(() => {
      //    if (!data) return [];
     
      //    // If already an array
      //    if (Array.isArray(data)) {
      //      return (data as Order[]).filter(
      //        (item): item is Order => !!item && typeof item === 'object' && 'created_at' in item
      //      );
      //    }
     
      //    // If object with 'orders' property
      //    if (typeof data === 'object' && 'orders' in data) {
      //      const orders = (data as any).orders;
      //      if (Array.isArray(orders)) {
      //        return orders.filter((item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item);
      //      }
      //      if (orders && typeof orders === 'object') {
      //        return Object.values(orders).filter(
      //          (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
      //        );
      //      }
      //      return [];
      //    }
     
      //    // If object of objects
      //    if (typeof data === 'object') {
      //      return Object.values(data).filter(
      //        (item: any): item is Order => !!item && typeof item === 'object' && 'created_at' in item
      //      );
      //    }
     
      //    return [];
      //  }, [data]);
     
      //  // Format error message consistently
      //  const errorMessage = useMemo(() => {
      //    if (!error) return '';
     
      //    if (typeof error === 'string') {
      //      return error;
      //    }
     
      //    if (error && typeof error === 'object' && 'message' in error) {
      //      return (error as Error).message;
      //    }
     
      //    return 'An unexpected error occurred';
      //  }, [error]);
     
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
       const pagination = useDynamicPagination({
         endpoint: '',
         initialPageSize: 10,
         dataPath: 'transactions',
         totalRecordsPath: 'totalRecords',
       });
     
       // Table columns
       const tableColumns = KycTableColumnsConfig({
         isSendEsignLinkLoading,
         isSendVkycLinkLoading,
         loadingOrderId,
         handleRegenerateEsignLink,
         handleRegenerateVkycLink,
         navigate: (path: string) => {},
       });
     
   return (
  <div className="dynamic-table-wrap">
       <DynamicTable
         columns={tableColumns}
         data={dummyKYCData}
         defaultSortColumn="created_at"
         defaultSortDirection="desc"
         //loading={isLoading}
         //refreshAction={{
           //isRefreshButtonVisible: false,
          //  onRefresh: refreshData,
          //  isLoading: isLoading,
          //  hasError: error,
        // }}
         paginationMode={'static'}
         onPageChange={
           isPaginationDynamic ? pagination.handlePageChange : async (_page: number, _pageSize: number) => []
         }
      
       />
      
     </div>
   )
};

export default KYCPage;
