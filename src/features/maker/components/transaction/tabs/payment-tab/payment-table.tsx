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
import { mapDealDetailsApiToFormInput, mapAllTransactionsToTableRows } from '../../utils/transaction-utils';

const PaymentStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetPaymentDetails();
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();
  const { data: dealDetails, isLoading: isDealLoading } = useGetDealDetails(selectedDealId || undefined);

  const mappedData = useMemo(() => {
    return mapAllTransactionsToTableRows(data as AllTransaction[]);
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

        // Find the mapped row to pass the full data (including raw_data) to view mode
        const rowData = mappedData.find((row) => row.deal_booking_id === selectedDealId);
        if (rowData) {
          initialData.paymentDetails = rowData;
        }

        navigate('../create-transactions', { state: { initialData } });
        setSelectedDealId(null); // Reset after navigation
      } catch (error) {
        console.error('Error processing deal details:', error);
        setSelectedDealId(null);
      }
    }
  }, [dealDetails, selectedDealId, isDealLoading, navigate, mappedData]);

  const handleUploadSubmit = async (file: File) => {
    if (selectedPayment) {
      await uploadChallan({
        id: selectedPayment?.raw_data?.deal.payment_records[0]?.id || '',
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
        columnId: 'order_date',
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
