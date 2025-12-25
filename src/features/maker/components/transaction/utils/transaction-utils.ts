

export const mapRowDataToInitialData = (rowData:any) => {
  const transaction = rowData.transactions;
  const kyc = transaction.kyc_details;
  return {
    id: rowData?.id,
    transactionDetails: {
      company_reference_number: transaction.company_ref_number || '',
      agent_reference_number: transaction.agent_ref_number || '',
      purpose: transaction.purpose || '',
      transaction_purpose_map_id: transaction.transaction_purpose_map_id || '',
      fx_currency: transaction.fx_currency || '',
      fx_amount: transaction.fx_amount || '',
      company_settlement_rate: rowData.settlement_rate || '',
      add_margin: rowData?.margin_amount || '',
      customer_rate: rowData.customer_rate || '',
      nostro_charges: transaction.nostro_charges_amount || '',
      applicant_name: kyc?.applicant_name || '',
      applicant_pan_number: kyc?.applicant_pan || '',
      applicant_email: kyc?.applicant_email || '',
      applicant_mobile_number: kyc?.applicant_mobile || '',
      source_of_funds: transaction.source_of_funds || '',
      paid_by: kyc?.paid_by || '',
      payee_name: kyc?.payee_name || '',
      payee_pan_number: kyc?.payee_pan || '',
      passport_number: kyc?.passport_number || '',
      place_of_issue: kyc?.place_of_issue || '',
      passport_issue_date: kyc?.passport_issue_date,
      passport_expiry_date: kyc?.passport_expiry_date,
      applicant_address: kyc?.applicant_address || '',
      applicant_city: kyc?.applicant_city || '',
      applicant_state: kyc?.applicant_state || '',
      applicant_country: kyc?.applicant_country || '',
      postal_code: kyc?.postal_code || '',
    },
    beneficiaryDetails: {
      beneficiary_name: kyc?.beneficiary_name || '',
      beneficiary_address: kyc?.beneficiary_address || '',
      beneficiary_city: kyc?.beneficiary_city || '',
      beneficiary_country: kyc?.beneficiary_country || '',
      beneficiary_account_number_iban_number: kyc?.beneficiary_account_number || '',
      beneficiary_swift_code: kyc?.beneficiary_swift_code || '',
      beneficiary_bank_name: kyc?.beneficiary_bank_name || '',
      beneficiary_bank_address: kyc?.beneficiary_bank_address || '',
      sort_bsb_aba_transit_code: kyc?.sort_bsb_aba_transit_code || '',
      message_to_beneficiary_additional_information: kyc?.message_to_beneficiary || '',
      student_name: kyc?.student_name || '',
      student_passport_number: kyc?.student_passport_number || '',
      university_name: kyc?.university_name || '',
      intermediaryBankDetails: kyc?.intermediary_bank_details || '',
      intermediary_bank_account_number: kyc?.intermediary_bank_account_number || '',
      intermediary_bank_swift_code: kyc?.intermediary_bank_swift_code || '',
      intermediary_bank_name: kyc?.intermediary_bank_name || '',
      intermediary_bank_address: kyc?.intermediary_bank_address || '',
    },
    currencyDetails: {
      fx_currency: transaction.fx_currency || '',
      fx_amount: transaction.fx_amount || '',
      settlement_rate: rowData.settlement_rate || '',
      add_margin: rowData.margin_amount,
      customer_rate: rowData.customer_rate || '',
      declared_education_loan_amount: kyc?.declared_education_loan_amount || '',
      previous_transaction_amount: kyc?.previous_transaction_amount || '',
      declared_previous_amount: kyc?.declared_previous_amount || '',
      total_transaction_amount_tcs: kyc?.total_transaction_amount_tcs || '',
      invoiceRateTable: {
        transaction_value: {
          company_rate: '', // not available
          agent_mark_up: '', // not available
          rate: transaction.transaction_amount || '',
        },
        remittance_charges: {
          company_rate: '',
          agent_mark_up: '',
          rate: transaction.remittance_charges || '',
        },
        nostro_charges: {
          company_rate: '',
          agent_mark_up: '',
          rate: transaction.nostro_charges_amount || '',
        },
        other_charges: {
          company_rate: '',
          agent_mark_up: '',
          rate: transaction.other_charges || '',
        },
        transaction_amount: {
          rate: transaction.transaction_amount || '',
        },
        gst_amount: {
          rate: transaction.total_gst_amount || '',
        },
        total_inr_amount: {
          rate: transaction.total_inr_amount || '',
        },
        tcs: {
          rate: transaction.tcs || '',
        },
      },
    },
    paymentDetails: rowData,
  };
};