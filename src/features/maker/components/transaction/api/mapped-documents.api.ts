import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { GetMappedDocumentsResponse } from '../types/mapped-documents.types';

export const mappedDocumentsApi = {
  getMappedDocuments: async (purposeId: string, transactionId: string): Promise<GetMappedDocumentsResponse> => {
    const { data } = await axiosInstance.get<GetMappedDocumentsResponse>(
      API.REMITTANCE.GET_MAPPED_DOCUMENTS(purposeId, transactionId)
    );
    return data;
  },
};
