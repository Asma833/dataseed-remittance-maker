import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { superCheckerApi } from '../api/superChecker';
import { CreateSuperCheckerRequest, SuperCheckerData } from '../super-checker/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type CreateSuperCheckerOptions = {
  onSuperCheckerCreateSuccess?: () => void;
};

export const useCreateSuperChecker = ({ onSuperCheckerCreateSuccess }: CreateSuperCheckerOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<SuperCheckerData, Error, CreateSuperCheckerRequest>({
    mutationFn: superCheckerApi.createSuperChecker,
    onSuccess: (data) => {
      toast.success('Super Checker created successfully');
      invalidateMultipleQueries([['getSuperCheckers']]);
      onSuperCheckerCreateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create Super Checker');
      console.error('Failed to create Super Checker:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};
