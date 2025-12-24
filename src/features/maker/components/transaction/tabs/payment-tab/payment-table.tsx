import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPaymentTableColumn } from './payment-table-column';
import { DialogWrapper } from '@/components/common/dialog-wrapper';
import { Order } from '@/types/common/updateIncident.types';
import Payments from '@/components/payments/Payments';
import { DataTable } from '@/components/table/data-table';
import { staticConfig } from '@/components/table/config';
import { useGetPaymentDetails } from '../../hooks/useGetPaymentDetails';
import { useUploadPaymentChallan } from '../../hooks/useUploadPaymentChallan';
import { AllTransaction, PaymentData } from '../../types/payment.types';

const PaymentStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetPaymentDetails();
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();

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
          transaction_id:transaction?.transaction_id
        } as PaymentData;
      })
    );
  }, [data]);

  const handlePayment = (rowData: PaymentData) => {
    setSelectedPayment(rowData);
    setIsModalOpen(true);
  };

  const handleViewTransaction = (rowData:any) => {
    const transaction = rowData.transaction;
    const kyc = transaction.kyc_details;
    const initialData = {
      transactionDetails: {
        company_reference_number: transaction.company_ref_number || '',
        agent_reference_number: transaction.agent_ref_number || '',
        purpose: transaction.purpose || '',
        transaction_purpose_map_id: transaction.transaction_purpose_map_id || '',
        fx_currency: transaction.fx_currency || '',
        fx_amount: transaction.fx_amount || '',
        company_settlement_rate: rowData.settlement_rate || '',
        add_margin: rowData?.margin_amount || '', 
        customer_rate: rowData.customer_rate || '',
        nostro_charges: transaction.nostro_charges_amount || '',
        applicant_name: kyc?.applicant_name || '',
        applicant_pan_number: kyc?.applicant_pan || '',
        applicant_email: kyc?.applicant_email || '',
        applicant_mobile_number: kyc?.applicant_mobile || '',
        source_of_funds: kyc?.source_of_funds || '',
        paid_by: kyc?.paid_by || '',
        payee_name: kyc?.payee_name || '',
        payee_pan_number: kyc?.payee_pan || '',
        applicant_id_document: kyc?.applicant_id_document || '',
        passport_number: kyc?.passport_number || '',
        place_of_issue: kyc?.place_of_issue || '',
        passport_issue_date: kyc?.passport_issue_date, 
        passport_expiry_date: kyc?.passport_expiry_date , 
        applicant_address: kyc?.applicant_address || '',
        applicant_city: kyc?.applicant_city || '',
        applicant_state: kyc?.applicant_state || '',
        applicant_country: kyc?.applicant_country || '',
        postal_code: kyc?.postal_code || '',
      },
      beneficiaryDetails: {
        beneficiary_name: kyc?.beneficiary_name || '',
        beneficiary_address: kyc?.beneficiary_address || '',
        beneficiary_city: kyc?.beneficiary_city || '',
        beneficiary_country: kyc?.beneficiary_country || '',
        beneficiary_account_number_iban_number: kyc?.beneficiary_account_number || '',
        beneficiary_swift_code: kyc?.beneficiary_swift_code || '',
        beneficiary_bank_name: kyc?.beneficiary_bank_name || '',
        beneficiary_bank_address: kyc?.beneficiary_bank_address || '',
        sort_bsb_aba_transit_code: kyc?.sort_bsb_aba_transit_code || '',
        message_to_beneficiary_additional_information: kyc?.message_to_beneficiary || '',
        student_name: kyc?.student_name || '',
        student_passport_number: kyc?.student_passport_number || '',
        payment_instruction_number: kyc?.payment_instruction_number || '', 
        university_name: kyc?.university_name || '',
        intermediaryBankDetails: kyc?.intermediary_bank_details || '', 
        intermediary_bank_account_number: kyc?.intermediary_bank_account_number || '',
        intermediary_bank_swift_code: kyc?.intermediary_bank_swift_code || '',
        intermediary_bank_name: kyc?.intermediary_bank_name || '',
        intermediary_bank_address: kyc?.intermediary_bank_address || '',
      },
      currencyDetails: {
        fx_currency: transaction.fx_currency || '',
        fx_amount: transaction.fx_amount || '',
        settlement_rate: rowData.settlement_rate || '',
        add_margin: rowData.margin_amount, 
        customer_rate: rowData.customer_rate || '',
        declared_education_loan_amount: kyc?.declared_education_loan_amount || '',
        previous_transaction_amount: kyc?.previous_transaction_amount || '',
        declared_previous_amount: kyc?.declared_previous_amount || '',
        total_transaction_amount_tcs: kyc?.total_transaction_amount_tcs || '',
        invoiceRateTable: {
          transaction_value: {
            company_rate: '', // not available
            agent_mark_up: '', // not available
            rate: transaction.transaction_amount || '',
          },
          remittance_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: transaction.remittance_charges || '',
          },
          nostro_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: transaction.nostro_charges_amount || '',
          },
          other_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: transaction.other_charges || '',
          },
          transaction_amount: {
            rate: transaction.transaction_amount || '',
          },
          gst_amount: {
            rate: transaction.total_gst_amount || '',
          },
          total_inr_amount: {
            rate: transaction.total_inr_amount || '',
          },
          tcs: {
            rate: transaction.tcs || '',
          },
        },
      },
      paymentDetails: rowData,
    };
    navigate('../create-transactions', { state: { initialData } });
  };

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
