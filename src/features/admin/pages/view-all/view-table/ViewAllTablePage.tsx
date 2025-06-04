import { useMemo } from 'react';
import ViewAllTable from '@/components/table/common-tables/view-table/ViewAllTable';
import useGetAllOrders from '@/features/admin/hooks/useGetAllOrders';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Order } from '@/features/checker/types/updateIncident.types';

const ViewAllTablePage = () => {
  usePageTitle('View All Orders');
  const {
    data,
    loading: isLoading,
    error,
    fetchData: refreshData,
  } = useGetAllOrders();
 //console.log('ViewAllTablePage data:', data);
  // Memoize table data to prevent unnecessary re-renders
  const tableData = useMemo(() => {
    if (!data) return [];

    // Ensure data is an array, handle different possible data structures
    if (Array.isArray(data)) {
      return data as Order[];
    }

    // If data has an orders property
    if (data && typeof data === 'object' && 'orders' in data) {
      //return (data as any).orders || [];
     return Object.values(data)
    }

    return [];
  }, [data]);

//  const tableData = useMemo((): Order[] => {
//   if (!data) return [];

//   // If response is in format: { 0: {...}, 1: {...}, ... }
//   if (
//     typeof data === 'object' &&
//     data !== null &&
//     !Array.isArray(data) &&
//     Object.keys(data).every((key) => !isNaN(Number(key)))
//   ) {
//     return Object.values(data) ;
//   }

//   // If it's already an array
//   if (Array.isArray(data)) {
//     return data as Order[];
//   }

//   // If it's a plain object
//   if (typeof data === 'object') {
//     return [data as any];
//   }

//   return [];
// }, [data]);



  // Format error message consistently
  const errorMessage = useMemo(() => {
    if (!error) return '';

    if (typeof error === 'string') {
      return error;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return (error as Error).message;
    }

    return 'An unexpected error occurred';
  }, [error]);
  console.log('ViewAllTablePage tableData:', tableData);
  return (
    <ViewAllTable
      tableData={tableData}
      checkerOrdersLoading={isLoading}
      checkerOrdersError={errorMessage}
      refreshData={refreshData}
      disableColumns={['generate_esign_link', 'partner_id']}
    />
  );
};

export default ViewAllTablePage;
