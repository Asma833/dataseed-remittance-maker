import axiosInstance from '@/core/services/axios/axios-instance';

import { API } from '@/core/constant/apis';
import { CurrencyRateResponse } from '../types/currency-rate.types';

// Function to get all currency rates
export const getCurrencyRates = async (
  marginType: 'number' | 'percentage' = 'number'
): Promise<CurrencyRateResponse> => {
  const response = await axiosInstance.get(`${API.CURRENCY_RATE.GET_ALL.split('?')[0]}?margin_type=${marginType}`);
  return response.data;
};


