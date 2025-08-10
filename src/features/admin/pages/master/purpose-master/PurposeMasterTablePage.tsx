import { useMemo, useState } from 'react';
import { DynamicTable } from '@/components/common/dynamic-table/DynamicTable';
import { useDynamicPagination } from '@/components/common/dynamic-table/hooks/useDynamicPagination';
import { PurposeMasterTableColumn } from './purpose-master-table-column';
import { Button } from '@/components/ui/button';
import { GitFork, Plus, PlusIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';
import { DialogWrapper } from '@/components/common/DialogWrapper';
import CreatePurposeMasterPage from './create-purpose-master/CreatePurposeMasterPage';
import TransactionMapping from './transaction/TransactionMappingForm';
import { Dialog, DialogContent } from '@mui/material';
import { cn } from '@/utils/cn';

const PurposeMasterTablePage = () => {
  const { data, isLoading, error, refetch } = useGetData({
    endpoint: API.PURPOSE.GET_PURPOSES,
    queryKey: ['getPurposeList'],
  });
  const [dialogTitle, setDialogTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const navigate = useNavigate();

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
  const openTransactionMappingModal = (rowData: any) => {
    setIsMappingModalOpen(true);
    setRowData(rowData);
  };
  const handleEditPurpose = (rowData: any) => {
    setDialogTitle('Edit Purpose');
    setIsModalOpen(true);
    setRowData(rowData);
  };
  const tableColumns = PurposeMasterTableColumn({ openTransactionMappingModal, handleEditPurpose });
  const handleCreateUser = () => {
    navigate('/admin/master/purpose-master/document-mapping');
  };

  return (
    <div className="dynamic-table-wrap pl-4">
      <DynamicTable
        columns={tableColumns}
        data={formateDataArray}
        defaultSortColumn="created_at"
        defaultSortDirection="desc"
        renderLeftSideActions={() => (
            <>
            <DialogWrapper
              triggerBtnText="Add Purpose"
              triggerBtnClassName="bg-custom-primary text-white hover:bg-custom-primary-hover"
              title={dialogTitle}
              isOpen={isModalOpen}
              setIsOpen={(open) => {
              setIsModalOpen(open);
              if (open) {
                setRowData(undefined);
                setDialogTitle('Add Purpose');
              }
              }}
              description=""
              renderContent={
              <>
                <CreatePurposeMasterPage
                setDialogTitle={setDialogTitle}
                rowData={rowData}
                refetch={refetch ?? (() => {})}
                setIsModalOpen={setIsModalOpen}
                />
              </>
              }
              footerBtnText=""
            />
            
            <Button onClick={handleCreateUser} className="bg-primary text-white hover:bg-primary ml-4">
              <GitFork className='rotate-180' /> Document Mapping
            </Button>
            </>
        )}
        paginationMode={'static'}
        onPageChange={
          isPaginationDynamic ? pagination.handlePageChange : async (_page: number, _pageSize: number) => []
        }
      />



      <Dialog open={isMappingModalOpen} onClose={() => setIsMappingModalOpen(false)} >
        <DialogContent className={cn('sm:max-w-[400px] md:min-w-[500px] w-full max-h-[90%] overflow-auto')}>
          <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{'Transaction Mapping'}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMappingModalOpen(false)}
          aria-label="Close"
        >
          <X className="w-8 h-8 text-primary hover:opacity-95 outline-none font-bold" />
        </Button>
          </div>
          {rowData && <TransactionMapping rowData={rowData} setIsMappingModalOpen={setIsMappingModalOpen} refetch={refetch ?? (() => {})} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurposeMasterTablePage;
