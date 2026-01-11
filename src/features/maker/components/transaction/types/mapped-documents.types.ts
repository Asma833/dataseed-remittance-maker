export interface MappedDocument {
  id: string;
  document_id: string;
  name: string;
  display_name: string;
  code: string;
  is_back_required: boolean;
  is_mandatory: boolean;
  is_uploaded: boolean;
  document_url: string;
  trans_doc_id:string;
}

export interface GetMappedDocumentsResponse {
  statusCode: number;
  message: string;
  data: MappedDocument[];
}
