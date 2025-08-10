import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AgentBranchUserPayload } from '../../types/user.types';
import { agentBranchUserApi } from '../../action/agentBranchUser';

export const useCreateBranchUser = ({ onCreateSuccess }: { onCreateSuccess: (data: AgentBranchUserPayload) => void }
) => {
  const mapFormDataToApiPayload = async (formData: AgentBranchUserPayload): Promise<AgentBranchUserPayload> => {
    return {
      agent_eon_code : formData.agent_eon_code,
      primary_agent_name : formData.primary_agent_name,
      primary_agent_email : formData.primary_agent_email,
      agent_branch_user_name : formData.agent_branch_user_name,
      agent_branch_user_email : formData.agent_branch_user_email,
      agent_branch_user_mobile : formData.agent_branch_user_mobile,
      role : formData.role,
    };
  };

  const { mutate, isPending, error } = useMutation<AgentBranchUserPayload, Error, AgentBranchUserPayload>({
    mutationFn: async (userData: AgentBranchUserPayload) => {
      const apiPayload = await mapFormDataToApiPayload(userData);
      await agentBranchUserApi.agentBranchUserCreation(apiPayload);
      return apiPayload;
    },
    onSuccess: (data: AgentBranchUserPayload) => {
      toast.success('Agent branch user created successfully');
      onCreateSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Agent branch user creation failed');
    },
  });

  return { mutate, isLoading: isPending, error };
};
  

