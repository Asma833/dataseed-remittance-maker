import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface Agent {
  agent_code: string; // The unique ID for the agent
  agent_name: string; // The display name for the agent
  email?: string;
  phone?: string;
  status?: string;
  [key: string]: any;
}

export const agentsApi = {
  getAgents: async (): Promise<Agent[]> => {
    const { data } = await axiosInstance.get<Agent[]>(API.USER_MANAGEMENT.AGENTS.LIST);
    return data;
  },
};
