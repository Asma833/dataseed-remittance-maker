
import { DynamicTable } from "@/components/common/dynamic-table/DynamicTable";
import { getTransactionTableColumns } from "./update-incident-creation-table-col";
import { transactionTableData as initialData } from "./update-incident-table-value";
import {  useEffect, useState } from "react";
import { DialogWrapper } from "@/components/common/DialogWrapper";
import UpdateIncidentForm from "../incident-form/UpdateIncidentForm";
import { useDynamicPagination } from "@/components/common/dynamic-table/hooks/useDynamicPagination";
// import { API } from "@/core/constant/apis";
import { useFilterApi } from "@/components/common/dynamic-table/hooks/useFilterApi";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useGetUpdateIncident }  from "../../../hooks/useGetUpdate";

const UpdateIncidentCreationTable = () => {
  // const [tableData,setTableData] = useState(initialData);
  const { setTitle } = usePageTitle();
    
    useEffect(() => {
      setTitle("Update Incident");
    }, [setTitle]);
   
    const user = JSON.parse(localStorage.getItem('user') || '')
    const requestData = {
      checkerId: user.hashed_key,
      transaction_type: "all",
    };
    
  
  // Fetch data using the updated hook
  const { data, isLoading, error } = useGetUpdateIncident(requestData);

  const [selectedNiumId, setSelectedNiumId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
   const isTableFilterDynamic = false;
   const isPaginationDynamic = false;
 
   // Use the dynamic pagination hook
   const pagination = useDynamicPagination({
    //  endpoint: API.CHECKER.UPDATE_INCIDENT.SEARCH_FILTER,
    endpoint: "",
     initialPageSize: 10,
     initialData,
     dataPath: "transactions",
     totalRecordsPath: "totalRecords",
   });

  const openModal = (value: string) => {
    setSelectedNiumId(value);
    setIsModalOpen(true);
  };
   const filterApi = useFilterApi({
    endpoint: "",
      // endpoint: API.CHECKER.UPDATE_INCIDENT.SEARCH_FILTER,
      initialData,
      // base query params if needed
      baseQueryParams: {
        // For example: clientId: '123'
      },
    });
    useEffect(() => {
      // console.log(data)
     }, [data]);

  const columns = getTransactionTableColumns(openModal);

  return (
    
    <div className="">
      <div className="flex flex-col">
    <div className="mb-4 flex items-center">
      {(filterApi.loading || pagination.loading || isLoading) && (
        <span className="text-blue-500">Loading data...</span>
      )}
      {(filterApi.error || pagination.error || error) && (
        <span className="text-red-500">Error loading data</span>
      )}
    </div>
   
      <DynamicTable
        columns={columns}
        data={ data && data.orders.length > 0 ? data.orders :[]}
        tableWrapperClass="bg-background p-5 rounded-md"
        defaultSortColumn="nium_order_id"
        defaultSortDirection="asc"
        loading={pagination.loading}
        paginationMode={isPaginationDynamic ? "dynamic" : "static"}
        onPageChange={
          isPaginationDynamic
            ? pagination.handlePageChange
            : async (_page: number, _pageSize: number) => []
        }
        totalRecords={pagination.totalRecords}
        filter={{
          filterOption: true,
          mode: isTableFilterDynamic ? "dynamic" : "static",
          rederFilerOptions: {
            search: true,
          },
          // Dynamic callbacks - API functions
          dynamicCallbacks: isTableFilterDynamic
            ? {
                onSearch: filterApi.search,
              }
            : undefined,
        }}
      />

      {isModalOpen && (
        <DialogWrapper
          triggerBtnText=""
          title="Update Incident"
          footerBtnText=""
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          description={selectedNiumId ?? ""}
          renderContent={
            // <UpdateIncidentForm onSubmit={() => {
            //   if (formRef.current) formRef.current();
            // }} />
            <UpdateIncidentForm />
          }
         
        />
      )}
       </div>
    </div>
  );
};

export default UpdateIncidentCreationTable;
