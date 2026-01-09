import { CreateTransactionFormInput } from '../tabs/create-transactions-tab/create-transaction-form/form/common-schema';
import { PaymentData, AllTransaction } from '../types/payment.types';
import { DealDetailsApiResponse } from '../types/create-transaction.types';

type InitialData = Partial<
  CreateTransactionFormInput & {
    paymentDetails?: { payment_method: string } | PaymentData | AllTransaction;
    deal_booking_id?: string;
  }
>;

export const mapAllTransactionsToTableRows = (data: AllTransaction[]): PaymentData[] => {
  if (!data || !Array.isArray(data)) return [];
  return data.flatMap((deal: AllTransaction) =>
    deal.transactions.map(
      (transaction): PaymentData => ({
        id: transaction.id || '-',
        transaction_id: transaction.transaction_id || '-',
        deal_booking_id: transaction.deal_booking_id || deal.deal_booking_id || '-',
        ref_no: transaction.company_ref_number || '-',
        agent_ref_no: transaction.agent_ref_number || '-',
        order_date: transaction.order_date || deal.created_at || '-',
        expiry_date: transaction.order_expiry || '-',
        applicant_name: transaction.kyc_details?.applicant_name || '-',
        applicant_pan: transaction.kyc_details?.applicant_pan || '-',
        transaction_type: deal.transaction_type || '-',
        payment_challan_url: deal.payment_records?.[0]?.payment_challan_url || '',
        purpose: transaction.purpose || '-',
        kyc_type: 'VKYC', // Default or derived
        kyc_status: transaction.kyc_status || '-',
        payment_status: deal.payment_records?.[0]?.payment_status || 'pending',
        payment_link: null,
        payment_screenshot: null,
        fx_currency: transaction.fx_currency || '-',
        fx_amount: transaction.fx_amount || '-',
        fx_rate: deal.customer_rate || '-',
        settlement_rate: deal.settlement_rate || '-',
        customer_rate: deal.customer_rate || '-',
        transaction_amount: transaction.transaction_amount || '-',
        rejection_reason: deal.rejection_reason || '-',
        kyc_upload_status:
          transaction.kyc_status === 'UPLOADED' || transaction.kyc_status === 'COMPLETED' ? 'Uploaded' : 'Pending',
        completion_date: null,
        swift_copy: transaction.swift_copy || null,
        transaction_status: transaction.transaction_status || '-',
        raw_data: {
          deal,
          transaction,
        },
      })
    )
  );
};

