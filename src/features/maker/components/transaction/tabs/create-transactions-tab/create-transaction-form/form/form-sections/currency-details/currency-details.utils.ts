import { currencyDetailsConfig } from './currency-details.config';

export const fieldLabelMap: Record<string, string> = {
  // Currency Details Fields
  'currencyDetails.fx_currency': 'FX Currency',
  'currencyDetails.fx_amount': 'FX Amount',
  'currencyDetails.settlement_rate': 'Settlement Rate',
  'currencyDetails.add_margin': 'Add Margin',
  'currencyDetails.customer_rate': 'Customer Rate',
  'currencyDetails.declared_education_loan_amount': 'Declared Education Loan Amount',
  'currencyDetails.previous_transaction_amount': 'Previous Transaction Amount',
  'currencyDetails.declared_previous_amount': 'Declared Previous Amount',
  'currencyDetails.total_transaction_amount_tcs': 'Total Transaction Amount (TCS)',

  // Invoice Rate Table - Transaction Value
  'currencyDetails.invoiceRateTable.transaction_value.company_rate': 'Transaction Value Company Rate',
  'currencyDetails.invoiceRateTable.transaction_value.agent_mark_up': 'Transaction Value Agent Markup',
  'currencyDetails.invoiceRateTable.transaction_value.rate': 'Transaction Value Rate',

  // Invoice Rate Table - Remittance Charges
  'currencyDetails.invoiceRateTable.remittance_charges.company_rate': 'Remittance Charges Company Rate',
  'currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up': 'Remittance Charges Agent Markup',
  'currencyDetails.invoiceRateTable.remittance_charges.rate': 'Remittance Charges Rate',

  // Invoice Rate Table - Nostro Charges
  'currencyDetails.invoiceRateTable.nostro_charges.company_rate': 'Nostro Charges Company Rate',
  'currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up': 'Nostro Charges Agent Markup',
  'currencyDetails.invoiceRateTable.nostro_charges.rate': 'Nostro Charges Rate',

  // Invoice Rate Table - Other Charges
  'currencyDetails.invoiceRateTable.other_charges.company_rate': 'Other Charges Company Rate',
  'currencyDetails.invoiceRateTable.other_charges.agent_mark_up': 'Other Charges Agent Markup',
  'currencyDetails.invoiceRateTable.other_charges.rate': 'Other Charges Rate',

  // Invoice Rate Table - Totals
  'currencyDetails.invoiceRateTable.transaction_amount.rate': 'Total Transaction Amount',
  'currencyDetails.invoiceRateTable.gst_amount.rate': 'GST Amount',
  'currencyDetails.invoiceRateTable.total_inr_amount.rate': 'Total INR Amount',
  'currencyDetails.invoiceRateTable.tcs.rate': 'TCS Amount',
};

export const getFieldLabel = (key: string): string => {
    // Check if key exists in the map
    if (fieldLabelMap[key]) {
        return fieldLabelMap[key];
    }

    const parts = key.split('.');
    const fieldName = parts[parts.length - 1];
    const config = currencyDetailsConfig;
    const field = config.find((f) => f.name === fieldName);
    return field?.label || key;
};
