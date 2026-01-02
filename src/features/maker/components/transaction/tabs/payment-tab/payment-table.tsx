import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPaymentTableColumn } from './payment-table-column';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import Payments from '@/components/payments/Payments';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { useUploadPaymentChallan } from '../../hooks/useUploadPaymentChallan';
import { useGetDealDetails } from '../../hooks/useGetDealDetails';
import { AllTransaction, PaymentData } from '../../types/payment.types';
import { mapDealDetailsApiToFormInput } from '../../utils/transaction-utils';

const PaymentStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetPaymentDetails();
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();
  const { data: dealDetails, isLoading: isDealLoading } = useGetDealDetails(selectedDealId || undefined);

  const mappedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return (data as AllTransaction[]).flatMap((deal: AllTransaction) =>
      deal.payment_records.map((payment) => {
        const transaction = deal.transactions[0]; // Assuming one transaction per deal
        return {
          id: payment.id,
          ref_no: transaction?.company_ref_number || '-',
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
          rejection_reason: deal.rejection_reason || '-',
          margin_amount: deal.margin_amount || '-',
          transaction: transaction,
          transaction_id: transaction?.transaction_id,
          deal_booking_id:transaction?.deal_booking_id
        } as PaymentData;
      })
    );
  }, [data]);

  const handlePayment = (rowData: PaymentData) => {
    setSelectedPayment(rowData);
    setIsModalOpen(true);
  };

  const handleViewTransaction = (rowData: PaymentData) => {
    if (rowData.deal_booking_id) {
      setSelectedDealId(rowData.deal_booking_id);
    }
  };

  // Handle navigation when deal details are loaded
  useEffect(() => {
    if (dealDetails && selectedDealId && !isDealLoading) {
      try {
        const initialData = mapDealDetailsApiToFormInput(dealDetails, selectedDealId);
        navigate('../create-transactions', { state: { initialData } });
        setSelectedDealId(null); // Reset after navigation
      } catch (error) {
        console.error('Error processing deal details:', error);
        setSelectedDealId(null);
      }
    }
  }, [dealDetails, selectedDealId, isDealLoading, navigate]);

  const handleUploadSubmit = async (file: File) => {
    if (selectedPayment) {
      await uploadChallan({
        id: selectedPayment.id,
        file,
      });
    }
  };

  const tableColumns = GetPaymentTableColumn({ handlePayment, handleViewTransaction });

  const tableConfig = {
    ...staticConfig,
    loading: isLoading,
    export: { enabled: true, fileName: 'payment-status.csv' },
    filters: {
      ...staticConfig.filters!,
      dateRangeFilter: {
        enabled: true,
        columnId: 'created_date',
        useMuiDateRangePicker: true,
      },
    },
  };

  // Table actions
  const tableActions = {};

  return (
    <div className="data-table-wrap">
      <DataTable columns={tableColumns} data={mappedData ?? []} config={tableConfig} actions={tableActions} />
      {isModalOpen && selectedPayment && (
        <DialogWrapper
          title="Upload Payment Screen Shot"
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          showCloseButton={false}
          renderContent={
            <Payments
              setIsOpen={setIsModalOpen}
              uploadScreen={false}
              data={selectedPayment}
              onSubmit={handleUploadSubmit}
            />
          }
        />
      )}
    </div>
  );
};

export default PaymentStatus;
