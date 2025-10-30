import axiosInstance from '@/core/services/axios/axios-instance';
import { DocumentData } from '../types/document.types';
import { API } from '@/core/constant/apis';

// Function to get all documents
export const getDocuments = async (): Promise<DocumentData[]> => {
  try {
    const response = await axiosInstance.get(API.DOCUMENT_MASTER.GET_DOCUMENTS);
    return response.data.data;
  } catch (error) {    
    console.warn('API failed:', error);
    return [];
  }
};