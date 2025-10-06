import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { agentAdminApi } from '../api/agentAdmin';
import { UpdateAgentAdminRequest, AgentAdminData } from '../agent-admin-table/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type UpdateAgentAdminOptions = {
  onAgentAdminUpdateSuccess?: () => void;
};

export const useUpdateAgentAdmin = ({ onAgentAdminUpdateSuccess }: UpdateAgentAdminOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<AgentAdminData, Error, UpdateAgentAdminRequest>({
    mutationFn: agentAdminApi.updateAgentAdmin,
    onSuccess: (data) => {
      toast.success('Agent Admin updated successfully');
      invalidateMultipleQueries([['getAgentAdmins']]);
      onAgentAdminUpdateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update Agent Admin');
      console.error('Failed to update Agent Admin:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};