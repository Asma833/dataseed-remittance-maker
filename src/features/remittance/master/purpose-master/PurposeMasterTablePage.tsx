import { useMemo, useState } from 'react';
import { DynamicTable } from '@/components/common/dynamic-table/DynamicTable';
import { useDynamicPagination } from '@/components/common/dynamic-table/hooks/useDynamicPagination';
import { PurposeMasterTableColumn } from './purpose-master-table-column';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';

const PurposeMasterTablePage = () => {

   const { data, isLoading, error, refetch } = useGetData({
      endpoint: API.PURPOSE.GET_PURPOSES,
      queryKey: ['getPurposeList'],
    });
  const [dialogTitle, setDialogTitle] = useState('');
  const navigate = useNavigate();
  // const dummyData = [
  //   {
  //     purpose_name: 'Education Loan',
  //     purpose_code: 'EDU001',
  //     is_active: true,
  //   },
  //   {
  //     purpose_name: 'Medical Treatment',
  //     purpose_code: 'MED002',
  //     is_active: false,
  //   },
  //   {
  //     purpose_name: 'Business Investment',
  //     purpose_code: 'BUS003',
  //     is_active: true,
  //   },
  //   {
  //     purpose_name: 'Travel Expenses',
  //     purpose_code: 'TRV004',
  //     is_active: false,
  //   },
  //   {
  //     purpose_name: 'Home Renovation',
  //     purpose_code: 'HOM005',
  //     is_active: true,
  //   },
  // ];

 const formateDataArray = useMemo(() => {
     if (!data) return [];
 
     if (Array.isArray(data)) {
       return data.filter((item) => item != null);
     }
 
     // If data is an object, extract values and ensure they form a proper array
     if (typeof data === 'object' && data !== null) {
       // const values = Object.values(data as Record<string, any>);
       return (
         Object.values(data)
           .flat()
           .filter((item) => item != null) || []
       );
     }
 
     return [];
   }, [data]);

  const isPaginationDynamic = false;

  // Use the dynamic pagination hook for fallback
  const pagination = useDynamicPagination({
    endpoint: '',
    initialPageSize: 10,
    dataPath: 'transactions',
    totalRecordsPath: 'totalRecords',
  });

  const tableColumns = PurposeMasterTableColumn();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateUser = () => {
    navigate('/admin/master/purpose-master/add-purpose');
  };

  return (
    <div className="dynamic-table-wrap pl-4">
      <DynamicTable
        columns={tableColumns}
        data={formateDataArray}
        defaultSortColumn="created_at"
        defaultSortDirection="desc"
        renderLeftSideActions={() => (
          <Button onClick={handleCreateUser} className="bg-primary text-white hover:bg-primary">
            {' '}
            <PlusIcon /> Add Purpose
          </Button>
        )}
        paginationMode={'static'}
        onPageChange={
          isPaginationDynamic ? pagination.handlePageChange : async (_page: number, _pageSize: number) => []
        }
      />
    </div>
  );
};

export default PurposeMasterTablePage;
