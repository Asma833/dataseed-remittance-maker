import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface Agent {
  id: string;
  agent_code: string; // The unique ID for the agent
  agent_name: string; // The display name for the agent
  email?: string;
  phone?: string;
  status?: string;
  system_code?: string;
  rm_name?: string;
  rm_branch_name?: string;
  [key: string]: any;
}

export const agentsApi = {
  getAgents: async (): Promise<Agent[]> => {
    const { data } = await axiosInstance.get<Agent[]>(API.USER_MANAGEMENT.AGENTS.LIST);
    return data;
  },
};
