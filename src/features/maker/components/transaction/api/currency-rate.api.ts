import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';
import { CurrencyRateResponse, CurrencyRatesResponse, UpdateTimewiseMarginPayload, UpdateTimewiseMarginResponse } from '@/features/maker/components/transaction/types/currency-rate.types';


// Function to update timewise margin for a currency
export const updateTimewiseMargin = async (
  payload: UpdateTimewiseMarginPayload
): Promise<UpdateTimewiseMarginResponse> => {
  const response = await axiosInstance.patch(API.CURRENCY_RATE.UPDATE_TIMEWISE, payload);
  return response.data;
};

// Function to get all currency rates
export const getAllCurrencyRates = async (marginType: 'number' | 'percentage' = 'number'): Promise<CurrencyRatesResponse> => {
  const response = await axiosInstance.get(`${API.CURRENCY_RATE.GET_ALL}&margin_type=${marginType}`);
  return response.data;
};

// Function to get currency rates for a specific currency
export const getCurrencyRates = async (currencyCode: string): Promise<CurrencyRateResponse> => {
  const response = await axiosInstance.get(API.CURRENCY_RATE.GET_CURRENCY_RATES(currencyCode));
  return response.data;
};