import { useState } from 'react';
import { GetPaymentTableColumn } from './payment-table-column';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { Order } from '@/types/common/updateIncident.types';
import Payments from '@/components/payments/Payments';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetData } from '@/hooks/useGetData';
import { API } from '@/core/constant/apis';

interface PaymentData {
  ref_no: string;
  agent_ref_no: string;
  created_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  e_sign_status: string;
  e_sign_link: string | null;
  v_kyc_status: string;
  v_kyc_link: string | null;
  payment_status: string;
  payment_link: string | null;
  payment_screenshot: string | null;
  is_esign_required: boolean;
  is_v_kyc_required: boolean;
}

const dummyPaymentTableData: PaymentData[] = [
  {
    ref_no: 'NIUM123456',
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
    is_esign_required: true,
    is_v_kyc_required: true,
  },
];

const PaymentStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetData({
    endpoint: API.TRANSACTION.GET_PAYMENT_STATUS,
    // id: requestId,
    queryKey: ['get-payment-status'],
    dataPath: 'data.submittedFeedback',
    enabled: true,
  });

  const handlePayment = (rowData: Order) => {
    if (rowData.nium_order_id) {
      console.log(rowData.nium_order_id);
    }
    setIsModalOpen(true);
  };

  const tableColumns = GetPaymentTableColumn({ handlePayment });

  const tableConfig = {
    ...staticConfig,
    loading: isLoading,
    export: { enabled: true, fileName: 'payment-status.csv' },
    filters: {
      ...staticConfig.filters!,
      dateRangeFilter: {
        enabled: true,
        columnId: 'order_date',
        useMuiDateRangePicker: true,
      },
    },
  };

  // Table actions
  const tableActions = {};

  return (
    <div className="data-table-wrap">
      <DataTable
        columns={tableColumns}
        data={dummyPaymentTableData ?? data ?? []}
        config={tableConfig}
        actions={tableActions}
      />
      {isModalOpen && (
        <DialogWrapper
          title="Upload Payment Screen Shot"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          renderContent={<Payments setIsOpen={setIsModalOpen} uploadScreen={false} />}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
