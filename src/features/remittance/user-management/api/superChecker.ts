import axiosInstance from '@/core/services/axios/axios-instance';
import { CreateSuperCheckerRequest, SuperCheckerData, UpdateSuperCheckerRequest } from '../super-checker/table/types';
import { API, getEndpoint } from '@/core/constant/apis';

export const superCheckerApi = {
  getSuperCheckers: async (): Promise<SuperCheckerData[]> => {
    const { data } = await axiosInstance.get<SuperCheckerData[]>(API.USER_MANAGEMENT.SUPER_CHECKER.LIST);
    return data;
  },
  createSuperChecker: async (request: CreateSuperCheckerRequest): Promise<SuperCheckerData> => {
    const { data } = await axiosInstance.post<SuperCheckerData>(API.USER_MANAGEMENT.SUPER_CHECKER.CREATE, request);
    return data;
  },
  updateSuperChecker: async (request: UpdateSuperCheckerRequest): Promise<SuperCheckerData> => {
    const { id, ...updateData } = request;
    const { data } = await axiosInstance.patch<SuperCheckerData>(API.USER_MANAGEMENT.SUPER_CHECKER.UPDATE(id), updateData);
    return data;
  },
};