import axiosInstance from '@/core/services/axios/axios-instance';
import { DocumentApiPayload, CreateDocumentResponse } from '../types/document.types';
import { API } from '@/core/constant/apis';

// Function to update document
export const updateDocument = async (id: string, payload: DocumentApiPayload): Promise<CreateDocumentResponse> => {
  const response = await axiosInstance.put(API.DOCUMENT_MASTER.UPDATE_DOCUMENT(id), payload);
  return response.data;
};
