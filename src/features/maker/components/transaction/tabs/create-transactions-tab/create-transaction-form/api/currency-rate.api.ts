import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CurrencyRate, CurrencyRateResponse } from '@/features/maker/types/currency-rate.types';

// Function to get currency rates for a specific currency
export const getCurrencyRates = async (currencyCode: string): Promise<CurrencyRateResponse> => {
  const response = await axiosInstance.get(API.CURRENCY_RATE.GET_CURRENCY_RATES(currencyCode));
  return response.data;
};