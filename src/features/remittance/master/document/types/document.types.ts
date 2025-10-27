export interface DocumentApiPayload {
  name: string;
  code: string;
  is_mandatory: string[];
  is_active: boolean;
}

export interface DocumentData {
  id: string;
  name: string;
  code: string;
  is_mandatory: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDocumentResponse {
  id: string;
  name: string;
  code: string;
  is_mandatory: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}