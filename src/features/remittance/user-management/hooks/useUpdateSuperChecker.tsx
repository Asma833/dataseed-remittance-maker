import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { superCheckerApi } from '../api/superChecker';
import { UpdateSuperCheckerRequest, SuperCheckerData } from '../super-checker/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type UpdateSuperCheckerOptions = {
  onSuperCheckerUpdateSuccess?: () => void;
};

export const useUpdateSuperChecker = ({ onSuperCheckerUpdateSuccess }: UpdateSuperCheckerOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<SuperCheckerData, Error, UpdateSuperCheckerRequest>({
    mutationFn: superCheckerApi.updateSuperChecker,
    onSuccess: (data) => {
      toast.success('Super Checker updated successfully');
      invalidateMultipleQueries([['getSuperCheckers']]);
      onSuperCheckerUpdateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error('Failed to update super checker');
    },
  });

  return { mutate, isLoading: isPending, error };
};