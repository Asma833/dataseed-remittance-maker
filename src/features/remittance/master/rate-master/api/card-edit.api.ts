import { CardEditFormData } from './card-edit-form.types';

// Dummy API URL
const CARD_EDIT_API_URL = 'https://api.example.com/card/edit';

// Function to update card data
export const updateCardData = async (cardData: CardEditFormData & { id: string }): Promise<CardEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating card data:', cardData);
      resolve(cardData);
    }, 1000);
  });
};

// Function to get card data by ID
export const getCardDataById = async (id: string): Promise<CardEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetching card data for ID:', id);
      // Return dummy data
      resolve({
        currency: 'USD',
        working_10_12: '1.5%',
        working_12_02: '2.0%',
        working_02_3_30: '1.8%',
        workingEnd: '3.0%',
        ttHolidayMargin: '0.5%',
        ttweekendMargin: '1.0%',
        upperCircuit: '5.0%',
      });
    }, 500);
  });
};