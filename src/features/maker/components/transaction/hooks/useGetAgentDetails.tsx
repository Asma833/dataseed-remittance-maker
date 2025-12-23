import { useQuery } from '@tanstack/react-query';
import { getAgentDetails } from '../api/get-agent-by-id.api.';


// Hook to fetch agent details by ID
export const useGetAgentDetails = (id: string) => {
  return useQuery({
    queryKey: ['agentDetails', id],
    queryFn: () => getAgentDetails(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};