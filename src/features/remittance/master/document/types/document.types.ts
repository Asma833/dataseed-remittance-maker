export interface DocumentApiPayload {
  name: string;
  code: string;
  is_required: boolean;
  is_back_required: boolean;
  is_active: boolean;
  display_name?: string;
}

export interface DocumentData {
  id: string;
  name: string;
  code: string;
  is_required: boolean;
  is_back_required: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDocumentResponse {
  id: string;
  name: string;
  code: string;
  is_required: boolean;
  is_back_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
