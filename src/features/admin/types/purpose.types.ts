export interface PurposeApiPayload {
  purpose_name: string;
  purpose_code: string;
}

export interface PurposeData {
  id: string;
  purpose_name: string;
  purpose_code: string;
  mappedTransactionTypes?: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}