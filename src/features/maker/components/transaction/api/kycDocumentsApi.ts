import axiosInstance from '@/core/services/axios/axios-instance';
import { API, HEADER_KEYS } from '@/core/constant/apis';

export interface UploadTransactionDocumentRequest {
  file: File;
  transaction_id: string;
  document_type: string;
  document_name: string;
  remarks?: string;
}

export type UploadTransactionDocumentResponse = any;

export async function uploadTransactionDocument(
  request: UploadTransactionDocumentRequest
): Promise<UploadTransactionDocumentResponse> {
  const formData = new FormData();
  formData.append('file', request.file);
  formData.append('transaction_id', request.transaction_id);
  formData.append('document_type', request.document_type);
  formData.append('document_name', request.document_name);
  formData.append('remarks', request.remarks ?? '');

  const response = await axiosInstance.post(API.REMITTANCE.TRANSACTIONS.DOCUMENTS.UPLOAD, formData, {
    // Ensure multipart request isn't encrypted or forced to JSON
    skipEncryption: true,
    headers: {
      accept: 'application/json',
      api_key: HEADER_KEYS.API_KEY,
      partner_id: HEADER_KEYS.PARTNER_ID,
      'X-Skip-Encryption': 'true',
    },
  });

  return response.data;
}
