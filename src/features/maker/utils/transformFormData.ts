import { CreateTransactionFormData } from '../components/transaction/tabs/create-transactions-tab/create-transaction-form/form/common-schema';
import { CreateTransactionRequest } from '../types/create-transaction.types';
import { PartialUpdateOrderRequest } from '../types/update-order.types';

/**
 * Transform form data to API request format
 */
export const transformFormDataToApiRequest = (
  formData: CreateTransactionFormData,
  transactionTypes: Array<{ id: string; text: string }>,
  purposeTypes: Array<{ id: string; text: string }>
): CreateTransactionRequest => {
  // Find the transaction type ID by matching the text
  const selectedTransactionType = transactionTypes.find(
    (type) => type.text === formData.transactionDetails.transaction_type
  );

  // Find the purpose type ID by matching the text
  const selectedPurposeType = purposeTypes.find((type) => type.text === formData.transactionDetails.purpose);

  return {
    partner_order_id: formData.transactionDetails.company_reference_number || '',
    transaction_type_id: selectedTransactionType?.id || '',
    is_e_sign_required: true, // Always true as per requirement
    is_v_kyc_required: false, // TODO: Add to schema when implemented
    purpose_type_id: selectedPurposeType?.id || '',
    customer_name: formData.transactionDetails.applicant_name || '',
    customer_email: formData.transactionDetails.applicant_email || '',
    customer_phone: formData.transactionDetails.applicant_mobile_number || '',
    customer_pan: formData.transactionDetails.applicant_pan_number || '',
  };
};

/**
 * Transform form data to update order request format
 * Only includes the fields that can be updated in edit mode
 */
export const transformFormDataToUpdateRequest = (
  formData: CreateTransactionFormData,
  transactionTypes: Array<{ id: string; text: string }>,
  purposeTypes: Array<{ id: string; text: string }>,
  currentUserId: string
): PartialUpdateOrderRequest => {
  // Find the transaction type ID by matching the text
  const selectedTransactionType = transactionTypes.find(
    (type) => type.text === formData.transactionDetails.transaction_type
  );

  // Find the purpose type ID by matching the text
  const selectedPurposeType = purposeTypes.find((type) => type.text === formData.transactionDetails.purpose);

  return {
    transaction_type: selectedTransactionType?.id || '',
    purpose_type: selectedPurposeType?.id || '',
    is_v_kyc_required: false, // TODO: Add to schema when implemented
    customer_name: formData.transactionDetails.applicant_name || '',
    customer_email: formData.transactionDetails.applicant_email || '',
    customer_phone: formData.transactionDetails.applicant_mobile_number || '',
    customer_pan: formData.transactionDetails.applicant_pan_number || '',
    updated_by: currentUserId,
  };
};
