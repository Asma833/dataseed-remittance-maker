import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { branchAgentApi } from '../api/branchAgent';
import { UpdateBranchAgentRequest, BranchAgentData } from '../branch-agents/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type UpdateBranchAgentOptions = {
  onBranchAgentUpdateSuccess?: () => void;
};

export const useUpdateBranchAgent = ({ onBranchAgentUpdateSuccess }: UpdateBranchAgentOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<BranchAgentData, Error, UpdateBranchAgentRequest>({
    mutationFn: branchAgentApi.updateBranchAgent,
    onSuccess: (data) => {
      toast.success('Branch Agent updated successfully');
      invalidateMultipleQueries([['getBranchAgents']]);
      onBranchAgentUpdateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error('Failed to update Branch Agent');
      console.error('Failed to update Branch Agent:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};