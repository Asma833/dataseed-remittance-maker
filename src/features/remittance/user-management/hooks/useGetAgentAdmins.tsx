import { useQuery } from '@tanstack/react-query';
import { agentAdminApi } from '../api/agentAdmin';
import { AgentAdminData } from '../agent-admin-table/table/types';

export const useGetAgentAdmins = () => {
  const { data, isLoading, error, refetch } = useQuery<AgentAdminData[], Error>({
    queryKey: ['getAgentAdmins'],
    queryFn: agentAdminApi.getAgentAdmins,
  });

  return { data, isLoading, error, refetch };
};
