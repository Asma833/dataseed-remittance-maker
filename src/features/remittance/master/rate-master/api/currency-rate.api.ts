import axiosInstance from '@/core/services/axios/axios-instance';
import { CurrencyRateResponse, UpdateTimewiseMarginPayload, UpdateTimewiseMarginResponse } from '../types/currency-rate.types';
import { API } from '@/core/constant/apis';

// Function to get all currency rates
export const getCurrencyRates = async (marginType: 'number' | 'percentage' = 'number'): Promise<CurrencyRateResponse> => {
  const response = await axiosInstance.get(`${API.CURRENCY_RATE.GET_ALL.split('?')[0]}?margin_type=${marginType}`);
  return response.data;
};

// Function to update timewise margin for a currency
export const updateTimewiseMargin = async (payload: UpdateTimewiseMarginPayload): Promise<UpdateTimewiseMarginResponse> => {
  const response = await axiosInstance.patch(API.CURRENCY_RATE.UPDATE_TIMEWISE, payload);
  return response.data;
};