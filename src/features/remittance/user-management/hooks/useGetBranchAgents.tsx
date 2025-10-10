import { useQuery } from '@tanstack/react-query';
import { branchAgentApi } from '../api/branchAgent';
import { BranchAgentData } from '../branch-agents/table/types';

export const useGetBranchAgents = () => {
  const { data, isLoading, error, refetch } = useQuery<BranchAgentData[], Error>({
    queryKey: ['getBranchAgents'],
    queryFn: branchAgentApi.getBranchAgents,
  });

  return { data, isLoading, error, refetch };
};
