import axiosInstance from '@/core/services/axios/axios-instance';
import { UpdatePurposeMappingPayload, UpdatePurposeMappingResponse } from '../types/purpose-mapping.types';
import { API } from '@/core/constant/apis';

// Function to update purpose mapping
export const updatePurposeMapping = async (
  id: string,
  payload: UpdatePurposeMappingPayload
): Promise<UpdatePurposeMappingResponse> => {
  const response = await axiosInstance.put(`${API.TRANSACTION_PURPOSE_MAP.PURPOSE_MAPPING}/${id}`, payload);
  return response.data;
};
