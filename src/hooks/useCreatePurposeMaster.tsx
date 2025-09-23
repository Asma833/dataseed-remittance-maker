import { usePostData } from './usePostData';
import { API } from '../core/constant/apis';
import { useQueryInvalidator } from './useQueryInvalidator';

type CreatePurposeOptions = {
  onPurposeCreateSuccess?: () => void;
};

export const useCreatePurposeMaster = ({ onPurposeCreateSuccess }: CreatePurposeOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const mutation = usePostData({
    endpoint: API.PURPOSE.CREATE_PURPOSE,
    onSuccess: () => {
      invalidateMultipleQueries([['getPurposeList'], ['purposeTypes']]);
      onPurposeCreateSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating purpose:', error);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};