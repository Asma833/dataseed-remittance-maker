import axiosInstance from '@/core/services/axios/axios-instance';
import { CreatePurposeMappingPayload, CreatePurposeMappingResponse } from '../types/purpose-mapping.types';
import { API } from '@/core/constant/apis';

// Function to create purpose mapping
export const createPurposeMapping = async (payload: CreatePurposeMappingPayload): Promise<CreatePurposeMappingResponse> => {
  const response = await axiosInstance.post(API.TRANSACTION_PURPOSE_MAP.PURPOSE_MAPPING, payload);
  return response.data;
};