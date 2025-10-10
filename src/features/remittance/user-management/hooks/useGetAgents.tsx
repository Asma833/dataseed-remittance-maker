import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { agentsApi, Agent } from '../api/agents';

export const useGetAgents = () => {
  const { data, isLoading, error, refetch } = useQuery<Agent[], Error>({
    queryKey: ['getAgents'],
    queryFn: agentsApi.getAgents,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
  });

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to fetch agents');
      console.error('Failed to fetch agents:', error);
    }
  }, [error]);

  return {
    agents: data || [],
    isLoading,
    error,
    refetch,
  };
};
