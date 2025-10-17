import { CurrencyEditFormData } from '../type/currency-edit-form.types';

// Dummy API URL
const CURRENCY_EDIT_API_URL = 'https://api.example.com/currency/edit';

// Function to update currency data
export const updateCurrencyData = async (currencyData: CurrencyEditFormData & { id: string }): Promise<CurrencyEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating currency data:', currencyData);
      resolve(currencyData);
    }, 1000);
  });
};
