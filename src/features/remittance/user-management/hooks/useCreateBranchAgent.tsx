import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { branchAgentApi } from '../api/branchAgent';
import { CreateBranchAgentRequest, BranchAgentData } from '../branch-agents/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type CreateBranchAgentOptions = {
  onBranchAgentCreateSuccess?: () => void;
};

export const useCreateBranchAgent = ({ onBranchAgentCreateSuccess }: CreateBranchAgentOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<BranchAgentData, Error, CreateBranchAgentRequest>({
    mutationFn: branchAgentApi.createBranchAgent,
    onSuccess: (data) => {
      toast.success('Branch Agent created successfully');
      invalidateMultipleQueries([['getBranchAgents']]);
      onBranchAgentCreateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create Branch Agent');
      console.error('Failed to create Branch Agent:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};
