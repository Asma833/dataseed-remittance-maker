import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export const activeInactiveApi = {
  inactiveUser: async (id: string): Promise<void> => {
    await axiosInstance.patch(API.USER_MANAGEMENT.ACTIVE_INACTIVE.DELETE(id));
  },
};
