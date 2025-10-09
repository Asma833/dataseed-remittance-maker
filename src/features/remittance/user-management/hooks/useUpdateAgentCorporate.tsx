import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAgentCorporate, UpdateAgentCorporateRequest, AgentCorporate } from '../api/agentCorporates';

/**
 * Hook to update an agent corporate
 */
export const useUpdateAgentCorporate = () => {
  const queryClient = useQueryClient();

  return useMutation<AgentCorporate, Error, UpdateAgentCorporateRequest>({
    mutationFn: updateAgentCorporate,
    onSuccess: () => {
      // Invalidate and refetch agent corporates
      queryClient.invalidateQueries({ queryKey: ['agentCorporates'] });
    },
  });
};