import { RemittanceEditFormData } from '../type/remittance-edit-form.types';

// Dummy API URL
const REMITTANCE_EDIT_API_URL = 'https://api.example.com/remittance/edit';

// Function to update remittance data
export const updateRemittanceData = async (remittanceData: RemittanceEditFormData & { id: string | number }): Promise<RemittanceEditFormData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating remittance data:', remittanceData);
      resolve(remittanceData);
    }, 1000);
  });
};