export interface DealBookingPayload {
  customer_name: string;
  currency_code: string;
  deal_amount: number;
  margin_amount: number;
  deal_code: string;
  created_by: string;
  transaction_type: string;
  payment_status: string;
  kyc_status: string;
  status: string;
  fx_currency: string;
  settlement_rate: number;
  customer_rate: number;
  applicant_email: string;
  applicant_mobile: string;
  applicant_pan: string;
  applicant_dob: string;
  purpose: string;
  payee_name: string;
  payee_pan: string;
  payee_dob: string;
}

export interface DealBookingResponse {
  id: string;
  deal_code: string;
  status: string;
  // Add other response fields as needed
}

export interface CompleteDealRequest {
  // No body required, id is in path
}

export interface CompleteDealResponse {
  success: boolean;
  message: string;
}
