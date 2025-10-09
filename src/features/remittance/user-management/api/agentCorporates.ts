import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface AgentCorporate {
  id: string;
  entity_name: string;
  pan_number: string;
  date_of_incorporation: string;
  entity_type: string;
  cin: string;
  address: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string;
  owner_type: string;
}

/**
 * Get agent corporates
 */
export const getAgentCorporates = async (): Promise<AgentCorporate[]> => {
  const { data } = await axiosInstance.get<AgentCorporate[]>(API.USER_MANAGEMENT.AGENT_CORPORATES.LIST);
  return data;
};