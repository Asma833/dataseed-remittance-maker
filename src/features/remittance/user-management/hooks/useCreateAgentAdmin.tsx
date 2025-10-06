import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { agentAdminApi } from '../api/agentAdmin';
import { CreateAgentAdminRequest, AgentAdminData } from '../agent-admin-table/table/types';
import { useQueryInvalidator } from '../../../../hooks/useQueryInvalidator';

type CreateAgentAdminOptions = {
  onAgentAdminCreateSuccess?: () => void;
};

export const useCreateAgentAdmin = ({ onAgentAdminCreateSuccess }: CreateAgentAdminOptions = {}) => {
  const { invalidateMultipleQueries } = useQueryInvalidator();

  const { mutate, isPending, error } = useMutation<AgentAdminData, Error, CreateAgentAdminRequest>({
    mutationFn: agentAdminApi.createAgentAdmin,
    onSuccess: (data) => {
      toast.success('Agent Admin created successfully');
      invalidateMultipleQueries([['getAgentAdmins']]);
      onAgentAdminCreateSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create Agent Admin');
      console.error('Failed to create Agent Admin:', error);
    },
  });

  return { mutate, isLoading: isPending, error };
};