import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '../api/update-document.api';
import { DocumentApiPayload, CreateDocumentResponse } from '../types/document.types';
import { toast } from 'sonner';

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DocumentApiPayload }) => updateDocument(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update document');
    },
  });
};
