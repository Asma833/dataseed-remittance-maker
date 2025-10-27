import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '../api/create-document.api';
import { DocumentApiPayload, CreateDocumentResponse } from '../types/document.types';

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateDocumentResponse,
    Error,
    DocumentApiPayload
  >({
    mutationFn: createDocument,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};