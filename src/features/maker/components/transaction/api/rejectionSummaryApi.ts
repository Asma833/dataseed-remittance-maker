import axiosInstance from '@/core/services/axios/axios-instance';
import { API, HEADER_KEYS } from '@/core/constant/apis';

export interface RejectionHistoryItem {
  rejected_by: string;
  rejection_reason: string;
  remarks?: string;
  created_at: string;
}

export interface RejectedDocument {
  id: string;
  document_type: string;
  document_name: string;
  verification_status: string;
  history: RejectionHistoryItem[];
}

export interface RejectionSummaryResponse {
  transaction_id: string;
  documents: RejectedDocument[];
}

export async function getRejectionSummary(transactionId: string): Promise<RejectionSummaryResponse> {
  const response = await axiosInstance.get(API.REMITTANCE.DOCUMENTS_REJECTION(transactionId), {
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
