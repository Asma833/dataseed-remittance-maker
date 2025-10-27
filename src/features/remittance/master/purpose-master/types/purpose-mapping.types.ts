export interface CreatePurposeMappingPayload {
  purpose_name: string;
  purpose_code: string;
  transaction_type_id: string;
}

export interface CreatePurposeMappingResponse {
  id: string;
  purpose_name: string;
  purpose_code: string;
  transaction_type_id: string;
  created_at: string;
  updated_at: string;
}