import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPurposeMapping } from '../api/create-purpose-mapping.api';
import { CreatePurposeMappingPayload, CreatePurposeMappingResponse } from '../types/purpose-mapping.types';

export const useCreatePurposeMapping = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePurposeMappingResponse, Error, CreatePurposeMappingPayload>({
    mutationFn: createPurposeMapping,
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['purposeMappings'] });
      queryClient.invalidateQueries({ queryKey: ['purposes'] });
    },
  });
};
