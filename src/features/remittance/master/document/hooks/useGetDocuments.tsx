import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../api/get-documents.api';
import { DocumentData } from '../types/document.types';

export const useGetDocuments = () => {
  return useQuery<DocumentData[], Error>({
    queryKey: ['documents'],
    queryFn: getDocuments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};