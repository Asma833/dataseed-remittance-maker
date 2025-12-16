export interface TransactionData {
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
  transactions: unknown[];
  payment_records: unknown[];
}
