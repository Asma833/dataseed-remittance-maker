import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getAgentDetails } from '../api/get-agent-by-id.api.';

// Hook to fetch agent details using stored agent ID
export const useGetAgentDetails = () => {
  const agentId = useSelector((state: RootState) => state.auth.agentId);

  return useQuery({
    queryKey: ['agentDetails', agentId],
    queryFn: () => getAgentDetails(agentId!),
    enabled: !!agentId, // Only run query if agentId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};