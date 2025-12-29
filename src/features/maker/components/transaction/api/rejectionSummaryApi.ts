import axiosInstance from '@/core/services/axios/axios-instance';
import { API, HEADER_KEYS } from '@/core/constant/apis';
import { RejectionSummaryResponse } from '../components/transaction/types/rejection-doc-summary.types';

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
