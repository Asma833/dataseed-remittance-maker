import { useState, useMemo } from 'react';
import { GetPaymentTableColumn } from './payment-table-column';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { Order } from '@/types/common/updateIncident.types';
import Payments from '@/components/payments/Payments';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';




const PaymentStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetPaymentDetails();

  const mappedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return (data as AllTransaction[]).flatMap((deal: AllTransaction) =>
      deal.payment_records.map((payment) => {
        const transaction = deal.transactions[0]; // Assuming one transaction per deal
        return {
          ref_no: transaction?.transaction_id || '-',
          agent_ref_no: transaction?.agent_ref_number || '-',
          created_date: deal.created_at || '-',
          expiry_date: transaction?.order_expiry || '-',
          applicant_name: transaction?.kyc_details?.applicant_name || '-',
          applicant_pan: transaction?.kyc_details?.applicant_pan || '-',
          transaction_type: deal.transaction_type || '-',
          kyc_type: '-',
          kyc_status: transaction?.kyc_status || '-',
          purpose: transaction?.purpose || '-',
          payment_status: payment.payment_status || '-',
          payment_link: null,
          payment_screenshot: null,
          fx_currency: transaction?.fx_currency || '-',
          fx_amount: transaction?.fx_amount || '-',
          settlement_rate: deal.settlement_rate || '-',
          customer_rate: deal.customer_rate || '-',
          transaction_amount: transaction?.transaction_amount || '-',
        } as PaymentData;
      })
    );
  }, [data]);

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
        data={mappedData ?? []}
        config={tableConfig}
        actions={tableActions}
      />
      {isModalOpen && (
        <DialogWrapper
          title="Upload Payment Screen Shot"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          showCloseButton={false}
          renderContent={<Payments setIsOpen={setIsModalOpen} uploadScreen={false} />}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
