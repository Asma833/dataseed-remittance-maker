import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
// Function to get Agent by ID
export const getAgentDetails = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(API.REMITTANCE.GET_AGENT_BY_ID(id));
    return response.data;
  } catch (error) {
    console.warn('API failed:', error);
    return null;
  }
};
