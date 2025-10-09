import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAgentCorporate, CreateAgentCorporateRequest, AgentCorporate } from '../api/agentCorporates';

/**
 * Hook to create a new agent corporate
 */
export const useCreateAgentCorporate = () => {
  const queryClient = useQueryClient();

  return useMutation<AgentCorporate, Error, CreateAgentCorporateRequest>({
    mutationFn: createAgentCorporate,
    onSuccess: () => {
      // Invalidate and refetch agent corporates
      queryClient.invalidateQueries({ queryKey: ['agentCorporates'] });
    },
  });
};