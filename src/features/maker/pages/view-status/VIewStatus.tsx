import React, { useState, useMemo } from 'react';
import { DynamicTable } from '@/components/common/dynamic-table/DynamicTable';
import { ViewStatusColumns } from './ViewStatusColumns';

const ViewStatus: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Dummy data for the table
  const dummyData = useMemo(() => [
    {
      nium_order_id: 'TX-12345',
      created_at: '2023-05-15T10:30:00',
      expiry_date: '2023-06-15T10:30:00',
      applicant_name: 'John Smith',
      applicant_pan_no: 'ABCDE1234F',
      transaction_type_name: { name: 'Inward Remittance' },
      purpose_type_name: { purpose_name: 'Education Fee' },
      transaction_status: 'Completed',
      e_sign_status: 'completed',
      e_sign_link: 'https://example.com/esign/12345',
      view_action:true
    },
    {
      nium_order_id: 'TX-12346',
      created_at: '2023-05-16T11:45:00',
      expiry_date: '2023-06-16T11:45:00',
      applicant_name: 'Emma Johnson',
      applicant_pan_no: 'FGHIJ5678K',
      transaction_type_name: { name: 'Outward Remittance' },
      purpose_type_name: { purpose_name: 'Medical Treatment' },
      transaction_status: 'Pending',
      e_sign_status: 'rejected',
      e_sign_link: 'https://example.com/esign/12346',
      view_action:true
    },
    {
      nium_order_id: 'TX-12347',
      created_at: '2023-05-17T09:15:00',
      expiry_date: '2023-06-17T09:15:00',
      applicant_name: 'Robert Brown',
      applicant_pan_no: 'LMNOP9012Q',
      transaction_type_name: { name: 'Inward Remittance' },
      purpose_type_name: { purpose_name: 'Family Maintenance' },
      transaction_status: 'In Progress',
      e_sign_status: 'expired',
      e_sign_link: 'https://example.com/esign/12347',
      view_action:true
    },
    {
      nium_order_id: 'TX-12348',
      created_at: '2023-05-18T14:20:00',
      expiry_date: '2023-06-18T14:20:00',
      applicant_name: 'Sarah Wilson',
      applicant_pan_no: 'QRSTU3456V',
      transaction_type_name: { name: 'Outward Remittance' },
      purpose_type_name: { purpose_name: 'Business Travel' },
      transaction_status: 'Rejected',
      e_sign_status: 'pending',
      e_sign_link: '',
      view_action:true
    },
    {
      nium_order_id: 'TX-12349',
      created_at: '2023-05-19T16:30:00',
      expiry_date: '2023-06-19T16:30:00',
      applicant_name: 'Michael Davis',
      applicant_pan_no: 'VWXYZ7890A',
      transaction_type_name: { name: 'Inward Remittance' },
      purpose_type_name: { purpose_name: 'Investment' },
      transaction_status: 'Completed',
      e_sign_status: 'completed',
      e_sign_link: 'https://example.com/esign/12349',
      view_action:true
    }
  ], []);


  // Table columns
  const tableColumns = ViewStatusColumns({});

  // Mock refresh function
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="dynamic-table-wrap">
      <DynamicTable
        columns={tableColumns}
        data={dummyData}
        defaultSortColumn="nium_order_id"
        defaultSortDirection="asc"
        loading={isLoading}
        refreshAction={{
          isRefreshButtonVisible: true,
          onRefresh: refreshData,
          isLoading: isLoading,
          hasError: hasError
        }}
        paginationMode={'static'}
        onPageChange={async (_page: number, _pageSize: number) => []}
        filter={{
          filterOption: true,
          mode: 'static',
          dateFilterColumn: 'created_at',
          renderFilterOptions: {
            search: true,
            dateRange: true,
            applyAction: true,
            resetAction: true,
          },
        }}
      />
    </div>
  );
};

export default ViewStatus;