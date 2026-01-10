import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { mappedDocumentsApi } from '../api/mapped-documents.api';
import { MappedDocument } from '../types/mapped-documents.types';

export const useGetMappedDocuments = (purposeId?: string, transactionId?: string): UseQueryResult<MappedDocument[], Error> => {
  return useQuery({
    queryKey: ['mapped-documents', purposeId, transactionId],
    queryFn: async (): Promise<MappedDocument[]> => {
      if (!purposeId || !transactionId) {
        throw new Error('Purpose ID and Transaction ID are required');
      }
      const response = await mappedDocumentsApi.getMappedDocuments(purposeId, transactionId);
      return response.data;
    },
    enabled: !!purposeId && !!transactionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
