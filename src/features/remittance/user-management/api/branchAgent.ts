import axiosInstance from '@/core/services/axios/axios-instance';
import { CreateBranchAgentRequest, BranchAgentData, UpdateBranchAgentRequest } from '../branch-agents/table/types';
import { API, getEndpoint } from '@/core/constant/apis';

export const branchAgentApi = {
  getBranchAgents: async (): Promise<BranchAgentData[]> => {
    const { data } = await axiosInstance.get<BranchAgentData[]>(API.USER_MANAGEMENT.AGENT_BRANCH_USER.LIST);
    return data;
  },
  createBranchAgent: async (request: CreateBranchAgentRequest): Promise<BranchAgentData> => {
    const { data } = await axiosInstance.post<BranchAgentData>(API.USER_MANAGEMENT.AGENT_BRANCH_USER.CREATE, request);
    return data;
  },
  updateBranchAgent: async (request: UpdateBranchAgentRequest): Promise<BranchAgentData> => {
    const { id, ...payload } = request;
    const { data } = await axiosInstance.patch<BranchAgentData>(
      API.USER_MANAGEMENT.AGENT_BRANCH_USER.UPDATE(id),
      payload
    );
    return data;
  },
};
