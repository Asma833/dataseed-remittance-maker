import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

export interface TransactionType {
  transaction_type_id: string;
  hashed_key: string;
  transaction_name: string;
}

// Function to get all transaction types
export const getTransactionTypes = async (): Promise<TransactionType[]> => {
  const response = await axiosInstance.get(API.TRANSACTION.GET_ALL_TRANSACTIONS_TYPES);
  return response.data;
};
