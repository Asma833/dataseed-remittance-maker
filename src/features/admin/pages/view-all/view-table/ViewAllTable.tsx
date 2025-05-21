import { DynamicTable } from '@/components/common/dynamic-table/DynamicTable';
import { useDynamicPagination } from '@/components/common/dynamic-table/hooks/useDynamicPagination';
import { Button } from '@/components/ui/button';
import { API } from '@/core/constant/apis';
import { GetTransactionTableColumns } from './ViewAllTableColumns';
import { exportToCSV } from '@/utils/exportUtils';
import { usePageTitle } from '@/hooks/usePageTitle';
import useGetAllOrders from '@/features/admin/hooks/useGetAllOrders';
import {
  purposeTypeOptions,
  transactionTypeOptions,
} from '@/features/checker/config/table-filter.config';

const ViewAllTable = () => {
  usePageTitle('View All');

  const {
    data: viewAllData,
    loading: viewAllLoading,
    error: viewAllError,
    fetchData: refreshData,
  } = useGetAllOrders();

  // Use the dynamic pagination hook for fallback
  const pagination = useDynamicPagination({
    endpoint: API.CHECKER.VIEW_ALL.SEARCH_FILTER,
    initialPageSize: 10,
    dataPath: 'transactions',
    totalRecordsPath: 'totalRecords',
  });

  const columns = GetTransactionTableColumns();

  const handleExportToCSV = () => {
    const dataToExport = viewAllData || [];

    const exportColumns = columns.map((col) => ({
      accessorKey: col.id,
      header: col.name,
    }));

    exportToCSV(dataToExport, exportColumns, 'view-all');
  };

  const isLoading = viewAllLoading || pagination.loading;
  const hasError = viewAllError || pagination.error;
  const totalRecords = viewAllData?.totalOrders || pagination.totalRecords || 0;

  return (
    <div className="dynamic-table-wrap">
      <DynamicTable
        columns={columns}
        data={viewAllData || []}
        defaultSortColumn="niumId"
        defaultSortDirection="asc"
        loading={isLoading}
        refreshAction={{
          isRefreshButtonVisible: true,
          onRefresh: refreshData,
          isLoading: isLoading,
          hasError: hasError,
        }}
        paginationMode={'static'}
        onPageChange={async (_page: number, _pageSize: number) => []}
        totalRecords={totalRecords}
        filter={{
          filterOption: true,
          mode: 'static',
          dateFilterColumn: 'created_at',
          statusFilerColumn: 'status',
          roleFilerColumn: 'role',
          renderFilterOptions: {
            search: true,
            dateRange: true,
            applyAction: true,
            resetAction: true,
            selects: [
              {
                id: 'purpose_type_name.purpose_name',
                label: 'Purpose Type',
                placeholder: 'Select',
                options: purposeTypeOptions,
              },
              {
                id: 'transaction_type_name.name',
                label: 'Transaction Type',
                placeholder: 'Select',
                options: transactionTypeOptions,
              },
            ],
          },
        }}
      />
      <div className="flex justify-center sm:justify-start mt-4 gap-3">
        <Button onClick={handleExportToCSV}>Export CSV</Button>
      </div>
    </div>
  );
};

export default ViewAllTable;
