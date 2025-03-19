import axiosInstance from "@/core/services/axios/axiosInstance";
import { getEndpoint } from "@/core/constant/apis";
import { UserCreationRequest, UserCreationResponse, UserUpdateRequest } from "../types/user.type";

export const userApi = {
  userCreation: async (userData: UserCreationRequest): Promise<UserCreationResponse> => {
    const { data } = await axiosInstance.post<UserCreationResponse>(
      getEndpoint("NUSER.CREATE"),
      userData 
    );
    return data;
  },
  userStatusUpdate: async (userData: UserCreationRequest): Promise<UserUpdateRequest> => {
    const { hashed_key, ...updateData } = userData; // Extract hashed_key

    if (!hashed_key) {
        throw new Error("User ID (hashed_key) is required for update");
    }

    // Pass hashed_key as a string in the API request
    const { data } = await axiosInstance.put<UserUpdateRequest>(
      `${getEndpoint("NUSERS.STATUS_UPDATE")}/${hashed_key}`, // Use string directly
      updateData // Send the remaining data in the request body
    );

    return data;
},
userUpdate: async (userData: UserCreationRequest): Promise<UserUpdateRequest> => {
  const { hashed_key, ...updateData } = userData; // Extract hashed_key

  if (!hashed_key) {
      throw new Error("User ID (hashed_key) is required for update");
  }

  // Pass hashed_key as a string in the API request
  const { data } = await axiosInstance.put<UserUpdateRequest>(
    `${getEndpoint("NUSERS.UPDATE")}/${hashed_key}`, // Use string directly
    updateData // Send the remaining data in the request body
  );

  return data;
},


getProducts: async () => {
  const { data } = await axiosInstance.get<UserCreationResponse>(getEndpoint("NUSERS.PRODUCTS"));
  return data; 
},

};
