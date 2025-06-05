// import React from 'react';

// type Props = {};

// const VIewStatus = (props: Props) => {
//   return <div className="dynamic-table-wrap">
//         <DynamicTable
//           columns={tableColumns}
//           data={tableData}
//           defaultSortColumn="niumId"
//           defaultSortDirection="asc"
//           loading={isLoading}
//           refreshAction={{
//             isRefreshButtonVisible: true,
//             onRefresh: refreshData,
//             isLoading: isLoading,
//             hasError: hasError,
//           }}
//           paginationMode={'static'}
//           onPageChange={
//             isPaginationDynamic ? pagination.handlePageChange : async (_page: number, _pageSize: number) => []
//           }
//           filter={{
//             filterOption: true,
//             mode: 'static',
//             dateFilterColumn: 'created_at',
//             renderFilterOptions: {
//               search: true,
//               dateRange: true,
//               applyAction: true,
//               resetAction: true,
//               selects: [
//                 {
//                   id: 'purpose_type_name.purpose_name',
//                   label: 'Purpose Type',
//                   placeholder: 'Select',
//                   options: purposeTypeOptions,
//                 },
//                 {
//                   id: 'transaction_type_name.name',
//                   label: 'Transaction Type',
//                   placeholder: 'Select',
//                   options: transactionTypeOptions,
//                 },
//               ],
//             },
//           }}
//         />;
//         </div>
// };

// export default VIewStatus;
