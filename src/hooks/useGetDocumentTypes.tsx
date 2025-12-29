import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/core/services/axios/axios-instance';
import { API, HEADER_KEYS } from '@/core/constant/apis';

export interface TransactionPurposeDocument {
  id: string;
  document_id: string;
  name: string;
  display_name: string;
  code: string;
  is_back_required: boolean;
  is_mandatory: boolean;
  document_url: string | null;
}

/**
 * Fetches document types from the API with proper headers
 * @returns Promise that resolves to an array of document types
 */
const fetchDocumentTypes = async (
  document_map_id: string,
  transaction_id?: string
): Promise<TransactionPurposeDocument[]> => {
  try {
    const response = await axiosInstance.get(API.CONFIG.GET_DOCUMENT_TYPES(document_map_id, transaction_id ?? ''), {
      headers: {
        accept: 'application/json',
        api_key: HEADER_KEYS.API_KEY,
        partner_id: HEADER_KEYS.PARTNER_ID,
      },
    });

    // API shape: { statusCode, message, data: [...] }
    // Some environments may return the array directly; support both.
    const payload = response?.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  } catch (error) {
    console.error('Error fetching document types:', error);
    return [];
  }
};

/**
 * Custom hook to get document type text by ID or fetch all document types
 * Uses TanStack Query for efficient data fetching with caching
 * @param id Optional document type ID to look up
 * @returns Object containing found document type text and loading state
 */
interface UseGetDocumentTypesOptions {
  document_map_id?: string | undefined;
  transaction_id?: string | undefined;
  enable?: boolean;
}

const useGetDocumentTypes = ({ document_map_id, transaction_id, enable = true }: UseGetDocumentTypesOptions = {}) => {
  const {
    data: documentTypes = [],
    isLoading: loading,
    error,
    isError,
    refetch,
  } = useQuery<TransactionPurposeDocument[], Error, TransactionPurposeDocument[]>({
    queryKey: ['transactionPurposeDocuments', document_map_id, transaction_id],
    queryFn: ({ queryKey }) => fetchDocumentTypes(String(queryKey[1]), queryKey[2] as string | undefined),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 1,
    enabled: enable && !!document_map_id,
  });

  return {
    documentTypes,
    loading,
    error: isError ? error : null,
    refetch,
    enable: enable,
  };
};

export default useGetDocumentTypes;
