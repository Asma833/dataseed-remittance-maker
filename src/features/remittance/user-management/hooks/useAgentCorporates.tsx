import { useQuery } from '@tanstack/react-query';
import { getAgentCorporates, AgentCorporate } from '../api/agentCorporates';

/**
 * Hook to get agent corporates
 */
export const useGetAgentCorporates = () => {
  return useQuery<AgentCorporate[], Error>({
    queryKey: ['agentCorporates'],
    queryFn: () => getAgentCorporates(),
  });
};