export interface KycDetails {
  id: string;
  transaction_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_address: string;
  applicant_city: string;
  applicant_state: string;
  applicant_country: string;
  postal_code: string;
  beneficiary_address: string;
  beneficiary_city: string;
  beneficiary_country: string;
  beneficiary_account_number: string;
  beneficiary_swift_code: string;
  beneficiary_bank_name: string;
  beneficiary_bank_address: string;
  sort_bsb_aba_transit_code: string;
  message_to_beneficiary: string;
  student_name: string | null;
  student_passport_number: string | null;
  university_name: string | null;
  applicant_mobile: string;
  applicant_pan: string | null;
  applicant_dob: string | null;
  payee_name: string;
  passport_number: string;
  place_of_issue: string | null;
  payee_pan: string | null;
  payee_dob: string | null;
  declared_education_loan_amount: string;
  previous_transaction_amount: string;
  declared_previous_amount: string;
  total_transaction_amount_tcs: string;
  paid_by: string | null;
  created_at: string;
  updated_at: string;
  passport_issue_date: string | null;
  passport_expiry_date: string | null;
  beneficiary_name: string | null;
  intermediary_bank_details: string | null;
  intermediary_bank_account_number: string | null;
  intermediary_bank_swift_code: string | null;
  intermediary_bank_name: string | null;
  intermediary_bank_address: string | null;
}

export interface Transaction {
  id: string;
  transaction_id: string;
  deal_booking_id: string;
  fx_amount: string;
  fx_currency: string;
  transaction_amount: string;
  total_payable_amount: string | null;
  beneficiary_amount: string | null;
  remittance_charges: string | null;
  other_charges: string | null;
  total_gst_amount: string | null;
  total_inr_amount: string | null;
  tcs: string | null;
  nostro_charges_type: string | null;
  nostro_charges_amount: string | null;
  transaction_status: string;
  kyc_status: string;
  valuation_date: string | null;
  purpose: string;
  source_of_funds: string | null;
  created_at: string;
  updated_at: string;
  agent_ref_number: string | null;
  company_ref_number: string | null;
  order_expiry: string | null;
  order_date: string | null;
  transaction_purpose_map_id: string | null;
  agent_markup_remittance_charges?: string | null;
  agent_markup_nostro_charges?: string | null;
  agent_markup_other_charges?: string | null;
  swift_copy: string | null;
  kyc_details: KycDetails | null;
}

export interface PaymentRecord {
  id: string;
  deal_booking_id: string;
  payment_method: string;
  payment_reference: string;
  amount: string;
  payment_status: string;
  upi_id: string | null;
  qr_code_data: string | null;
  bank_name: string | null;
  branch_name: string | null;
  challan_number: string | null;
  challan_date: string | null;
  verified_by: string | null;
  verified_at: string | null;
  payment_gateway_response: string | null;
  created_at: string;
  updated_at: string;
  payment_challan_url?: string | null;
}

export interface AllTransaction {
  id: string;
  temp_id: string;
  transaction_id: string;
  deal_code: string | null;
  transaction_type: string;
  currency_code: string;
  deal_amount: string;
  deal_booking_id: string;
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

export interface PaymentData {
  id: string;
  ref_no: string;
  transaction_id: string;
  deal_booking_id: string;
  agent_ref_no: string;
  order_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan: string;
  transaction_type: string;
  purpose: string;
  kyc_type: string;
  kyc_status: string;
  payment_status: string;
  payment_link: string | null;
  payment_screenshot: string | null;
  fx_currency: string | number;
  fx_amount: string | number;
  fx_rate: string | number;
  settlement_rate: string | number;
  customer_rate: string | number;
  transaction_amount: string | number;
  rejection_reason: string | null;
  kyc_upload_status: string;
  completion_date: string | null;
  swift_copy: string | null;
  transaction_status: string;
  raw_data?: {
    deal: AllTransaction;
    transaction: Transaction;
  };
}

export interface UploadPaymentChallanRequest {
  id: string;
  file: File;
}

export interface UploadPaymentChallanResponse {
  success: boolean;
  message: string;
  url?: string;
}
