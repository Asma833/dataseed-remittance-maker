import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
// Function to get all transactions
export const getTransactions = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get(API.REMITTANCE.LIST);
    return response.data;
  } catch (error) {
    console.warn('API failed:', error);
    return [];
  }
};
