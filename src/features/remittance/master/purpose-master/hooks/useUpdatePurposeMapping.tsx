import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatePurposeMappingPayload, UpdatePurposeMappingResponse } from '../types/purpose-mapping.types';
import { updatePurposeMapping } from '../api/update-purpose-mapping.api';

export const useUpdatePurposeMapping = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdatePurposeMappingResponse, Error, { id: string; data: UpdatePurposeMappingPayload }>({
    mutationFn: ({ id, data }) => updatePurposeMapping(id, data),
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['purposeMappings'] });
      queryClient.invalidateQueries({ queryKey: ['purposes'] });
      queryClient.invalidateQueries({ queryKey: ['getPurposeList'] });
    },
  });
};
