import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import {
  AgentCorporate,
  CreateAgentCorporateRequest,
  UpdateAgentCorporateRequest,
} from '../types/agentCorporate.types';

export type { AgentCorporate, CreateAgentCorporateRequest, UpdateAgentCorporateRequest };

/**
 * Get agent corporates
 */
export const getAgentCorporates = async (): Promise<AgentCorporate[]> => {
  const { data } = await axiosInstance.get<AgentCorporate[]>(API.USER_MANAGEMENT.AGENT_CORPORATES.LIST);
  return data;
};

/**
 * Create a new agent corporate
 */
export const createAgentCorporate = async (request: CreateAgentCorporateRequest): Promise<AgentCorporate> => {
  const { data } = await axiosInstance.post<AgentCorporate>(API.USER_MANAGEMENT.AGENT_CORPORATES.LIST, request);
  return data;
};

/**
 * Update an agent corporate
 */
export const updateAgentCorporate = async (request: UpdateAgentCorporateRequest): Promise<AgentCorporate> => {
  const { id, ...payload } = request;
  const { data } = await axiosInstance.put<AgentCorporate>(
    `${API.USER_MANAGEMENT.AGENT_CORPORATES.LIST}/${id}`,
    payload
  );
  return data;
};
