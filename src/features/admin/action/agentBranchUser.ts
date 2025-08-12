import { API } from "@/core/constant/apis";
import axiosInstance from "@/core/services/axios/axiosInstance";

export const agentBranchUserApi = {
    agentBranchUserCreation: async (userData: any): Promise<any> => {
        const { data } = await axiosInstance.post(API.USER_MANAGEMENT.AGENT_BRANCH_USER.CREATE, userData);
        return data;
    },
    
    agentBranchUserStatusUpdate: async (userData: any): Promise<any> => {
        const { hashed_key, ...updateData } = userData;
        const { data } = await axiosInstance.put(API.USER_MANAGEMENT.AGENT_BRANCH_USER.STATUS_UPDATE + `/${hashed_key}`, updateData);
        return data;
    },
};
