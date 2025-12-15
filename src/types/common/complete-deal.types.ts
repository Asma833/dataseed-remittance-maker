export interface InvoiceRateTable {
  transaction_value: {
    company_rate: number;
    agent_mark_up: number;
    rate: number;
  };
  remittance_charges: {
    company_rate: number;
    agent_mark_up: number;
    rate: number;
  };
  nostro_charges: {
    company_rate: number;
    agent_mark_up: number;
    rate: number;
  };
  other_charges: {
    company_rate: number;
    agent_mark_up: number;
    rate: number;
  };
  transaction_amount: number;
  gst_amount: number;
  total_inr_amount: number;
  tcs: number;
}

export interface CurrencyDetails {
  fx_currency: string;
  fx_amount: number;
  settlement_rate: number;
  add_margin: number;
  customer_rate: number;
  declared_education_loan_amount: number;
  previous_transaction_amount: number;
  declared_previous_amount: number;
  total_transaction_amount_tcs: number;
  invoiceRateTable: InvoiceRateTable;
}

export interface BeneficiaryDetails {
  beneficiary_name: string;
  beneficiary_address: string;
  beneficiary_city: string;
  beneficiary_country: string;
  beneficiary_account_number_iban_number: string;
  beneficiary_swift_code: string;
  beneficiary_bank_name: string;
  beneficiary_bank_address: string;
  sort_bsb_aba_transit_code: string;
  nostro_charges: string;
  message_to_beneficiary_additional_information: string;
  student_name: string;
  student_passport_number: string;
  payment_instruction_number: string;
  university_name: string;
  intermediaryBankDetails: string;
  intermediary_bank_account_number: string;
  intermediary_bank_swift_code: string;
  intermediary_bank_name: string;
  intermediary_bank_address: string;
}

export interface TransactionDetails {
  company_reference_number: string;
  agent_reference_number: string;
  order_date: string;
  order_expiry: string;
  transaction_type: string;
  purpose: string;
  fx_currency: string;
  fx_amount: number;
  company_settlement_rate: number;
  add_margin: number;
  customer_rate: number;
  nostro_charges: number;
  applicant_name: string;
  applicant_pan_number: string;
  applicant_email: string;
  applicant_mobile_number: string;
  source_of_funds: string;
  paid_by: string;
  payee_name: string;
  payee_pan_number: string;
  applicant_id_document: string;
  passport_number: string;
  place_of_issue: string;
  applicant_address: string;
  applicant_city: string;
  applicant_state: string;
  applicant_country: string;
  postal_code: string;
}

export interface PaymentDetails {
  payment_method: string;
  payment_reference: string;
  upi_id: string;
  bank_name: string;
  amount: number;
}

export interface CompleteDealRequest {
  currencyDetails: CurrencyDetails;
  beneficiaryDetails: BeneficiaryDetails;
  transactionDetails: TransactionDetails;
}

export interface CompleteDealResponse {
  success: boolean;
  message: string;
  // Add other fields if known
}