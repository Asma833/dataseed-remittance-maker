import { FieldType } from "@/types/enums";

export const currencyDetailsConfig = [
  {
    name:'fx_currency',
    label: 'FX Currency',
    type: FieldType.Select,
    placeholder: 'Select FX Currency',
    required: true,
  },
  {
    name:'fx_amount',
    label: 'FX Amount',
    type: FieldType.Text,
    placeholder: 'Enter FX Amount',
    required: true,
  },
  {
    name:'settlement_rate',
    label: 'Settlement Rate',
    type: FieldType.Text,
    placeholder: 'Enter Settlement Rate',
    required: true,
  },
  {
    name:'add_margin',
    label: 'Add Margin',
    type: FieldType.Text,
    placeholder: 'Enter Add Margin',
    required: true,
  },
  {
    name:'customer_rate',
    label: 'Customer Rate',
    type: FieldType.Text,
    placeholder: 'Enter Customer Rate',
    required: true,
  },
  {
    name:'declared_education_loan_amount',
    label: 'Declared Education Loan Amount',
    type: FieldType.Text,
    placeholder: 'Enter Declared Education Loan Amount',
    required: true,
  },
  {
    name:'previous_transaction_amount',
    label: 'Previous Transaction Amount',
    type: FieldType.Text,
    placeholder: 'Enter Previous Transaction Amount',
    required: true,
  },
  {
    name:'declared_previous_amount',
    label: 'Declared Previous Amount',
    type: FieldType.Text,
    placeholder: 'Enter Declared Previous Amount',
    required: true,
  },
  {
    name:'total_transaction_amount_tcs',
    label: 'Total Transaction Amount (TCS)',
    type: FieldType.Text,
    placeholder: 'Enter Total Transaction Amount (TCS)',
    required: true,
  }
];
