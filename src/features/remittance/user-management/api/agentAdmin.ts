import axiosInstance from '@/core/services/axios/axios-instance';
import { CreateAgentAdminRequest, AgentAdminData, UpdateAgentAdminRequest } from '../agent-admin-table/table/types';
import { API } from '@/core/constant/apis';

export const agentAdminApi = {
  getAgentAdmins: async (): Promise<AgentAdminData[]> => {
    const { data } = await axiosInstance.get<AgentAdminData[]>(API.USER_MANAGEMENT.AGENTS.LIST);
    return data;
  },
  createAgent: async (request: any): Promise<any> => {
    const { data } = await axiosInstance.post<any>(API.USER_MANAGEMENT.AGENTS.CREATE, request);
    return data;
  },
  createAgentAdmin: async (request: CreateAgentAdminRequest): Promise<AgentAdminData> => {
    const { data } = await axiosInstance.post<AgentAdminData>(API.USER_MANAGEMENT.AGENT_ADMINS.CREATE, request);
    return data;
  },
  updateAgentAdmin: async (request: UpdateAgentAdminRequest): Promise<AgentAdminData> => {
    const { id, ...payload } = request;
    const { data } = await axiosInstance.patch<AgentAdminData>(
      API.USER_MANAGEMENT.AGENT_ADMINS.UPDATE(id),
      payload
    );
    return data;
  },
};