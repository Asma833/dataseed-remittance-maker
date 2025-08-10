import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { documentMasterApi } from '../../action/documentMasterApi';

export const useUpdateDocument = ({ onDocumentUpdateSuccess }: { onDocumentUpdateSuccess: () => void }) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id,data }: any) => {
      const payload = {
        name: data.name,
        code: data.code,
        display_name: data.display_name,
        description: data.description,
      };

      return await documentMasterApi.updateDocument(id, payload);
    },
    onSuccess: () => {
      const successMessage = 'Document updated successfully';
      toast.success(successMessage);
      onDocumentUpdateSuccess();
    },
    onError: (error: Error) => {
      const errorMessage = (error.message = 'Document update failed');
      toast.error(errorMessage);
    },
  });

  return { mutate, isLoading: isPending, error };
};
