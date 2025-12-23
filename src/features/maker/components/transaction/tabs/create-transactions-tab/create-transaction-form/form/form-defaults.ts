import { CreateTransactionFormInput } from './common-schema';

export const getFormDefaultValues = (
  initialData?: Partial<CreateTransactionFormInput>
): Partial<CreateTransactionFormInput> => {
  const sourceData = initialData;
  return {
    currencyDetails: {
      fx_currency: '',
      fx_amount: '0',
      settlement_rate: '0',
      add_margin: '0',
      customer_rate: '0',
      declared_education_loan_amount: '1',
      previous_transaction_amount: '1',
      declared_previous_amount: '1',
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
    },
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
      passport_issue_date:'',
      passport_expiry_date:'',
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
