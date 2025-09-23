
import React, { useState } from 'react';
import CreatePurposeDocumentPage from '../form/create-purpose-document-page';
import { PurposeDocumentTableConfig } from './purpose-document-table.config';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { DataTable } from '@/components/table/data-table';
// import { useDynamicPagination } from '@/components/common/dynamic-table/hooks/useDynamicPagination';

export const PurposeDocumentsTable = () => {
  //  const { data, loading: isLoading, error, fetchData: refreshData } = useGetAllOrders();
  const [dialogTitle, setDialogTitle] = useState('');

  const dummyData = [
    {
      id: 1,
      selected: true,
      documentName: 'PAN Card',
      requirement: 'Mandatory',
    },
    {
      id: 2,
      selected: false,
      documentName: 'Aadhar Card',
      requirement: 'Non-mandatory',
    },
    {
      id: 3,
      selected: true,
      documentName: 'Passport',
      requirement: 'Mandatory',
    },
    {
      id: 4,
      selected: false,
      documentName: 'Driving License',
      requirement: 'Non-mandatory',
    },
    {
      id: 5,
      selected: true,
      documentName: 'Voter ID',
      requirement: 'Mandatory',
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

  const isPaginationDynamic = false;


  const tableColumns = PurposeDocumentTableConfig();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dynamic-table-wrap relative">
      {/* <p className="absolute top-1 left-0 p-4 font-semibold">Required Documents</p> */}
      {/* <DataTable
        columns={tableColumns}
        data={dummyData}
        defaultSortColumn="created_at"
        defaultSortDirection="desc"
        renderRightSideActions={() => (
          <DialogWrapper
            triggerBtnText="Add Documents"
            triggerBtnClassName="bg-custom-primary text-white hover:bg-custom-primary-hover"
            title={dialogTitle}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            description=""
            renderContent={
              <>
                <CreatePurposeDocumentPage setDialogTitle={setDialogTitle} />
              </>
            }
            footerBtnText=""
          />
        )}
        paginationMode={'static'}
        
      /> */}
    </div>
  );
};
