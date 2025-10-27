import axiosInstance from '@/core/services/axios/axios-instance';
import { DocumentApiPayload, CreateDocumentResponse } from '../types/document.types';
import { API } from '@/core/constant/apis';

// Function to create document
export const createDocument = async (payload: DocumentApiPayload): Promise<CreateDocumentResponse> => {
  const response = await axiosInstance.post(API.DOCUMENT_MASTER.CREATE_DOCUMENT, payload);
  return response.data;
};