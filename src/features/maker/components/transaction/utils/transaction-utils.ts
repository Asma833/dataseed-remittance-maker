

import { Transaction, PaymentRecord } from '../types/payment.types';

interface DealBookingData {
  id: string;
  temp_id: string;
  deal_code: string | null;
  transaction_type: string;
  currency_code: string;
  deal_amount: string;
  margin_amount: string;
  settlement_rate: string;
  customer_rate: string;
  booking_status: string;
  created_by: string;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  transactions: Transaction[];
  payment_records: PaymentRecord[];
}

interface InitialData {
  id: string;
  transactionDetails: {
    company_reference_number: string;
    agent_reference_number: string;
    purpose: string;
    transaction_purpose_map_id: string;
    fx_currency: string;
    fx_amount: string;
    company_settlement_rate: string;
    add_margin: string;
    customer_rate: string;
    nostro_charges: string;
    applicant_name: string;
    applicant_pan_number: string;
    applicant_email: string;
    applicant_mobile_number: string;
    source_of_funds: string;
    paid_by: string;
    payee_name: string;
    payee_pan_number: string;
    passport_number: string;
    place_of_issue: string;
    passport_issue_date: string | null;
    passport_expiry_date: string | null;
    applicant_address: string;
    applicant_city: string;
    applicant_state: string;
    applicant_country: string;
    postal_code: string;
  };
  beneficiaryDetails: {
    beneficiary_name: string;
    beneficiary_address: string;
    beneficiary_city: string;
    beneficiary_country: string;
    beneficiary_account_number_iban_number: string;
    beneficiary_swift_code: string;
    beneficiary_bank_name: string;
    beneficiary_bank_address: string;
    sort_bsb_aba_transit_code: string;
    message_to_beneficiary_additional_information: string;
    student_name: string;
    student_passport_number: string;
    university_name: string;
    intermediaryBankDetails: string;
    intermediary_bank_account_number: string;
    intermediary_bank_swift_code: string;
    intermediary_bank_name: string;
    intermediary_bank_address: string;
  };
  currencyDetails: {
    fx_currency: string;
    fx_amount: string;
    settlement_rate: string;
    add_margin: string | null;
    customer_rate: string;
    declared_education_loan_amount: string;
    previous_transaction_amount: string;
    declared_previous_amount: string;
    total_transaction_amount_tcs: string;
    invoiceRateTable: {
      transaction_value: {
        company_rate: string;
        agent_mark_up: string;
        rate: string;
      };
      remittance_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: string;
      };
      nostro_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: string;
      };
      other_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: string;
      };
      transaction_amount: {
        rate: string;
      };
      gst_amount: {
        rate: string;
      };
      total_inr_amount: {
        rate: string;
      };
      tcs: {
        rate: string;
      };
    };
  };
  paymentDetails: DealBookingData;
}

export const mapRowDataToInitialData = (rowData: DealBookingData): InitialData => {
  const transaction = rowData.transactions[0];
  const kyc = transaction.kyc_details;
  return {
    id: rowData?.id,
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
      source_of_funds: transaction.source_of_funds || '',
      paid_by: kyc?.paid_by || '',
      payee_name: kyc?.payee_name || '',
      payee_pan_number: kyc?.payee_pan || '',
      passport_number: kyc?.passport_number || '',
      place_of_issue: kyc?.place_of_issue || '',
      passport_issue_date: kyc?.passport_issue_date || null,
      passport_expiry_date: kyc?.passport_expiry_date || null,
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
};