import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '../api/create-document.api';
import { DocumentApiPayload, CreateDocumentResponse } from '../types/document.types';
import { toast } from 'sonner';

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateDocumentResponse,
    Error,
    DocumentApiPayload
  >({
    mutationFn: createDocument,
    onSuccess: (data: CreateDocumentResponse) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document created successfully')
    },
    onError: (error: Error) => {
       toast.error(error.message || 'Failed to create document')
    },
  });
};