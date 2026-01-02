import { CreateTransactionFormInput } from './common-schema';

export const getFormDefaultValues = (
  initialData?: Partial<CreateTransactionFormInput>
): Partial<CreateTransactionFormInput> => {
  const sourceData = initialData;
  
  // If we have initialData with currencyDetails, use that data
  // Otherwise use default values
  const currencyDetails = sourceData?.currencyDetails ? {
    ...sourceData.currencyDetails,
    total_transaction_amount_tcs: sourceData.currencyDetails.total_transaction_amount_tcs ?? '0',
    // Ensure invoiceRateTable is properly structured
    invoiceRateTable: sourceData.currencyDetails.invoiceRateTable ? {
      ...sourceData.currencyDetails.invoiceRateTable,
      // Ensure each section of the invoice table is properly structured
      transaction_value: sourceData.currencyDetails.invoiceRateTable.transaction_value || {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      remittance_charges: sourceData.currencyDetails.invoiceRateTable.remittance_charges || {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      nostro_charges: sourceData.currencyDetails.invoiceRateTable.nostro_charges || {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      other_charges: sourceData.currencyDetails.invoiceRateTable.other_charges || {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      transaction_amount: sourceData.currencyDetails.invoiceRateTable.transaction_amount || {
        rate: '0',
      },
      gst_amount: sourceData.currencyDetails.invoiceRateTable.gst_amount || {
        rate: '0',
      },
      total_inr_amount: sourceData.currencyDetails.invoiceRateTable.total_inr_amount || {
        rate: '0',
      },
      tcs: sourceData.currencyDetails.invoiceRateTable.tcs || {
        rate: '0',
      },
    } : {
      // Default invoice table structure if not provided
      transaction_value: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      remittance_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      nostro_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      other_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      transaction_amount: {
        rate: '0',
      },
      gst_amount: {
        rate: '0',
      },
      total_inr_amount: {
        rate: '0',
      },
      tcs: {
        rate: '0',
      },
    }
  } : {
    // Default currency details if not provided
    fx_currency: '',
    fx_amount: '0',
    settlement_rate: '0',
    add_margin: '0',
    customer_rate: '0',
    declared_education_loan_amount: '0',
    previous_transaction_amount: '0',
    declared_previous_amount: '0',
    total_transaction_amount_tcs: '0',
    invoiceRateTable: {
      transaction_value: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      remittance_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      nostro_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      other_charges: {
        company_rate: '0',
        agent_mark_up: '0',
        rate: '0',
      },
      transaction_amount: {
        rate: '0',
      },
      gst_amount: {
        rate: '0',
      },
      total_inr_amount: {
        rate: '0',
      },
      tcs: {
        rate: '0',
      },
    },
  };
  
  return {
    currencyDetails,
    beneficiaryDetails: sourceData?.beneficiaryDetails || {
      beneficiary_name: '',
      beneficiary_address: '',
      beneficiary_city: '',
      beneficiary_country: '',
      beneficiary_account_number_iban_number: '',
      beneficiary_swift_code: '',
      beneficiary_bank_name: '',
      beneficiary_bank_address: '',
      sort_bsb_aba_transit_code: '',
      message_to_beneficiary_additional_information: '',
      student_name: '',
      student_passport_number: '',
      payment_instruction_number: '',
      university_name: '',
      intermediaryBankDetails: 'no',
      intermediary_bank_account_number: '',
      intermediary_bank_swift_code: '',
      intermediary_bank_name: '',
      intermediary_bank_address: '',
    },
    transactionDetails: sourceData?.transactionDetails || {
      company_reference_number: '',
      agent_reference_number: '',
      transaction_type: '',
      purpose: '',
      transaction_purpose_map_id: '',
      fx_currency: '',
      fx_amount: 0,
      company_settlement_rate: 0,
      add_margin: 0,
      customer_rate: 0,
      nostro_charges: '',
      applicant_name: '',
      applicant_pan_number: '',
      passport_issue_date: '',
      passport_expiry_date: '',
      applicant_email: '',
      applicant_mobile_number: '',
      source_of_funds: '',
      paid_by: '',
      payee_name: '',
      payee_pan_number: '',
      applicant_id_document: '',
      passport_number: '',
      place_of_issue: '',
      applicant_address: '',
      applicant_city: '',
      applicant_state: '',
      applicant_country: '',
      postal_code: '',
    },
  };
};
