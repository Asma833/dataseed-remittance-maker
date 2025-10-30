import { CardEditFormData } from '../tabs/card/form/card-edit-form.schema';

// Function to update card data
export const updateCardData = async (cardData: CardEditFormData & { id: string }): Promise<CardEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log('Updating card data:', cardData);
      resolve(cardData);
    }, 1000);
  });
};
