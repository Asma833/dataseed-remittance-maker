import { useMutation } from "@tanstack/react-query";
import { AgentBranchUserPayload } from "../../types/user.types";
import { agentBranchUserApi } from "../../action/agentBranchUser";
import { toast } from "sonner";

export const useUpdateBranchUser = (
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
      await agentBranchUserApi.agentBranchUserStatusUpdate(apiPayload);
      return apiPayload;
    },
    onSuccess: (data: AgentBranchUserPayload) => {
      toast.success('Agent branch user updated successfully');
      // onUpdateSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Agent branch user update failed');
    },
  });

  return { mutate, isLoading: isPending, error };
};

