import axiosInstance from '@/core/services/axios/axios-instance';
import { CurrencyRateResponse } from '../types/currency-rate.types';
import { API } from '@/core/constant/apis';

// Function to get all currency rates
export const getCurrencyRates = async (): Promise<CurrencyRateResponse> => {
  const response = await axiosInstance.get(API.CURRENCY_RATE.GET_ALL);
  return response.data;
};