export const mapDealDetailsApiToFormInput = (
  apiResponse: DealDetailsApiResponse,
  dealBookingId: string
): InitialData => {
  return {
    deal_booking_id: dealBookingId,
    currencyDetails: {
      fx_currency: apiResponse.currencyDetails.fx_currency || '',
      fx_amount: apiResponse.currencyDetails.fx_amount || '',
      settlement_rate: apiResponse.currencyDetails.settlement_rate || '',
      add_margin: apiResponse.currencyDetails.add_margin || '',
      customer_rate: apiResponse.currencyDetails.customer_rate || '',
      declared_education_loan_amount: apiResponse.currencyDetails.declared_education_loan_amount || '0',
      previous_transaction_amount: apiResponse.currencyDetails.previous_transaction_amount || '0',
      declared_previous_amount: apiResponse.currencyDetails.declared_previous_amount || '0',
      total_transaction_amount_tcs: apiResponse.currencyDetails.invoiceRateTable.tcs || '0',
      invoiceRateTable: {
        transaction_value: {
          company_rate: apiResponse.currencyDetails.invoiceRateTable.transaction_value.company_rate || '',
          agent_mark_up: apiResponse.currencyDetails.invoiceRateTable.transaction_value.agent_mark_up || '',
          rate: apiResponse.currencyDetails.invoiceRateTable.transaction_value.rate || '',
        },
        remittance_charges: {
          company_rate: apiResponse.currencyDetails.invoiceRateTable.remittance_charges.company_rate || '',
          agent_mark_up: apiResponse.currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up || '',
          rate: apiResponse.currencyDetails.invoiceRateTable.remittance_charges.rate.toString() || '',
        },
        nostro_charges: {
          company_rate: apiResponse.currencyDetails.invoiceRateTable.nostro_charges.company_rate || '',
          agent_mark_up: apiResponse.currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up || '',
          rate: apiResponse.currencyDetails.invoiceRateTable.nostro_charges.rate.toString() || '',
        },
        other_charges: {
          company_rate: apiResponse.currencyDetails.invoiceRateTable.other_charges.company_rate || '',
          agent_mark_up: apiResponse.currencyDetails.invoiceRateTable.other_charges.agent_mark_up || '',
          rate: apiResponse.currencyDetails.invoiceRateTable.other_charges.rate.toString() || '',
        },
        transaction_amount: {
          rate: apiResponse.currencyDetails.invoiceRateTable.transaction_amount || '0',
        },
        gst_amount: {
          rate: apiResponse.currencyDetails.invoiceRateTable.gst_amount || '0',
        },
        total_inr_amount: {
          rate: apiResponse.currencyDetails.invoiceRateTable.total_inr_amount || '0',
        },
        tcs: {
          rate: apiResponse.currencyDetails.invoiceRateTable.tcs || '0',
        },
      },
    },
    beneficiaryDetails: {
      beneficiary_name: apiResponse.beneficiaryDetails.beneficiary_name || '',
      beneficiary_address: apiResponse.beneficiaryDetails.beneficiary_address || '',
      beneficiary_city: apiResponse.beneficiaryDetails.beneficiary_city || '',
      beneficiary_country: apiResponse.beneficiaryDetails.beneficiary_country || '',
      beneficiary_account_number_iban_number:
        apiResponse.beneficiaryDetails.beneficiary_account_number_iban_number || '',
      beneficiary_swift_code: apiResponse.beneficiaryDetails.beneficiary_swift_code || '',
      beneficiary_bank_name: apiResponse.beneficiaryDetails.beneficiary_bank_name || '',
      beneficiary_bank_address: apiResponse.beneficiaryDetails.beneficiary_bank_address || '',
      sort_bsb_aba_transit_code: apiResponse.beneficiaryDetails.sort_bsb_aba_transit_code || '',
      message_to_beneficiary_additional_information:
        apiResponse.beneficiaryDetails.message_to_beneficiary_additional_information || '',
      student_name: apiResponse.beneficiaryDetails.student_name || '',
      student_passport_number: apiResponse.beneficiaryDetails.student_passport_number || '',
      university_name: apiResponse.beneficiaryDetails.university_name || '',
      intermediaryBankDetails: (apiResponse.beneficiaryDetails.intermediaryBankDetails as 'yes' | 'no') || 'no',
      intermediary_bank_account_number: apiResponse.beneficiaryDetails.intermediary_bank_account_number || '',
      intermediary_bank_swift_code: apiResponse.beneficiaryDetails.intermediary_bank_swift_code || '',
      intermediary_bank_name: apiResponse.beneficiaryDetails.intermediary_bank_name || '',
      intermediary_bank_address: apiResponse.beneficiaryDetails.intermediary_bank_address || '',
    },
    transactionDetails: {
      company_reference_number: apiResponse.transactionDetails.company_reference_number || '',
      agent_reference_number: apiResponse.transactionDetails.agent_reference_number || '',
      purpose: apiResponse.transactionDetails.purpose || '',
      transaction_purpose_map_id: apiResponse.transactionDetails.transaction_purpose_map_id || '',
      fx_currency: apiResponse.transactionDetails.fx_currency || '',
      fx_amount: apiResponse.transactionDetails.fx_amount || '',
      company_settlement_rate: apiResponse.transactionDetails.company_settlement_rate || '',
      add_margin: apiResponse.transactionDetails.add_margin || '',
      customer_rate: apiResponse.transactionDetails.customer_rate || '',
      nostro_charges: apiResponse.currencyDetails.invoiceRateTable.nostro_charges.type || '',
      applicant_name: apiResponse.transactionDetails.applicant_name || '',
      applicant_pan_number: apiResponse.transactionDetails.applicant_pan_number || '',
      applicant_email: apiResponse.transactionDetails.applicant_email || '',
      applicant_mobile_number: apiResponse.transactionDetails.applicant_mobile_number || '',
      source_of_funds: apiResponse.transactionDetails.source_of_funds || '',
      paid_by: apiResponse.transactionDetails.paid_by || '',
      payee_name: apiResponse.transactionDetails.payee_name || '',
      payee_pan_number: apiResponse.transactionDetails.payee_pan_number || '',
      applicant_id_document: apiResponse.transactionDetails.applicant_id_document || '',
      passport_number: apiResponse.transactionDetails.passport_number || '',
      place_of_issue: apiResponse.transactionDetails.place_of_issue || '',
      passport_issue_date: apiResponse.transactionDetails.passport_issue_date || '',
      passport_expiry_date: apiResponse.transactionDetails.passport_expiry_date || '',
      applicant_address: apiResponse.transactionDetails.applicant_address || '',
      applicant_city: apiResponse.transactionDetails.applicant_city || '',
      applicant_state: apiResponse.transactionDetails.applicant_state || '',
      applicant_country: apiResponse.transactionDetails.applicant_country || '',
      postal_code: apiResponse.transactionDetails.postal_code || '',
    },
    paymentDetails: apiResponse.paymentDetails || '',
  };
};
