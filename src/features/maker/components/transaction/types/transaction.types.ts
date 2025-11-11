export interface TransactionData {
  company_ref_no: string;
  agent_ref_no: string;
  order_date: string;
  expiry_date: string;
  applicant_name: string;
  applicant_pan_number: string;
  transaction_type: string;
  purpose: string;
  fx_currency: string;
  fx_amount: number;
  settlement_rate: number;
  customer_rate: number;
  transaction_amount: number;
  deal_status: string;
}