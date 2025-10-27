import axiosInstance from '@/core/services/axios/axios-instance';
import { DocumentData } from '../types/document.types';
import { API } from '@/core/constant/apis';
import { dummyDocumentData } from '../data/dummy-document-data';

// Function to get all documents
export const getDocuments = async (): Promise<DocumentData[]> => {
  try {
    const response = await axiosInstance.get(API.DOCUMENT_MASTER.GET_DOCUMENTS);
    return response.data;
  } catch (error) {
    // Return dummy data if API fails
    console.warn('API failed, using dummy data:', error);
    return dummyDocumentData;
  }
};