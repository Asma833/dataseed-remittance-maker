import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { documentMasterApi } from '../api/documentMasterApi';

export const useDeleteDocumentMapping = ({
  onDeleteSuccess,
}: {
  onDeleteSuccess?: () => void;
} = {}) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (mappingId: string) => {
      await documentMasterApi.deleteDocumentMapping(mappingId);
      return mappingId;
    },
    onSuccess: () => {
      toast.success('Document mapping deleted successfully');
      onDeleteSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete document mapping');
    },
  });

  return { mutate, isPending, isLoading: isPending, error };
};
